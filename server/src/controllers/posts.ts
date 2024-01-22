import express from "express";
import { createNewPost, getPost, getPosts } from "../db/posts";
import { getUserById } from "../db/users";

export const getAllPosts = async (req: express.Request, res: express.Response) => {
  try {
    const rawPosts = await getPosts();

    // let posts = []

    // for(let post of rawPosts!){
    //   let
    // }

    return res.status(200).json(rawPosts);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const getPostById = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    const post = await getPost(id);
    
    // const rawPost = await getPost(id);
    // const author = await getUserById(String(rawPost?.author));
    // const rawMentions = rawPost?.mentions;
    // let mentions = [];
    // for (let mention of rawMentions!) {
    //   let user = await getUserById(String(mention));
    //   mentions.push(user);
    // }
    // const post = {
    //   ...rawPost?.toJSON(),
    //   author: author,
    //   mentions: mentions,
    // };


    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const createPost = async (req: express.Request, res: express.Response) => {
  try {
    const { author, title, content, mentions } = req.body;

    if (!author || !title || !content) {
      return res.sendStatus(400);
    }

    const post = await createNewPost({ title, content, author, mentions });

    return res.status(200).json(post).end();
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const updatePostById = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { author, title, content, mentions } = req.body;

    if (!author || !title || !content) {
      return res.sendStatus(400);
    }

    const post = await getPost(id);

    if (!post) {
      return res.sendStatus(404);
    }

    post!.author = author;
    post!.title = title;
    post!.content = content;
    post!.mentions = mentions;

    await post!.save();

    return res.status(200).json(post).end();
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
