module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        //unique:true,//validation
        validate: {
          // isAlpha: true,
          isLowercase: true,
          len: [2, 10],
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,

        // get(){
        //     const rawValue = this.getDataValue('description');
        //     return rawValue ? rawValue.toUpperCase() : null;
        // }//getter function to convert the description to uppercase
      },
      price: {
        type: DataTypes.FLOAT,
        // set(value){
        //     this.setDataValue('price',value+ ' ,₹rupee')
        // }//setter function to add the currency symbol to the price
      },
      published: {
        type: DataTypes.BOOLEAN,
      },
      // fullName:{
      //     type:DataTypes.VIRTUAL,
      //     get(){
      //         return `${this.title} - ${this.price}`
      //     },
      //     set(value){
      //         throw new Error('do not set fullName')
      //     }
      // }
    },
    {
      //   //method-1
        // hooks: {
        //   beforeValidate: (products, options) => {
        //     products.title = "ineeee"; 
        //   },
        //   afterValidate: (products, options) => {
        //     products.price = "73500";
        //   },
        // },

    //   underscored: true,
    timestamps: true, 
      modelName: "Product",
      paranoid: true,
      deletedAt: "soft_delete",
    }
  );

//   //   // Method 2 via the .addHook() method
    // Product.addHook("beforeValidate", (products, options) => {
    //   products.title = "haghghg";
    // });

    // Product.addHook("afterValidate", "someCustomName", (products, options) => {
    //   products.price = "7600";

    //   // return Promise.reject(new Error("I'm afraid I can't let you do that!"));
    // });

  // Method 3 via the direct method== myhookafter is a hook name so if we want to remove hook we can use this name 
//   Product.beforeValidate(async (products, options) => {
    
//     products.description = 'this is hook description';
//   });

//   Product.afterValidate("myHookAfter", (products, options) => {
//     products.price = "5700";
//   });

  //Product.removeHook('afterValidate',"myHookAfter"); // after validate remove karyu che etle before rehse descrption but price change nai thay 
//product.removeHook() //badha j hook sathe delete thay
  return Product;
}; 
