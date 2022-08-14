const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const db = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(db);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const db = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!db) {
      res.status(404).json({ message: 'No Categories!' });
      return;
    }
    res.status(200).json(db);
  } catch (err) {
    res.status(500).json(err);
  }
});
  // be sure to include its associated Products


router.post('/', async (req, res) => {
  // create a new category
  try {
    const db = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(db);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      // All the fields you can update and the data attached to the request body.
      category_name: req.body.category_name,
    },
    {
      // Gets a book based on the book_id given in the request parameters
      where: {
        id: req.params.id,
      },
    }
  )
    .then((db) => {
      res.json(db);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const db = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!db) {
      res.status(404).json({ message: 'No categories!' });
      return;
    }
    res.status(200).json(db);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
