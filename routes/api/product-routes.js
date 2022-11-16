const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// works dont touch it
router.get('/', async (req, res) => {
  try {
    const productSearch = await Product.findAll({
      include: [{model:Category}, {model: Tag, through: ProductTag}]
    });
    console.log(productSearch);
    res.status(200).json(productSearch);
  } catch (err) {
    res.status(500).json(err)
  }
});

//gives empty {}
router.get('/:id', (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try {
    const searchOne = Product.findByPk(req.params.id, {
      include: [{model: Category}, {model: Tag, through: ProductTag}]
    });
    console.log(searchOne);

    if (!searchOne) {
      res.status(404).json({ message: 'No product found with that id!' });
      return;
    };
    
    res.status(200).json(searchOne);
  } catch (err) {
    res.status(500).json(err)
  }
});

// create new product
router.post('/', async (req, res) => {
    try {
      const newProduct = await Product.create({
          product_name: req.body.product_name,
          price: req.body.price,
          stock: req.body.stock,
          category_id: req.body.category_id
      });
      console.log(newProduct);
      res.status(200).json(newProduct);
    } catch (err) {
      res.status(500).json(err);
    };

  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(
    {
      product_name: req.body.product_name,
      price: req.body.price,
      stock: req.body.stock,
      category_id: req.body.category_id,
      Category: {
        id: req.params.id,
        category_name: req.body.category_name
      },
      Tags: req.body.Tags
    },
    {
      where: { id: req.params.id}
    }
  
  )
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
  Product.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedProduct) => {
      res.json(deletedProduct)
    })
      .catch(err => res.json(err))
});

module.exports = router;
