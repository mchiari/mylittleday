"use client";
import React, { Suspense } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "react-query";
import { PostI } from "../types";
import { UserI } from "../../user/types";

const Post = () => {
  const { id } = useParams();

  const { isLoading, error, data }: { isLoading: boolean; error: unknown; data: PostI | undefined } = useQuery("getPostById", () =>
    fetch(process.env.NEXT_PUBLIC_SERVER_BASE_PATH + "posts/" + id, {
      credentials: "include",
    }).then((res) => res.json())
  );

  if (isLoading) return [];

  if (error) return "An error has occurred: " + error;

  return (
    <div className="flex flex-col justify-center items-start w-full h-full gap-2">
      <h3 className="text-2xl">{data?.title}</h3>
      <span className="">Autor: {data?.author.name}</span>

      <p>{data?.content}</p>

      {
        data?.mentions && data?.mentions.map((mention: UserI) => {
          return <span>Mencionados nesse post: {mention.name}</span>
        })
      }
    </div>
  );
};

export default Post;
