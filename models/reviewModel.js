
module.exports = (sequelize, DataTypes)=>{
    const Review = sequelize.define("review",{
      
        review:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        rating:{
            type:DataTypes.FLOAT,
        },
        //add FK from product table for associating reviews with products
        product_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'products', 
                key: 'id',
                
            },
            allowNull: false,
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }
    })

    return Review;

}