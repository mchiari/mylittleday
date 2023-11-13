import express from "express";

import { deleteUserById, getUserById, getUsers } from "../db/users";

export const getAllUsers = async (req: express.Request, res: express.Response) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const deleteUser = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    const user = await deleteUserById(id);

    if (!user) res.sendStatus(404);

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};


export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      const { name, cpf } = req.body;
  
      if (!name || !cpf) {
        return res.sendStatus(400);
      }
  
      const user = await getUserById(id);
      
      user!.name = name;
      user!.cpf = cpf;
      await user!.save();
  
      return res.status(200).json(user).end();
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  }