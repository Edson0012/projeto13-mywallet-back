import { Router } from 'express';
import { validateToken } from "../middlewares/validateToken.js"
import { transactionProfile, newTransaction } from "../controllers/transactionController.js"
import { depositSchema } from '../schemas/transactionSchemas.js';
import { validateSchema } from '../middlewares/validateSchema.js';

const router = Router();

router.get('/transaction', validateToken, transactionProfile)
router.post('/new-entry',  validateSchema(depositSchema), newTransaction)
export default router