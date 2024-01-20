"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React from "react";
import { useQuery } from "react-query";
import { User } from "./types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const UserEditor = ({ user }: { user: User }) => {
  const formSchema = z.object({
    name: z.string().max(50),
    cpf: z.string().max(11),
    _id: z.string(),
    // password: z.string().min(2).max(50),
    // confirmPassword: z.string().min(2).max(50),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
      cpf: user.cpf,
      _id: user._id,
      // password: "",
      // confirmPassword: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const request = axios
      .put(process.env.NEXT_PUBLIC_SERVER_BASE_PATH + "users/" + user._id, values, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toast.success("Atualização de dados", {
            description: `Dados de ${user.name} atualizados com sucesso`,
            // icon: <CheckIcon />,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Atualização de dados", {
          description: error.message,
        });
      });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Pencil2Icon />
      </DialogTrigger>
      <DialogContent className="bg-black">
        <DialogHeader>
          <DialogTitle>Edit user</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4 mt-4 justify-center items-center w-full">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-3/4">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Insert e-mail" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cpf"
                  render={({ field }) => (
                    <FormItem className="w-3/4">
                      <FormLabel>CPF</FormLabel>
                      <FormControl>
                        <Input placeholder="Insert cpf" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input placeholder="Insert new password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input placeholder="Insert password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      /> */}

                <Button disabled={!form.formState.isValid} type="submit" className="w-3/4">
                  Atualizar dados
                </Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

const Users = () => {
  const { isLoading, error, data } = useQuery("getUsers", () =>
    fetch(process.env.NEXT_PUBLIC_SERVER_BASE_PATH + "users", {
      credentials: "include",
    }).then((res) => res.json())
  );

  if (isLoading) return [];

  if (error) return "An error has occurred: " + error;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead> </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>E-mail</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((user: User) => {
          return (
            <TableRow key={user._id}>
              <TableCell>
                <UserEditor user={user} />
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>type</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default Users;
