import Spinner from "@/components/custom/Spinner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React, { Suspense } from "react";
import RegisterForm from "./RegisterForm";

const RegisterPage = async () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex justify-center items-center w-[80%]">
        <Suspense fallback={<Spinner />}>
          <RegisterForm />
        </Suspense>
      </div>
    </div>
  );
};

export default RegisterPage;
