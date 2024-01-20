"use client";
import { useParams } from "next/navigation";
import React from "react";

const NewPost = () => {
  return <div>NewPost</div>;
};

const ExistingPost = () => {
  return <div>Existing Post</div>;
};

const PostPage = () => {
  const params = useParams<{ id: string }>();

  return (
    <main className="flex justify-center items-center w-full h-full">
      {params.id === "new" ? <NewPost /> : <ExistingPost />}
    </main>
  );
};

export default PostPage;
