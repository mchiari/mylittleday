import Spinner from "@/components/custom/Spinner";
import React, { Suspense } from "react";
import { useQuery } from "react-query";
import { PostI } from "./types";
import Posts from "./Posts";

const Feed = () => {
  return (
    <main className="flex justify-center items-center w-full h-full">
      <Suspense fallback={<Spinner />}>
        <Posts />
      </Suspense>
    </main>
  );
};

export default Feed;
