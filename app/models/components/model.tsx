import React, { MutableRefObject, Ref, useEffect, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

type Props = {
  modelPath: string | undefined;
  targetRotation: THREE.Quaternion | null;
  isWireframe: boolean;
};

const Model = ({ modelPath, targetRotation, isWireframe = false }: Props) => {
  if (!modelPath) return null;
  const { scene, nodes } = useGLTF(modelPath);
  const groupRef = useRef<any>();

  useFrame(() => {
    if (groupRef.current && targetRotation) {
      groupRef.current.quaternion.slerp(targetRotation, 0.1);
    }
  });

  useEffect(() => {
    if (isWireframe) {
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;

          // @ts-ignore
          mesh.material.wireframe = true;
          // @ts-ignore
          mesh.material.color.set("white");
        }
      });
    } else {
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;

          // @ts-ignore
          mesh.material.wireframe = false;
          // @ts-ignore
          mesh.material.color.set("white");
        }
      });
    }
  }, [isWireframe]);

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
};

export default Model;
