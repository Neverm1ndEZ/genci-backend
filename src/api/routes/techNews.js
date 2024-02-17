import { Router } from 'express';
import { addTechNews, getTechNews } from '../controllers/techNews/index.js';


const router = Router();


router.post('/', addTechNews);
router.get('/', getTechNews);


export default router