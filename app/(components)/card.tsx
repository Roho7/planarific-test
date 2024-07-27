import React from "react";
import { ModelListItemType } from "../_providers/types";
import AuthorizedImage from "./authorized-image";
import { useRouter } from "next/navigation";
import useModel from "../_providers/useModel";

type Props = {
  model: ModelListItemType;
};

const ModelCard = ({ model }: Props) => {
  const { handleModelClick } = useModel();
  return (
    <div
      className="bg-gray-700 p-2 rounded flex flex-col gap-2"
      onClick={() => {
        handleModelClick(model.id);
      }}>
      <AuthorizedImage
        src={`${process.env.NEXT_PUBLIC_URL}${model.thumbnail}`}
        alt={model.description}
      />
      <h1 className="text-white text-lg">{model.description}</h1>
    </div>
  );
};

export default ModelCard;
