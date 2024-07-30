import { useThree, useFrame } from '@react-three/fiber';
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import * as THREE from 'three';
type Props = {};

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

export default CameraController;
