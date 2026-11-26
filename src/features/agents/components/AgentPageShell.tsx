import { useReducedMotion, useSpring, motion } from "motion/react";
import { useRef, type PointerEvent, type ReactNode } from "react";

type AgentPageShellProps = {
  children: ReactNode;
};

const AgentPageShell = ({ children }: AgentPageShellProps) => {
  const shellRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const pointerX = useSpring(-500, { stiffness: 90, damping: 24 });
  const pointerY = useSpring(-500, { stiffness: 90, damping: 24 });

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion || !shellRef.current) return;

    const bounds = shellRef.current.getBoundingClientRect();
    pointerX.set(event.clientX - bounds.left);
    pointerY.set(event.clientY - bounds.top);
  };

  const handlePointerLeave = () => {
    pointerX.set(-500);
    pointerY.set(-500);
  };

  return (
    <main
      className="relative isolate min-h-screen overflow-hidden bg-[#000] text-[#f3f1f5]"
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      ref={shellRef}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <motion.div
          animate={
            reduceMotion
              ? { x: 0, y: 0, scale: 1 }
              : {
                  x: [0, 42, -24, 0],
                  y: [0, 32, -18, 0],
                  scale: [1, 1.08, 0.96, 1],
                }
          }
          className="absolute -top-56 left-[18%] size-[34rem] rounded-full bg-blue-600/10 blur-[120px]"
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          animate={
            reduceMotion
              ? { x: 0, y: 0, scale: 1 }
              : {
                  x: [0, -36, 24, 0],
                  y: [0, -28, 20, 0],
                  scale: [1, 0.94, 1.06, 1],
                }
          }
          className="absolute -right-52 top-[35%] size-[32rem] rounded-full bg-sky-600/10 blur-[130px]"
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute size-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.07] blur-[100px]"
          style={{ left: pointerX, top: pointerY }}
        />
      </div>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10"
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </main>
  );
};

export default AgentPageShell;
