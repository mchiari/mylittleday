"use client";

import React, { Suspense, useEffect } from "react";
import { useQuery } from "react-query";

const Users = () => {
  const { isLoading, error, data } = useQuery("getUsers", () =>
    fetch(process.env.NEXT_PUBLIC_SERVER_BASE_PATH + "users", {
      credentials: "include",
    }).then((res) => res.json())
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <ul>
      {data.map((user) => {
        return <li key={user.id}>{user.name}</li>;
      })}
    </ul>
  );
};

// const getUsers = async () => {
//   const res = await api.get(process.env.NEXT_PUBLIC_SERVER_BASE_PATH + "users",{
//     withCredentials: true
//   });
//   return res
// };

const User = async () => {
  // const users = await getUsers()
  // console.log(users)

  return (
    <div className="flex justify-center items-center w-full h-full">
      <Suspense fallback={<div>Loading...</div>}>
        <Users />
      </Suspense>
    </div>
  );
};

export default User;
