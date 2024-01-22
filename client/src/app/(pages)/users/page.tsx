import Spinner from "@/components/custom/Spinner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React, { Suspense } from "react";

import Users from "./Users";

const UserPage = async () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex justify-center items-center w-[80%]">
        <Suspense fallback={<Spinner />}>
          <Users />
        </Suspense>
      </div>
    </div>
  );
};

export default UserPage;
