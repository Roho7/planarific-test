import useModel from '@/app/_providers/useModel';
import { Box, Environment, OrbitControls, Plane } from '@react-three/drei';
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

function CameraController({
  align,
  cameraPosition,
  setCameraPosition,
}: {
  align: boolean;
  cameraPosition: { x: string; y: string; z: string };
  setCameraPosition: Dispatch<
    SetStateAction<{ x: string; y: string; z: string }>
  >;
}) {
  const { camera } = useThree();
  const [targetRotation, setTargetRotation] = useState<THREE.Euler | null>(
    null
  );

  useEffect(() => {
    resetCamera();
  }, [align]);

  useFrame(() => {
    if (targetRotation) {
      camera.quaternion.slerp(
        new THREE.Quaternion().setFromEuler(targetRotation),
        0.1
      );
    }
    setCameraPosition({
      x: camera.position.x.toFixed(2),
      y: camera.position.y.toFixed(2),
      z: camera.position.z.toFixed(2),
    });
  });

  const resetCamera = useCallback(() => {
    camera.position.set(0, 20, 30);
    camera.lookAt(100, 0, 0);
    camera.updateProjectionMatrix();
  }, [camera, align]);

  return null;
}

function FaceAlignmentController({
  reset,
  setIsWireframe,
}: {
  reset: () => void;
  setIsWireframe: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
      }}
    >
      <Button buttonProps={{ onClick: () => setIsWireframe((prev) => !prev) }}>
        Wireframe
      </Button>
      <Button buttonProps={{ onClick: reset }}>Reset</Button>
    </div>
  );
}

export function Floor() {
  return (
    <mesh
      rotation-x={-Math.PI / 2}
      receiveShadow
      scale={10}
      position={[0, -1, 0]}
    >
      <circleGeometry args={[10]} />
      <meshStandardMaterial />
    </mesh>
  );
}

const ModelViewer = ({ showMetadata }: Props) => {
  const { activeModel, isFetching } = useModel();
  const [reset, setReset] = useState(false);
  const [targetRotation, setTargetRotation] = useState<THREE.Quaternion | null>(
    null
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
      <Canvas camera={{ position: [0, 20, 30], fov: 20 }} shadows>
        <ambientLight intensity={0.3} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          color={'yellow'}
        />
        <Environment preset='sunset' />
        <color attach='background' args={['#f0f0f0']} />
        <Suspense fallback={null}>
          <Model
            modelPath={activeModel?.model}
            targetRotation={targetRotation}
            isWireframe={isWireframe}
            setClickedPoint={setClickedPoint}
          />
          <Floor />
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
      />
    </div>
  );
};

export default ModelViewer;
