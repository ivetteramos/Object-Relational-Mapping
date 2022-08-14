const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagsdb = await Tag.findAll({
      // include: [{ model: Tag }, { model: Product }],
    });
    res.status(200).json(tagsdb);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`  try {
    try{
    const tagsdb = await Tag.findByPk(req.params.id, {
      // Add Book as a second model to JOIN with
      // include: [{ model: Tag }, { model: Product }],
    });
    if (!tagsdb) {
      res.status(404).json({ message: 'No Tag found with that id!' });
      return;
    }
    res.status(200).json(tagsdb);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
  // look up routers in ORM 24 of class repo 
});

router.post('/', async (req, res) => {
  console.log(req.body)
  try {
    const tagsdb = await Tag.create({
      tag_name: req.body.tag_name,
    }); 
    res.status(200).json(tagsdb);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
