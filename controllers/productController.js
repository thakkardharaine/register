const db = require("../models");
const { QueryTypes, where } = require("sequelize");
const { Sequelize, Op } = require("sequelize");

//create main model'

const Product = db.products;
const Review = db.reviews;

//create product
const addProduct = async (req, res) => {
  try {
    const info = {
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      published: req.body.published ? req.body.published : false,
    };



    const product = await Product.create(info);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
    console.log(product, "Product created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the product",
      error: error.message,
    });
  }
};

//get all products

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({});

    res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      data: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving the products",
      error: error.message,
    });
  }
};

//get single product

const getOneProduct = async (req, res) => {
  try {
    let id = req.params.id;
    let product = await Product.findOne({ where: { id: id } });

    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving the products",
      error: error.message,
    });
  }
};

//update product

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const [updated] = await Product.update(req.body, {
      where: { id: id },
    });

    if (updated) {
      res.status(200).json({
        success: true,
        message: "Product updated successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the product",
      error: error.message,
    });
  }
};

//delete product

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const deleted = await Product.destroy({
      where: { id: id },
    });

    if (deleted) {
      res.status(200).json({
        success: true,
        message: "Product deleted successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the product",
      error: error.message,
    });
  }
};

//get published products

const getPublishedProduct = async (req, res) => {
  try {
    let id = req.params.id;
    const products = await Product.findAll({ where: { published: true } });
    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the product",
      error: error.message,
    });
  }
};

// const hookProduct = async (req, res) => {
//   try{
   
//     var  data= await Product.create({title: "qwiiie", price: 9100, description: "testtt", published: true})

 
//     res.status(200).json({
//       success: true,
//       message: "Product fetched successfully",
//       data: data,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while deleting the product",
//       error: error.message,
//     });
//   }
// };


const scopeProduct = async (req, res) => {
  try{
   

    
  //   Product.addScope('publishedTrue',{
  //     where: {
  //       published: true
  //     }
  //   })
  //   Product.addScope('titletv',{
  //     where: {
  //       title: 'happy'
  //     }
  //   })

  //  // var data=await Product.scope('publishedTrue').findAll() //single goy to ne multiple ma array []
  //  var data=await Product.scope(['publishedTrue','titletv']).findAll()

   Product.addScope('includeReviews',{
    include: {
      model: Review,
    }
   })

   var data=await Product.scope('includeReviews').findAll()  
    
 
    res.status(200).json({
      success: true,
      message: "Product scope fetched successfully",
      data: data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the product",
      error: error.message,
    });
  }
};

// const transactionProduct = async (req, res) => {
//   const t = await db.sequelize.transaction();

//   try {
 
//     const product = await Product.create({
//       title: "gguug",
//       price: 1475,
//       description: " erer",
//       published: false
//     }, { transaction: t });


//     if (product && product.id) {
//       try {
      
//         await Review.create({
//           product_id: product.id , // This should fail if product.id is null
//           review: "dhara thakkar"
//         }, { transaction: t });

   
//         await t.commit();
//         console.log('Transaction committed');
//         res.status(200).json({ transaction_status: 'committed', product });
//       } catch (error) {
   
//         await t.rollback();
//         console.error('Transaction rolled back due to review creation error:', error);
//         res.status(500).json({ transaction_status: 'rollback', error: error.message });
//       }
//     } else {
//       throw new Error('Product creation failed');
//     }
//   } catch (error) {

//     await t.rollback();
//     console.error('Transaction rolled back due to product creation error:', error);
//     res.status(500).json({ transaction_status: 'rollback', error: error.message });
//   }
// };

//we can create direct query without creating model 
const interfaceProduct = async (req, res) => {
  try{
   
    //default aa rite create karse
    const queryInterface = db.sequelize.getQueryInterface();
    // queryInterface.createTable('Person11', {
    //   name: db.DataTypes.STRING,
    //   isBetaMember: {
    //     type: db.DataTypes.BOOLEAN,
    //     defaultValue: false,
    //     allowNull: false,
    //   },
    // });
    queryInterface.addColumn('Person11', 'first_Name', { type: db.DataTypes.STRING });//person ma petname add thay
 
    res.status(200).json({
      success: true,
      message: "interface created successfully",
      // data: data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the product",
      error: error.message,
    });
  }
};

const subQueryProduct = async (req, res) => {
//  var data= await makePostWithReactions('dhara thakkar World', [
//     'abc',
//     'Angry',
//     'Laugh',
//     'Like',
//     'Like',
//     'Angry',
//     'Sad',
//     'Like',
//   ]);
 //await makePostWithReactions('My Second Post', ['Laugh', 'Laugh', 'Like', 'Laugh']);

 var data= await db.post.findAll({
  attributes: {
    include: [
      [
        // Note the wrapping parentheses in the call below!
        db.sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM reactions AS reaction
                    WHERE
                        reaction.postId = post.id
                        AND
                        reaction.type = "Laugh"
                )`),
        'laughReactionsCount',
      ],
    ],
  },
});

  res.status(200).json({data:data})

}
async function makePostWithReactions(content, reactionTypes) {
  const post = await db.post.create({ content });
  await db.reaction.bulkCreate(reactionTypes.map(type => ({ type, postId: post.id })));
  return post;
}




module.exports = {
  addProduct,
  scopeProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
  getPublishedProduct,
  interfaceProduct,
  subQueryProduct
 // transactionProduct

  //hookProduct,
  // queryProduct,
  // finderQueryProduct,
  // getSetVirtualProduct,
  // validateProduct,
  // rawQueryProduct,
  // oneToOneProduct,
  // oneToManyProduct,
  // manyToManyProduct,
  // paranoidProduct,
  // loadingProduct,
  // eagerProduct
};
