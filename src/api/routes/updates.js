import { Router } from 'express';
import {addUpdates , getUpdates} from '../controllers/updates/index.js';
const router = Router();


router.post('/', addUpdates);
router.get('/', getUpdates);


export default router