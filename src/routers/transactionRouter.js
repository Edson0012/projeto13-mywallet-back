import { Router } from 'express';
import { validateToken } from "../middlewares/validateToken.js"
import { transactionProfile, newTransaction } from "../controllers/transactionController.js"

const router = Router();

router.get('/transaction', validateToken, transactionProfile)
router.post('/transaction',  validateToken, newTransaction)

export default router