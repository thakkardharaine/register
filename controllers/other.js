
//query practice product
// const queryProduct = async (req, res) => {
//   const data = await Product.findAll({
//     attributes: [
//       "id",
//       ["title", "title_product"], //title ni jagya ae title product aapse
//       [Sequelize.fn("COUNT", Sequelize.col("id")), "count"], //total num of rows
//     ],
//   });

//   res.status(200).json({ data: data });
// };

// // const queryProduct = async(req,res)=>{
// //     const data= await Product.findAll({
// //         attributes:{exclude:['description'],
// //            // include:[ [Sequelize.fn('COUNT',Sequelize.col('id')),'count']]
// //         }//description add nai kare , count add karse
// //     })

// //     res.status(200).json({data:data})
// // }

// // const queryProduct = async(req,res)=>{
// //     const data= await Product.findAll({
// //         // where: {
// //         //   id: {
// //         //     [Op.eq]: 6,

// //         //   },
// //         // },//id=6 hase ae j aapse

// //         where: {
// //             [Op.and]: [{ id: 8 }, { title: 'phone' }]
// //           },//id=7 and title=tv hase ae j aapse
// //           //[Op.ne]: 7,
// //       });

// //     res.status(200).json({data:data})
// // }

// //orderby-group-by
// // const queryProduct = async(req,res)=>{
// //     try {
// //         const data= await Product.findAll({
// //             order:[
// //              ['id','DESC']
// //             ],

// //             // group:['price']//price group by
// //          //    limit:1,

// //          })
// //          res.status(200).json({
// //             success: true,
// //             message: "Product fetched successfully",
// //             data: data
// //         });

// //     } catch (error) {
// //         console.error(error);
// //         res.status(500).json({
// //             success: false,
// //             message: "error in query product",
// //             error: error.message
// //         });

// //     }

// // }

// // model query finders
// const finderQueryProduct = async (req, res) => {
//   const { count, rows } = await Product.findAndCountAll({
//     where: { title: "phone" },
//   });

//   res.status(200).json({ count: count, rows: rows });

//   // const [product, created] = await Product.findOrCreate({
//   //     where: { title: 'Phone1' },
//   //     defaults:{

//   //         price: 1000,
//   //         description: 'Smartphone',
//   //         published: true
//   //     }

//   //   });
//   //   res.status(200).send({data:product,created:created})//tv hase to false kari return karse or-else new create karse
//   //     const data = await Product.findByPk(12)
//   //    res.status(200).send(data)
// };

// //getter setter virtual
// const getSetVirtualProduct = async (req, res) => {
//   // const data = await Product.findAll({
//   //     where:{
//   //         title:'tv'

//   //     }//title phone hase ae description capital ma get karse
//   // })

//   const data = await Product.create({
//     title: "get-set-vv",
//     price: 87000,
//     description: "Smartvvvvvtphone12345667",
//     published: true,
//   });
//   res.status(200).json({ data: data });
// };

// const validateProduct = async (req, res) => {
//   try {
//     const data = await Product.create({
//       title: "d",
//       price: 87000,
//       description: "Smartvvvne12345667",
//       published: false,
//     }); //gives error bcz used isAlpha validation
//     res.status(200).json({
//       success: true,
//       message: "Product fetched successfully",
//       data: data,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "An error because of validations",
//       error: error.message,
//     });
//   }
// };

// const rawQueryProduct = async (req, res) => {
//   try {
//     const products = await db.sequelize.query('SELECT * FROM products WHERE title = ?', {
//         type: QueryTypes.SELECT,

//         replacements:['phone'],//id=4 hase ae j aapse=replacements ma je hase ae query pass karse
//         plain: false//true thi 1st j aapse , false thi badha
//         // model:Product
//         //model type and all apisu to get set badhu je use karyu hoy ae aapse or ese sadu tbl return kare
//     });

//     //in
//         // const products = await db.sequelize.query (
//         //     'SELECT * FROM products WHERE id IN (:id)',
//         //     {
//         //         replacements: { id: [1, 4, 8] },
//         //         type: QueryTypes.SELECT,
//         //     }
//         // )

//     //like
//     // const products = await db.sequelize.query(
//     //     'SELECT * FROM products WHERE title LIKE :search_name',
//     //     {
//     //         replacements: { search_name: 'Phone%' },
//     //         type: QueryTypes.SELECT,
//     //     }
//     // );

//     //bind
//     // const products = await db.sequelize.query(
//     //   "SELECT * FROM products WHERE id = $id",
//     //   {
//     //     bind: { id: "8" }, //pass as a object
//     //     type: QueryTypes.SELECT,
//     //   }
//     // );

//     res.status(200).json({
//       success: true,
//       message: "Product fetched successfully",
//       data: products,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred",
//       error: error.message,
//     });
//   }
// };

