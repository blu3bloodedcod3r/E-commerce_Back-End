const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const productData = await Product.findAll({
      include: [{model: Product}, {model: ProductTag}, {model: category}]
    });
    res.status(200).json(productData)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const productID = await Product.findById(req.params.id, {
      include: [{model: ProductTag}, {model: Product}]
    });

    if (!productID) {
      res.status(404).json({ message: 'No product found with that id!' });
      return;
    }

    res.status(200).json(productID)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create()
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {

  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {

  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
