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

//works, dont touch it!
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create({
        tag_name: req.body.tag_name
    });
    console.log(newTag);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

//works, dont touch it!
router.put('/:id', (req, res) => {
Tag.update(
  {
    tag_name: req.body.tag_name
  },
  {
    where: {id: req.params.id}
  })
  .then (updatedTag => {
    res.json(updatedTag);
   }).catch(err => {
    console.log(err);
    res.json(err);
   })
});

//works, dont touch it!y
router.delete('/:id', async (req, res) => {
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