// //1 product  1 review
// const oneToOneProduct = async (req, res) => {
//   try {
//     //for create product and review
//     // var data = await Product.create({title:'abc',price:8000,description:'one-to-one-description',published:true})
//     // if(data && data.id){
//     //     await Review.create({product_id:data.id,review:'one-to-one-review',rating:4})
//     // }

//     //for get all product and review
//     console.log("fetching product with review");
//     const data = await Product.findAll({
//       attributes: ["title", "price"],
//       include: [
//         {
//           model: Review,
//           attributes: ["review", "rating"],
//           required: false,
//         },
//       ],
//       where: { id: 7 }, //id=2 j return karse
//     });

//     res.status(200).json({
//       success: true,
//       message: "Product created successfully",
//       data: data,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred",
//       error: error.message,
//     });
//   }
// };

// //one to many= 1 product many review
// const oneToManyProduct = async (req, res) => {
//   try {
//     //for create product and review
//     //const data=await Review.create({product_id:7,review:'one-to-many-review',rating:4.5})

//     // //for get all (one-to-many)
//     const data = await Product.findAll({
//       attributes: ["title", "price"],
//       include: [
//         {
//           model: Review,
//           attributes: ["review", "rating"],
//         },
//       ],
//       where: { id: 7 },
//     });

//     res.status(200).json({
//       success: true,
//       message: "Product review created successfully",
//       data: data,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred",
//       error: error.message,
//     });
//   }
// };

// const manyToManyProduct = async (req, res) => {
//   try {
//     //for create product and review
//     // var data = await Product.create({title:'many',price:95000,description:'many-to-many-testing',published:true})

//     // if(data && data.id){
//     //     await Review.create({product_id:data.id,review:'many-to-many-testing-review',rating:3.5})
//     // }

//     const data = await Product.findAll({
//       attributes: ["title", "price"],
//       include: [
//         {
//           model: Review,
//           attributes: ["review", "rating"],
//           through: { attributes: [] },
//         },
//       ],
//     });

//     console.log("Data:", JSON.stringify(data, null, 2));

//     // console.log('Data:', data);

//     res.status(200).json({
//       success: true,
//       message: "Product reviews fetched successfully",
//       data: data,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred",
//       error: error.message,
//     });
//   }
// };

// const paranoidProduct = async (req, res) => {
//   try {
//     //var data = await Product.create({title:'paranoid',price:5000,description:'paranoidtesting',published:true})

//     //  var data= await Product.destroy({where:{id:17}})
//     //  console.log('soft-deleted!');
//     var data = await Product.restore({ where: { id: 17 } });
//     console.log("restored!");

//     //var data = await Product.destroy({where:{id:1},force:true})//db mathi j delete thai jase hard_delete

//     res.status(200).json({
//       success: true,
//       message: "data deleted or restored successfully",
//       data: data,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred",
//       error: error.message,
//     });
//   }
// };

// const loadingProduct = async (req, res) => {
//   try {
//     //      var data = await Product.create({title:'lazy1',price:95000,description:'lazyLoadingtesting',published:true})

//     // if(data && data.id){
//     //     await Review.create({product_id:data.id,review:'lazy-loading-review',rating:2.7})
//     // }

//         var data=await Product.findAll({
//             where:{id:17},
//                 include:Review
//         })
//     res.status(200).json({
//       success: true,
//       message: "data deleted or restored successfully",
//       data: data,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred",
//       error: error.message,
//     });
//   }
// };


// const eagerProduct = async (req, res) => {
//     try {
     
  
//           var data=await Product.findAll({
              
//                     //left join
//                   include:{
//                     model:Review,
//                     //required:true//jema review hase enu inner join kari ne aapse 
//                     //false karsu to right join kare
//                     required:false,
//                     right:true,
                 
//                   }
//           })
//       res.status(200).json({
//         success: true,
//         message: "data deleted or restored successfully",
//         data: data,
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({
//         success: false,
//         message: "An error occurred",
//         error: error.message,
//       });
//     }
//   };



//===============================

// connection pool

// save the time
// je connection already banyu che ene save kare ne reuse kare
// to jyare koi user fari thi tbl ne fetch kare to ae pehla nu j connection use kare
// application time improve kare ,vare vare db connection nai karvu pade

// pool:{
	
// 	max:5,connection limit
// min:0,
// acquire:30000//main 30 sec ma to bandh thai j jase
// idle:10000 connection 10 sec ma bandh thai jase

// 10 sec nai aape to 30 ae to bandh thai j jase

// }

// sequelize automatic handle karse

// if 5 req. pati gai che new user aave che to ae waiting state ma jase baki na 5 process karse
// etle jem 10 sec ma ek connection end thase waiting mathi new aai jase db sathe enu connectivity bani jase