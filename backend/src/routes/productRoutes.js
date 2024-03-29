import express from 'express';
const router = express.Router();
import { protect, admin } from '../middlewares/authMiddleware.js';
import { getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview, getTopProduct } from "../controllers/productController.js";

router.route('/')
    .get(getProducts)
    .post(protect, admin, createProduct)
router.route('/:id/reviews').post(protect, createProductReview)
router.get('/top', getTopProduct)
router.route('/:id')
    .get(getProductById)
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct)



export default router;