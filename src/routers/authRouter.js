import { Router } from 'express';
import { signIn, signUp } from '../controllers/authController.js';
import { signInSchema, signUpSchema } from '../schemas/authSchema.js';
import { validateSchema } from '../middlewares/validateSchema.js';


const router = Router();

router.post('/sign-up', validateSchema(signUpSchema), signUp)
router.post('/sign-in', validateSchema(signInSchema), signIn)

export default router