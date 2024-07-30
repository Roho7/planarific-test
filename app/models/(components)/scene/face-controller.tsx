import Button from '@/app/(components)/button';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import * as THREE from 'three';
function FaceAlignmentController({
  reset,
  setIsWireframe,
  setTargetRotation,
  setModelPosition,
}: {
  reset: () => void;
  setIsWireframe: Dispatch<SetStateAction<boolean>>;
  setTargetRotation: Dispatch<SetStateAction<THREE.Quaternion | null>>;
  setModelPosition: Dispatch<SetStateAction<THREE.Vector3 | null>>;
}) {
  const resetModel = () => {
    setTargetRotation(new THREE.Quaternion());
    setModelPosition(new THREE.Vector3(0, 0, 0));
    reset();
  };

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
      <div>
        <Button
          buttonProps={{
            onClick: () =>
              setModelPosition(
                (prev) => new THREE.Vector3(0, (prev?.y || 1) + 1, 0)
              ),
          }}
        >
          <BiChevronUp />
        </Button>
        <Button
          buttonProps={{
            onClick: () =>
              setModelPosition(
                (prev) => new THREE.Vector3(0, (prev?.y || 1) - 1, 0)
              ),
          }}
        >
          <BiChevronDown />
        </Button>
      </div>
      <Button buttonProps={{ onClick: () => setIsWireframe((prev) => !prev) }}>
        Wireframe
      </Button>
      <Button
        buttonProps={{
          onClick: () => {
            resetModel();
          },
        }}
      >
        Reset
      </Button>
      <Button
        buttonProps={{
          onClick: () =>
            setTargetRotation(
              (prev) =>
                prev?.multiply(
                  new THREE.Quaternion().setFromEuler(
                    new THREE.Euler(0, Math.PI / 4, 0)
                  )
                ) || null
            ),
        }}
      >
        Rotate
      </Button>
    </div>
  );
}

export default FaceAlignmentController;
