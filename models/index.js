const dbConfig = require('../config/dbConfig');

const {Sequelize,DataTypes} = require('sequelize');


// aa badhu db file mathi aavse
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,{
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false, // errors ne overrite kare
    }
)

//to connect with db
sequelize.authenticate()
.then(()=>{
    console.log('connected to database')
})
.catch(err =>{
    console.log(err,"Error connecting to database")
})

const db={}

//model instances 
db.Sequelize= Sequelize
db.sequelize= sequelize

db.products = require('./productModel')(sequelize,DataTypes)
db.reviews = require('./reviewModel')(sequelize,DataTypes)
//db.producttype = require('./productType')(sequelize,DataTypes)
//db.productReview = require('./productReview')(sequelize,DataTypes,db.products,db.reviews)

//for associations
// db.products.hasOne(db.reviews, { foreignKey: 'product_id' });
// db.reviews.belongsTo(db.products, { foreignKey: 'product_id' });


//for one to many relation
db.products.hasMany(db.reviews, { foreignKey: 'product_id' });
db.reviews.belongsTo(db.products, { foreignKey: 'product_id' });

//for many to many relation(auto-code).belongsToMany jate j tbl create kare if created nai hoy to
// db.products.belongsToMany(db.reviews, { through: 'product_review', foreignKey: 'product_id', otherKey:'review_id' });
// db.reviews.belongsToMany(db.products, { through: 'product_review', foreignKey:'review_id', otherKey: 'product_id' });
// db.products.belongsToMany(db.reviews, {  through: 'db.productReview' });
// db.reviews.belongsToMany(db.products, {  through: 'db.productReview' });


//for sub query creating demo model
db.post = sequelize.define(
    'post',
    {
      content: DataTypes.STRING,
    },
    { timestamps: false },
  );
  
db.reaction = sequelize.define(
    'reaction',
    {
      type: DataTypes.STRING,
    },
    { timestamps: false },
  );
  
  db.post.hasMany(db.reaction);
  db.reaction.belongsTo(db.post);






db.DataTypes=DataTypes

db.sequelize.sync({force:false}) // drop and create tables if true
.then(()=>{
    console.log('sync done')
})

module.exports=db