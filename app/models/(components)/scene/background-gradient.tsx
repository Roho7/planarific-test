import { Plane } from '@react-three/drei';
import React, { useMemo } from 'react';
import * as THREE from 'three';

type Props = {
  startColor: string;
  endColor: string;
};

const BackgroundGradient = ({
  startColor = '#4df4ab',
  endColor = '#019d0f',
}: Props) => {
  const uniforms = useMemo(
    () => ({
      u_startColor: { value: new THREE.Color(startColor) },
      u_endColor: { value: new THREE.Color(endColor) },
    }),
    []
  );
  return (
    <Plane
      args={[100, 100]}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -1, 0]}
    >
      <shaderMaterial
        uniforms={uniforms}
        attach='material'
        vertexShader={`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `}
        fragmentShader={`
        uniform vec3 u_startColor;
        uniform vec3 u_endColor;
        varying vec2 vUv;
        void main() {
          vec3 color = mix(u_startColor, u_endColor, vUv.y);
          gl_FragColor = vec4(color, 1.0);
        }
      `}
      />
    </Plane>
  );
};

export default BackgroundGradient;
