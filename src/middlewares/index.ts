import express from "express";
import { get, merge } from "lodash";
import { getUserBySessionToken } from "../db/users";

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, "identity._id") as unknown as string;


    console.log(currentUserId)
    if (!currentUserId) {
      return res.sendStatus(403);
    }

    if (currentUserId && currentUserId.toString() !== id) {
      return res.sendStatus(403);
    }

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const sessionToken = req.cookies["mylittleday-sessionToken"];

    if (!sessionToken) {
      return res.sendStatus(403);
    }
    
    const existingUser = await getUserBySessionToken(sessionToken);
    console.log(existingUser)

    if (!existingUser) {
      return res.sendStatus(403);
    }

    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
