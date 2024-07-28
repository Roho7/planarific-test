'use client';
import React, { useState } from 'react';
import Sidepanel from '../(components)/sidepanel';
import ModelViewer from './(components)/model-viewer.ui';
import ModelMetadata from './(components)/model-metadata.ui';
import useModel from '../_providers/useModel';

type Props = {};

const ModelPage = (props: Props) => {
  const { isFetching, activeModel } = useModel();
  const [showMetadata, setShowMetadata] = useState(false);

  return (
    <div className='flex w-full overflow-hidden'>
      <Sidepanel />

      {!activeModel && (
        <div className='w-full h-full flex items-center justify-center text-gray-400'>
          Select a model to view
        </div>
      )}
      {isFetching && (
        <div className='w-full h-full flex items-center justify-center text-gray-800'>
          <div className='border-4 border-planarific-200 rounded-full h-7 w-7  animate-pulse'></div>
        </div>
      )}
      {!isFetching && activeModel && (
        <div className='flex flex-col w-full overflow-hidden relative h-full'>
          <ModelViewer showMetadata={showMetadata} />
          <ModelMetadata
            showMetadata={showMetadata}
            setShowMetadata={setShowMetadata}
          />
        </div>
      )}
    </div>
  );
};

export default ModelPage;
