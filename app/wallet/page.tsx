import { auth } from "@clerk/nextjs/server";
import React from "react";

const page = () => {
  const { userId } = auth();

  return <div>page</div>;
};

export default page;
