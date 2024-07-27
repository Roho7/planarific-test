"use client";
import React from "react";
import Sidepanel from "../(components)/sidepanel";
import ModelViewer from "./components/model-viewer.ui";

type Props = {};

const ModelPage = (props: Props) => {
  return (
    <div className="w-screen flex">
      <Sidepanel />
      <ModelViewer />
    </div>
  );
};

export default ModelPage;
