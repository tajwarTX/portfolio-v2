import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, ContactShadows, Environment, Lightformer, Html, useProgress } from '@react-three/drei';
import * as THREE from 'three';

const FIT = 2.4; // longest side of every model, in scene units

function Model({ url, rotation }) {
  const { scene } = useGLTF(url);
  const spin = useRef();

  const { object, scale, offset } = useMemo(() => {
    const obj = scene.clone(true);
    obj.rotation.set(...rotation);
    obj.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(obj);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const s = FIT / Math.max(size.x, size.y, size.z);
    // sit the model on the turntable (y = 0) and centre it in x/z
    return { object: obj, scale: s, offset: [-center.x * s, -box.min.y * s, -center.z * s] };
  }, [scene, rotation]);

  useFrame((_, dt) => {
    if (spin.current) spin.current.rotation.y += dt * 0.25;
  });

  return (
    <group ref={spin}>
      <group position={offset} scale={scale}>
        <primitive object={object} />
      </group>
    </group>
  );
}

function Loading() {
  const { progress } = useProgress();
  return (
    <Html center>
      <span className="turntable-loading">{Math.round(progress)}%</span>
    </Html>
  );
}

export default function ModelViewer({ item }) {
  return (
    <Canvas
      className="turntable-canvas"
      dpr={[1, 2]}
      camera={{ position: [3.2, 2.4, 3.6], fov: 34 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 3]} intensity={1.6} />
      <directionalLight position={[-4, 2, -3]} intensity={0.5} color="#9fd3c7" />
      <Environment resolution={128}>
        <Lightformer form="rect" intensity={2} position={[0, 4, 2]} scale={[6, 2, 1]} />
        <Lightformer form="rect" intensity={1} position={[-4, 1, -2]} scale={[3, 3, 1]} color="#ffcf8a" />
        <Lightformer form="ring" intensity={1.5} position={[3, 2, -3]} scale={2} />
      </Environment>
      <Suspense fallback={<Loading />}>
        <group position={[0, -0.45, 0]}>
          <Model key={item.id} url={item.model} rotation={item.rotation} />
          <ContactShadows position={[0, 0.001, 0]} opacity={0.6} scale={6} blur={2.4} far={3} />
        </group>
      </Suspense>
      <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={0.4} maxPolarAngle={1.45} target={[0, 0.35, 0]} />
    </Canvas>
  );
}
