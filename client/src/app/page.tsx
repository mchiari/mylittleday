"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

interface LoginForm {
  username: string;
  password: string;
}

export default function Home() {
  // const router = useRouter()
  // console.log(router)

  const [loginForm, setLoginForm] = useState<LoginForm>({
    username: "",
    password: "",
  });
  console.log(process.env)

  const attemptLogin = ({ username, password }: LoginForm) => {
    const request = axios
      .post(process.env.NEXT_PUBLIC_SERVER_BASE_PATH + "auth/login", {
        username,
        password,
      },{
        withCredentials: true
      })
      .then((res) => console.log(res));
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    console.log(loginForm);
    e.preventDefault();
    attemptLogin({ ...loginForm });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-4"
      >
        <input
          className="w-full text-black"
          value={loginForm.username}
          onChange={(e) =>
            setLoginForm({ ...loginForm, username: e.target.value })
          }
        />
        <input
          className="w-full  text-black"
          value={loginForm.password}
          onChange={(e) =>
            setLoginForm({ ...loginForm, password: e.target.value })
          }
        />
        <button type="submit" className="bg-white text-black w-full">
          Login
        </button>
      </form>

      {/* <button onClick={() => router.push('/student')}>Students</button> */}
    </main>
  );
}
