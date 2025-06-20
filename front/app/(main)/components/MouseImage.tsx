import React, { useRef, useCallback, ReactNode } from "react";
import { useAnimate } from "framer-motion";
import { FiMousePointer } from "react-icons/fi";

type MouseImageTrailProps = {
  children: ReactNode;
  images: string[];
  renderImageBuffer: number;
  rotationRange: number;
};

export const MouseImage = () => {
  return (
    <MouseImageTrail
      renderImageBuffer={50}
      rotationRange={25}
      images={Array.from({ length: 16 }, (_, i) => `/m${i + 1}.png`)}
    >
      <section className="grid h-screen w-full place-content-center bg-black"></section>
    </MouseImageTrail>
  );
};

const MouseImageTrail = ({
  children,
  images,
  renderImageBuffer,
  rotationRange,
}: MouseImageTrailProps) => {
  const [scope, animate] = useAnimate();
  const imageRefs = useRef<HTMLImageElement[]>([]);
  const lastRenderPosition = useRef({ x: 0, y: 0 });
  const imageRenderCount = useRef(0);

  const calculateDistance = (x1: number, y1: number, x2: number, y2: number) =>
    Math.hypot(x2 - x1, y2 - y1);

  const renderNextImage = useCallback(() => {
    const index = imageRenderCount.current % images.length;
    const el = imageRefs.current[index];

    if (!el) return;

    const { x, y } = lastRenderPosition.current;

    el.style.top = `${y}px`;
    el.style.left = `${x}px`;
    el.style.zIndex = imageRenderCount.current.toString();

    const rotation = Math.random() * rotationRange;

    animate(
      el,
      {
        opacity: [0, 1],
        transform: [
          `translate(-50%, -25%) scale(0.5) rotate(${
            index % 2 ? rotation : -rotation
          }deg)`,
          `translate(-50%, -50%) scale(1) rotate(${
            index % 2 ? -rotation : rotation
          }deg)`,
        ],
      },
      { type: "spring", damping: 15, stiffness: 200 }
    );

    animate(
      el,
      { opacity: [1, 0] },
      { ease: "linear", duration: 0.5, delay: 5 }
    );

    imageRenderCount.current++;
  }, [animate, images.length, rotationRange]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;

    const distance = calculateDistance(
      clientX,
      clientY,
      lastRenderPosition.current.x,
      lastRenderPosition.current.y
    );

    if (distance >= renderImageBuffer) {
      lastRenderPosition.current = { x: clientX, y: clientY };
      renderNextImage();
    }
  };

  return (
    <div
      ref={scope}
      className="relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {children}
      {images.map((img, i) => (
        <img
          ref={(el) => {
            if (el) imageRefs.current[i] = el;
          }}
          key={i}
          src={img}
          alt={`Trail ${i}`}
          data-mouse-move-index={i}
          className="pointer-events-none absolute left-0 top-0 h-48 w-auto rounded-xl border-2 border-black bg-neutral-900 object-cover opacity-0 transition-opacity duration-300"
        />
      ))}
    </div>
  );
};
