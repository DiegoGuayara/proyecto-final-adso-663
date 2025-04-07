import express from 'express';
import profile from '../controllers/profile-controller';
import verifyToken from '../middleware/VerifyToken';
const router = express.Router();


router.get('/', verifyToken, profile);


export default router;