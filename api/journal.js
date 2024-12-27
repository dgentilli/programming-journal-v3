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
 * Journal Create Route
 * @ POST /api/journal/create
 */

router.post('/create', authenticateUser, async (req, res) => {
  try {
    const { title, content, author, tags = [], category = 'Other' } = req.body;

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
router.get('/all/:author', async (req, res) => {
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

module.exports = router;
