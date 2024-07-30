import React from 'react';
import { ModelListItemType } from '../_providers/types';
import AuthorizedImage from './authorized-image';
import { useRouter } from 'next/navigation';
import useModel from '../_providers/useModel';

type Props = {
  model: ModelListItemType;
};

const ModelCard = ({ model }: Props) => {
  const { handleModelClick } = useModel();
  return (
    <div
      role='button'
      className='bg-gray-200 p-2 rounded-md flex flex-col gap-2 hover:bg-gray-300 '
      onClick={() => {
        handleModelClick(model.id);
      }}
    >
      <AuthorizedImage
        src={`${process.env.NEXT_PUBLIC_URL}${model.thumbnail}`}
        alt={model.description}
      />
      <h1 className='text-gray-800 text-sm font-medium'>{model.description}</h1>
    </div>
  );
};

export default ModelCard;
