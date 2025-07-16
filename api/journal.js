const express = require('express');
const router = express.Router();

const Journal = require('../models/journal');
const authenticateUser = require('../middlewares/authenticateUser');

/**
 * API TEST route
 * @ GET /api/journal/test
 */

router.get('/test', (req, res) => res.json({ msg: 'Blog API test works!' }));

/**
 * Journal search route
 * @ GET /api/journal/search?query=searchTerm&page=1&limit=10
 */

router.get('/search', authenticateUser, async (req, res) => {
  try {
    const { query, page = 1, limit = 10 } = req.query; // Get query + pagination params
    const pageNumber = Math.max(1, parseInt(page));
    const pageSize = Math.max(1, parseInt(limit));

    if (!query || typeof query !== 'string') {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const totalCount = await Journal.countDocuments({
      $text: { $search: query },
    });

    // MongoDB Text Search
    const searchResults = await Journal.find(
      { $text: { $search: query } }, // Search indexed fields
      { score: { $meta: 'searchScore' } } // Get relevance score
    )
      .sort({ score: { $meta: 'textScore' } }) // Sort by relevance
      .skip((page - 1) * limit) // Pagination: Skip previous results
      .limit(parseInt(limit)); // Limit results per page

    res.json({
      searchResults,
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
      currentPage: pageNumber,
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * Journal Create Route
 * @ POST /api/journal/create
 */

router.post('/create', authenticateUser, async (req, res) => {
  try {
    const { title, content, author, tags = [], category = 'Other' } = req.body;
    console.log('req.body', req.body);

    // Validate required fields
    if (!title) {
      return res.status(400).json({ error: 'Please provide a title.' });
    }
    if (!content) {
      return res.status(400).json({ error: 'Please enter some text.' });
    }

    // Create the new journal entry
    const newJournal = new Journal({
      title,
      content,
      author,
      tags,
      category,
    });

    // Save to database
    await newJournal.save();

    res.status(201).json(newJournal);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message || 'Server error. Please try again later.',
    });
  }
});

router.get('/all', (req, res) => {
  Journal.find((err, data) => {
    if (err) res.send(err);
    res.json(data);
  });
});

/**
 * Get paginated journal entries for a specific user
 * @ GET /api/journal/all/:author?page=1&limit=10
 */
router.get('/all/:author', authenticateUser, async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    // Ensure valid page and limit values
    const pageNumber = Math.max(1, parseInt(page));
    const pageSize = Math.max(1, parseInt(limit));

    // Fetch journals with pagination
    const journals = await Journal.find({ author: req.params.author })
      .sort({ _id: -1 }) // Sort by newest first
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    // Get total count for metadata
    const totalCount = await Journal.countDocuments({
      author: req.params.author,
    });

    // Build response
    res.json({
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
      currentPage: pageNumber,
      journals,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

/** Get a journal entry by id
 *  @ GET /api/journal/:id
 */

router.get('/:id', authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const journal = await Journal.findById(id);

    if (!journal) {
      return res.status(404).json({ error: 'Entry not found!' });
    }

    res.json(journal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 *  Edit a journal entry by id
 *  @ PATCH /api/journal/:id
 */

router.put('/:id', authenticateUser, async (req, res) => {
  try {
    const { title, content, author, tags = [], category = 'Other' } = req.body;
    console.log('req.body', req.body);
    const { id } = req.params;
    console.log('req.params.id', id);

    // Validate required fields
    if (!title) {
      return res.status(400).json({ error: 'Please provide a title.' });
    }
    if (!content) {
      return res.status(400).json({ error: 'Please enter some text.' });
    }

    // Find the existing journal entry by ID
    const existingJournal = await Journal.findById(id);
    if (!existingJournal) {
      return res.status(404).json({ error: 'Journal entry not found.' });
    }

    // Update the fields
    existingJournal.title = title;
    existingJournal.content = content;
    existingJournal.author = author || existingJournal.author; // Preserve existing if not provided
    existingJournal.tags = tags;
    existingJournal.category = category;

    // Save the updated journal entry
    const updatedJournal = await existingJournal.save();

    res.status(200).json(updatedJournal); // Return updated resource
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message || 'Server error. Please try again later.',
    });
  }
});

/**
 *  Delete a journal entry by id
 *  @ DELETE /api/journal/:id
 */

router.delete('/:id', authenticateUser, async (req, res) => {
  try {
    // find the entry
    const { id } = req.params;

    const deletedEntry = await Journal.findByIdAndDelete(id);

    if (!deletedEntry) {
      return res
        .status(404)
        .json({ error: 'Something went wrong while deleting.' });
    }

    res.status(200).json({ message: 'Journal entry was deleted' });
  } catch (error) {
    res.status(500).json({
      error: error.message || 'Server error. Please try again later.',
    });
  }
});

module.exports = router;
