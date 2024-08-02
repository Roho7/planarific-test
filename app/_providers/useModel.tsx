'use client';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { fetchModelList } from './actions/fetchModelList';
import { ModelListItemType, ModelType } from './types';
import { fetchModel } from './actions/fetchModel';

type ModelContextType = {
  modelList: ModelListItemType[] | null;
  activeModel: ModelType | null;
  handleModelClick: (modelId: number) => void;
  isFetching?: boolean;
};

const ModelContext = createContext<ModelContextType | null>(null);

export const ModelProvider = ({ children }: { children: React.ReactNode }) => {
  const [modelList, setModelList] = useState<ModelListItemType[] | null>(null);
  const [activeModel, setActiveModel] = useState<ModelType | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const getModelList = async () => {
    try {
      const data = await fetchModelList();
      setModelList(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleModelClick = async (modelId: number) => {
    setIsFetching(true);
    try {
      const data = await fetchModel(modelId);
      setActiveModel({
        ...data,
        description: modelList?.find((m) => m.id === modelId)?.description,
      });
    } catch (e) {
      console.error(e);
    }
    setIsFetching(false);
  };

  useEffect(() => {
    getModelList();
  }, []);

  const values = useMemo(
    () => ({
      modelList,
      activeModel,
      handleModelClick,
      isFetching,
    }),
    [modelList, activeModel]
  );

  return (
    <ModelContext.Provider value={values}>{children}</ModelContext.Provider>
  );
};

export default function useModel(): ModelContextType {
  const modelContext = useContext(ModelContext);
  if (!modelContext) {
    throw new Error('useModel must be used within a ModelProvider');
  }
  return modelContext;
}
