import Button from '@/app/(components)/button';
import { Dispatch, SetStateAction, useEffect } from 'react';
import {
  BiArrowFromBottom,
  BiArrowFromTop,
  BiChevronDown,
  BiChevronLeft,
  BiChevronRight,
  BiChevronUp,
} from 'react-icons/bi';
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
      <div className='grid grid-cols-2 gap-1'>
        <Button
          type='secondary'
          buttonProps={{
            onClick: () =>
              setModelPosition(
                (prev) =>
                  new THREE.Vector3(prev?.x, (prev?.y || 1) + 1, prev?.z)
              ),
          }}
        >
          <BiArrowFromBottom />
        </Button>
        <Button
          type='secondary'
          buttonProps={{
            onClick: () =>
              setModelPosition(
                (prev) =>
                  new THREE.Vector3(prev?.x, (prev?.y || 1) - 1, prev?.z)
              ),
          }}
        >
          <BiArrowFromTop />
        </Button>
        <Button
          type='secondary'
          buttonProps={{
            onClick: () =>
              setModelPosition(
                (prev) =>
                  new THREE.Vector3((prev?.x || 1) - 1, prev?.y, prev?.z)
              ),
          }}
        >
          <BiChevronLeft />
        </Button>
        <Button
          type='secondary'
          buttonProps={{
            onClick: () =>
              setModelPosition(
                (prev) =>
                  new THREE.Vector3((prev?.x || 1) + 1, prev?.y, prev?.z)
              ),
          }}
        >
          <BiChevronRight />
        </Button>
        <Button
          type='secondary'
          buttonProps={{
            onClick: () =>
              setModelPosition(
                (prev) =>
                  new THREE.Vector3(prev?.x, prev?.y, (prev?.z || 1) + 1)
              ),
          }}
        >
          <BiChevronUp />
        </Button>
        <Button
          type='secondary'
          buttonProps={{
            onClick: () =>
              setModelPosition(
                (prev) =>
                  new THREE.Vector3(prev?.x, prev?.y, (prev?.z || 1) - 1)
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
    </div>
  );
}

export default FaceAlignmentController;
