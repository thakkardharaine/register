const productController = require('../controllers/productController');

const router = require('express').Router()

router.post('/create',productController.addProduct)
router.get('/getall',productController.getAllProducts)
router.get('/getone/:id',productController.getOneProduct)
router.put('/update/:id',productController.updateProduct)
router.delete('/delete/:id',productController.deleteProduct)
router.get('/published',productController.getPublishedProduct)


router.get('/query-interface',productController.interfaceProduct)
router.get('/sub-query',productController.subQueryProduct)

//router.get('/transaction',productController.transactionProduct)

router.get('/scopeProduct',productController.scopeProduct)
//router.get('/hookProduct',productController.hookProduct)

// router.get('/query',productController.queryProduct)
// router.get('/finder',productController.finderQueryProduct)
// router.get('/get-set-v',productController.getSetVirtualProduct)
// router.get('/validate',productController.validateProduct)
// router.get('/raw-query',productController.rawQueryProduct)


// router.get('/one-one',productController.oneToOneProduct)
// router.get('/one-many',productController.oneToManyProduct)
// router.get('/many-many',productController.manyToManyProduct)

// router.get('/paranoid',productController.paranoidProduct)

// router.get('/loading',productController.loadingProduct)

// router.get('/eagerProduct',productController.eagerProduct)

module.exports = router