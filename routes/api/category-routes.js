const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategories = await Product.findByPk(req.params.category_name, {
      include: [{model: Category}, {model: Product}]
    }); 
    console.log(allCategories);
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const singleCategory = await Product.findById(req.params.product_id, {
      include : [{model: Product}]
    });
    console.log(singleCategory);

    if (!singleCategory) {
      res.status(404).json({ message: 'No category found with that product ID' });
      return;
    }

    res.status(200).json(singleCategory);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', (req, res) => {
  // create a new category
  try {
    const newCategory = Category.create({
      where : {category_name: req.body.category_name}
    });
    console.log(newCategory);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
 Category.update(
  {
    category_name: req.body.category_name
  },
  {
    where: { category_name: req.params.category_name }
  }
 ).then(updatedCategory => {
  res.json(updatedCategory);
 })
  .catch (err => {
    console.log(err);
    res.status(500).json(err)
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
      where: { category_name: req.params.category_name}
    })
  .then(delCategory => {
    res.json(delCategory);
  }).catch (err => {
    res.status(500).json(err)
  })
});

module.exports = router;
