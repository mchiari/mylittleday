import express from "express";

import { getUserByEmail, createUser } from "../db/users";
import { authentication, random } from "../utils";

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.sendStatus(400);
    }

    const user = await getUserByEmail(username).select("+authentication.salt +authentication.password");

    if (!user) {
      return res.sendStatus(400);
    }

    const expectedHash = authentication(user.authentication!.salt, password);

    if (user.authentication!.password != expectedHash) {
      return res.sendStatus(403);
    }

    const salt = random();
    user.authentication!.sessionToken = authentication(salt, user._id.toString());

    res.cookie("mylittleday-sessionToken", user.authentication!.sessionToken, { domain: "localhost", path: "/", httpOnly: true, maxAge: 86400000 })

    await user.save();

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, name, cpf, type } = req.body;

    if (!email || !password || !name || !cpf || !type) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.sendStatus(400);
    }

    const salt = random();
    const user = await createUser({
      email,
      name,
      cpf,
      type,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.status(200).json(true).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
