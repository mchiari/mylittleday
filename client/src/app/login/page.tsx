"use client";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";

export default function Login() {
  const router = useRouter();
  // console.log(router)

  const formSchema = z.object({
    username: z.string().email().min(2).max(50),
    password: z.string().min(2).max(50),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const request = axios
      .post(process.env.NEXT_PUBLIC_SERVER_BASE_PATH + "auth/login", values, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          router.push("/");
        }
      });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center gap-4"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Insert e-mail" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Insert password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={!form.formState.isValid}
            type="submit"
            className=" w-full"
          >
            Login
          </Button>
        </form>
      </Form>
      {/* <button onClick={() => router.push('/student')}>Students</button> */}
    </main>
  );
}
