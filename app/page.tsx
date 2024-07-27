"use client";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  const router = useRouter();
  router.push("/models");
  return <></>;
};

export default Page;
