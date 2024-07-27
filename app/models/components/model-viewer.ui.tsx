import useModel from "@/app/_providers/useModel";
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Dispatch, SetStateAction, Suspense, useEffect, useState } from "react";
import Model from "./model";
import * as THREE from "three";

type Props = {};

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

function CameraController({ align }: { align: string | null }) {
  const { camera } = useThree();
  const [targetRotation, setTargetRotation] = useState<THREE.Euler | null>(
    null,
  );

  useEffect(() => {
    if (align === "x") setTargetRotation(new THREE.Euler(0, Math.PI / 2, 0));
    else if (align === "y")
      setTargetRotation(new THREE.Euler(-Math.PI / 2, 0, 0));
    else if (align === "z")
      setTargetRotation(
        new THREE.Euler(camera.position.x, camera.position.y, 0),
      );
  }, [align]);

  useFrame(() => {
    if (targetRotation) {
      camera.quaternion.slerp(
        new THREE.Quaternion().setFromEuler(targetRotation),
        0.1,
      );
    }
  });

  return null;
}

function FaceAlignmentController({
  onAlignFace,
  setIsWireframe,
}: {
  onAlignFace: (face: string) => void;
  setIsWireframe: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "10px",
        right: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "5px",
      }}>
      <button onClick={() => onAlignFace("front")} style={buttonStyle}>
        Front
      </button>
      <button onClick={() => onAlignFace("back")} style={buttonStyle}>
        Back
      </button>
      <button onClick={() => onAlignFace("left")} style={buttonStyle}>
        Left
      </button>
      <button onClick={() => onAlignFace("right")} style={buttonStyle}>
        Right
      </button>
      <button onClick={() => onAlignFace("top")} style={buttonStyle}>
        Top
      </button>
      <button onClick={() => onAlignFace("bottom")} style={buttonStyle}>
        Bottom
      </button>
      <button onClick={() => setIsWireframe((prev) => !prev)}>Wireframe</button>
    </div>
  );
}

const buttonStyle = {
  padding: "5px 10px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const ModelViewer = (props: Props) => {
  const { activeModel } = useModel();
  const [alignAxis, setAlignAxis] = useState<string | null>(null);
  const [targetRotation, setTargetRotation] = useState<THREE.Quaternion | null>(
    null,
  );
  const [isWireframe, setIsWireframe] = useState(false);
  const onAlignFace = (face: string) => {
    switch (face) {
      case "front":
        setTargetRotation(new THREE.Quaternion());
        break;
      case "back":
        setTargetRotation(
          new THREE.Quaternion().setFromEuler(new THREE.Euler(0, Math.PI, 0)),
        );
        break;
      case "left":
        setTargetRotation(
          new THREE.Quaternion().setFromEuler(
            new THREE.Euler(0, Math.PI / 2, 0),
          ),
        );
        break;
      case "right":
        setTargetRotation(
          new THREE.Quaternion().setFromEuler(
            new THREE.Euler(0, -Math.PI / 2, 0),
          ),
        );
        break;
      case "top":
        setTargetRotation(
          new THREE.Quaternion().setFromEuler(
            new THREE.Euler(Math.PI / 2, 0, 0),
          ),
        );
        break;
      case "bottom":
        setTargetRotation(
          new THREE.Quaternion().setFromEuler(
            new THREE.Euler(-Math.PI / 2, 0, 0),
          ),
        );
        break;
    }
  };

  return (
    <section className="p-8 w-full h-xl">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={3} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Suspense fallback={null}>
          <Model
            modelPath={activeModel?.model}
            targetRotation={targetRotation}
            isWireframe={isWireframe}
          />

          <OrbitControls enableDamping />
          <CameraController align={alignAxis} />
          <AxesHelper />
        </Suspense>
      </Canvas>
      <FaceAlignmentController
        onAlignFace={onAlignFace}
        setIsWireframe={setIsWireframe}
      />
    </section>
  );
};

export default ModelViewer;
