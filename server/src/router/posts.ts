import express from "express";
import { isAuthenticated, isOwner } from "../middlewares";
import { createPost, getAllPosts, getPostById, updatePost } from "../controllers/posts";


export default (router: express.Router) => {
    router.get('/posts', isAuthenticated, getAllPosts)
    router.get('/posts/:id', isAuthenticated, getPostById)
    router.post('/posts/new', isAuthenticated, createPost)
    router.put('/posts/:id', isAuthenticated, updatePost)
    // router.delete('/users/:id', isAuthenticated, deleteUser)
  };
  