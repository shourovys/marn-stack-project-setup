import express from 'express';
import { createPost, deletePost, getPost, getPosts, updateFile, updatePost } from '../controllers/posts.js';


const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id/updateFile', updateFile);
router.get('/:id', getPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;