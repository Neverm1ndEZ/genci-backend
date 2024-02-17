import { Router } from 'express';
import { auth} from '../middlewares/index.js';
import {addTodos, deleteTodos, getTodos} from '../controllers/todos/index.js';

const router = Router();


router.post('/',auth , addTodos);
router.get('/', auth , getTodos);
router.delete('/:todoId', auth ,deleteTodos);


export default router