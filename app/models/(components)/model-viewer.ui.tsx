import useModel from '@/app/_providers/useModel';
import {
  Box,
  Center,
  ContactShadows,
  Environment,
  OrbitControls,
  Plane,
} from '@react-three/drei';
import { Canvas, useFrame, useThree, Vector3 } from '@react-three/fiber';
import {
  Dispatch,
  SetStateAction,
  Suspense,
  useCallback,
  useEffect,
  useState,
} from 'react';
import Model from './model';
import * as THREE from 'three';
import clsx from 'clsx';
import Button from '@/app/(components)/button';
import toast from 'react-hot-toast';
import BackgroundGradient from './scene/background-gradient';
import CameraController from './scene/camera-controller';
import FaceAlignmentController from './scene/face-controller';

type Props = {
  showMetadata: boolean;
};

function AxesHelper() {
  const { scene } = useThree();

  useEffect(() => {
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    // Position the axes helper in the bottom-left corner
    axesHelper.position.set(-10, -5, -10);

    return () => {
      scene.remove(axesHelper);
    };
  }, [scene]);

  return null;
}

const ModelViewer = ({ showMetadata }: Props) => {
  const { activeModel, isFetching } = useModel();
  const [reset, setReset] = useState(false);
  const [targetRotation, setTargetRotation] = useState<THREE.Quaternion | null>(
    null
  );
  const [modelPosition, setModelPosition] = useState<THREE.Vector3 | null>(
    new THREE.Vector3(0, 0, 0)
  );
  const [isWireframe, setIsWireframe] = useState(false);
  const [cameraPosition, setCameraPosition] = useState({
    x: '0',
    y: '20',
    z: '30',
  });
  const [clickedPoint, setClickedPoint] = useState<THREE.Vector3 | null>(null);

  return (
    <div
      className={clsx(
        'p-4 w-full relative transition-all  ease-in-out',
        showMetadata ? 'h-3/4' : 'h-[99%]'
      )}
    >
      <Canvas camera={{ position: [0, 20, 1000] }} shadows>
        <ambientLight intensity={0.1} />
        <spotLight
          position={[10, 0, 10]}
          angle={0.22}
          penumbra={1}
          intensity={2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <directionalLight
          position={[5, 20, 5]}
          intensity={2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          color={'#E47F63'}
        />
        <Environment preset='city' />
        <BackgroundGradient startColor='#d0d0d0' endColor='#00000' />
        {/* <color attach='background' args={['black']} /> */}
        <Suspense fallback={null}>
          <Model
            modelPath={activeModel?.model}
            targetRotation={targetRotation}
            isWireframe={isWireframe}
            setClickedPoint={setClickedPoint}
            modelPosition={modelPosition}
          />

          <OrbitControls enableDamping />
          <CameraController
            align={reset}
            cameraPosition={cameraPosition}
            setCameraPosition={setCameraPosition}
          />
          <AxesHelper />
        </Suspense>
      </Canvas>

      <div className='absolute top-5 right-5 text-gray-800 bg-slate-200 p-1 text-xs'>
        X: {cameraPosition.x}, Y: {cameraPosition.y}, Z: {cameraPosition.z}
      </div>
      <div
        className='absolute top-5 left-5 text-gray-800 bg-slate-200 p-1 text-xs'
        role='button'
        onClick={() => {
          navigator.clipboard.writeText(
            `X: ${cameraPosition.x}, Y: ${cameraPosition.y}, Z: ${cameraPosition.z}`
          );
          toast.success('Copied to clipboard');
        }}
      >
        Mouse pointer at: X: {clickedPoint?.x.toFixed(2)}, Y:{' '}
        {clickedPoint?.y.toFixed(2)}, Z:
        {clickedPoint?.z.toFixed(2)}
      </div>
      <FaceAlignmentController
        setIsWireframe={setIsWireframe}
        reset={() => setReset(!reset)}
        setTargetRotation={setTargetRotation}
        setModelPosition={setModelPosition}
      />
    </div>
  );
};

export default ModelViewer;
