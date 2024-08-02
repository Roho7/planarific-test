import React, { MutableRefObject, Ref, useEffect, useRef } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

type Props = {
  modelPath: string | undefined;
  targetRotation: THREE.Quaternion | null;
  isWireframe: boolean;
  setClickedPoint: React.Dispatch<React.SetStateAction<THREE.Vector3 | null>>;
  modelPosition: THREE.Vector3 | null;
};

const Model = ({
  modelPath,
  targetRotation,
  isWireframe = false,
  setClickedPoint,
  modelPosition,
}: Props) => {
  if (!modelPath) return null;

  const { scene } = useGLTF(modelPath);
  const groupRef = useRef<any>();
  // const modelRef = useRef<any>();

  useEffect(() => {
    if (isWireframe) {
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;

          // @ts-ignore
          mesh.material.wireframe = true;
          // @ts-ignore
          mesh.material.color.set('white');
        }
      });
    } else {
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;

          // @ts-ignore
          mesh.material.wireframe = false;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          child.receiveShadow = true;
          // @ts-ignore
          mesh.material.color.set('white');
        }
      });
    }
  }, [isWireframe]);

  return (
    <group
      ref={groupRef}
      castShadow
      onClick={(e) => {
        console.log(e.point);
        setClickedPoint(e.point);
      }}
    >
      <mesh castShadow position={modelPosition || [0, 0, 0]}>
        <primitive object={scene} />
      </mesh>
    </group>
  );
};

export default Model;
