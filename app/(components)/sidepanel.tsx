"use client";
import React from "react";
import useModel from "../_providers/useModel";
import ModelCard from "./card";

type Props = {};

const Sidepanel = (props: Props) => {
  const { modelList } = useModel();
  return (
    <div className="h-screen w-1/4 bg-gray-100 p-4 flex flex-col overflow-y-scroll gap-2">
      {modelList?.map((item) => {
        return <ModelCard key={item.id} model={item} />;
      })}
    </div>
  );
};

export default Sidepanel;
