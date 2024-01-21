"use client";
import React from "react";
import { useQuery } from "react-query";
import { PostI } from "./types";
import { useRouter } from "next/navigation";

const Posts = () => {
  const { isLoading, error, data } = useQuery("getPosts", () =>
    fetch(process.env.NEXT_PUBLIC_SERVER_BASE_PATH + "posts/", {
      credentials: "include",
    }).then((res) => res.json())
  );

  if (error) return "Error: " + error;

  const router = useRouter()

    const handlePostClick = (post: PostI) => {
      router.push("/feed/"+post._id)
    }
    
  return (
    <div className="flex justify-center items-center w-full h-full">
      <ul>
        {data.map((post: PostI) => {
          return <li className="cursor-pointer" key={post.title} onClick={()=> handlePostClick(post)}>{post.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default Posts;
