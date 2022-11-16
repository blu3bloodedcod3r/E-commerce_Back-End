const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

//works, dont touch it!
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{model: Product, through: ProductTag}]
    });
    console.log(tagData);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//works, dont touch it!
router.get('/:id', async (req, res) => {
  try {
    const tagID = await Tag.findByPk(req.params.id, {
      include: [{model: Product, through: ProductTag}]
    });
    console.group(tagID);

    if (!tagID) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    };

    res.status(200).json(tagID)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create({
      where: { id: req.body.id }
    });
    console.log(newTag);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
Tag.update(
  {
    id: req.body.id
  },
  {
    where: { id: req.params.id }
  }
   ).then (updatedTag => {
    res.json(updatedTag);
   }).catch(err => {
    console.log(err);
    res.json(err);
   })
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const delTag = await Tag.destroy({
      where: { id: req.params.id }
    });
    console.log(delTag);

    if (!delTag) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    };

    res.status(200).json(delTag);
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
