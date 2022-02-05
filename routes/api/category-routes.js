const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const categories = await Category.findAll({
    include: [{ model: Product }]
  });
  res.status(200).json(categories);

});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const category = await Category.findByPk(req.params.id, {
    include: [{ model: Product }]
  })
});

router.post('/', async (req, res) => {
  // create a new category
  const newCat = await Category.create({
    category_name: req.body.category_name,
  });
  res.status(200).json(newCat);
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const category = await Category.update({
    category_name: req.body.category_name,
    where: {
      id: req.params.id,
    }
  })
  res.status(200).json(category)
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const category = await Category.destroy({
    where: {
      id: req.params.id,
    }
  });
  if (!category) {
    res.status(404).json({ message: 'No category found with that id!' });
    return;
  }
  res.status(200).json(category);

});

module.exports = router;
