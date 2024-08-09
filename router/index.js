import express from 'express';
import {
  getSneakers,
  getSneakersBasket,
  getSneakersFavorite,
  addRemoveToBasket,
  addRemoveToFavorite,
  checkout
} from '../controllers/controller.js';
const router = express.Router();

router.get('/sneakers', getSneakers);
router.get('/sneakers/basket',getSneakersBasket);
router.get('/sneakers/favorite',getSneakersFavorite);
router.post('/sneakers/basket/:id',addRemoveToBasket);
router.post('/sneakers/favorite/:id',addRemoveToFavorite);
router.post('/checkout',checkout);
export default router;
