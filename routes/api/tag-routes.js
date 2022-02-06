const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const tags = await Tag.findAll({
    include: [{model: Product , through: ProductTag, as: 'tags'}]
  });
  res.status(200).json(tags);
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const tags = await Tag.findByPk(req.params.id, {
    include: [{model: Product , through: ProductTag, as: 'tags'}]
  });
  res.status(200).json(tags);
});

router.post('/', async (req, res) => {
  // create a new tag
  const tag = await Tag.create({
    tag_name: req.body.tag_name
  });
  res.json(tag)
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const tag = await Tag.update(req.body, {
    tag_name: req.body.tag_name,
    where: {
      id: req.params.id
    }
  });
  res.status(200).json(tag);
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const tag = await Tag.destroy({
    where: {
      id: req.params.id,
    }
  });
  if (!tag){
    res.status(200).json({ message: 'No tag found with that id.'});
    return;
  }
  res.status(200).json(tag)
});

module.exports = router;
