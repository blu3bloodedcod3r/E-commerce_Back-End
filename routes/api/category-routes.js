const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

//works, dont touch it
router.get('/', async (req, res) => {
  // works
  try {
    const allCategories = await Category.findAll({
      include: [{model: Product}]
    }); 
    console.log(allCategories);
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err)
  }
});

//works, dont touch it
router.get('/:id', async (req, res) => {
  try {
    const singleCategory = await Category.findByPk(req.params.id, {
      include : [{model: Product}]
    });
    console.log(singleCategory);

    if (!singleCategory) {
      res.status(404).json({ message: 'No category found with that ID' });
      return;
    }

    res.status(200).json(singleCategory);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', (req, res) => {
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
    id: req.body.id
  },
  {
    where: { id: req.params.id }
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
      where: { id: req.params.id}
    })
  .then(delCategory => {
    res.json(delCategory);
  }).catch (err => {
    res.status(500).json(err)
  })
});

module.exports = router;
