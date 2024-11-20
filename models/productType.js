
module.exports = (sequelize, DataTypes)=>{
    const ProductType = sequelize.define("producttype",{
      
        type:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        feature:{
            type:DataTypes.TEXT,
        },
        //add FK from product table for associating reviews with products
        product_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'products', 
                key: 'id'
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }
    },{
        underscore:true
    })

    return ProductType;

}