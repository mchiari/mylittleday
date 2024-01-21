import { useParams } from "next/navigation";
import React, { Suspense } from "react";
import Spinner from "@/components/custom/Spinner";
import Post from "./Post";

const PostPage = () => {

  return (
    <main className="flex justify-center items-center w-full h-full">
      <Suspense fallback={<Spinner />}><Post /></Suspense>
    </main>
  );
};

export default PostPage;
