const express = require('express');
const router = express.Router();

const Journal = require('../models/journal');

/**
 * API TEST route
 * @ GET /api/journal/test
 */

router.get('/test', (req, res) => res.json({ msg: 'Blog API test works!' }));

/**
 * Journal Create Route
 * @ POST /api/journal/create
 */

router.post('/create', async (req, res) => {
  if (!req.body.title) {
    let errMsg = 'Please provide a title';
    res.json({ err: errMsg });
  } else if (!req.body.content) {
    let errMsg = 'Please enter some text';
    res.json({ err: errMsg });
  } else {
    const { title, content, author } = req.body;
    const newJournal = new Journal({
      title,
      content,
      author,
    });
    await newJournal.save();
    res.json(newJournal);
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

module.exports = router;
