import useModel from "@/app/_providers/useModel";

type Props = {};

const ModelViewer = (props: Props) => {
  const { activeModel } = useModel();
  return <div> {activeModel && activeModel.city} </div>;
};

export default ModelViewer;
