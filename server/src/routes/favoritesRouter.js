import  express  from "express";
import {getUserFavorites, favoriteProduct} from '../controllers/FavoritesController.js'

const router = express.Router();
/////////////////////////////////////////
router.get('/:userId', getUserFavorites)
router.post('/', favoriteProduct)

export default router;
