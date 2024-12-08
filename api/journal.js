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
 * Journal Get All for a specific user Route
 * @ POST /api/journal/all
 */
router.get('/all/:author', (req, res, err) => {
  try {
    Journal.find({ author: req.params.author })
      .sort({ _id: -1 })
      .then((journals) => {
        res.json(journals);
      });
  } catch (err) {
    res.json({ err: 'Something went wrong. Please try again.' });
  }
});

module.exports = router;
