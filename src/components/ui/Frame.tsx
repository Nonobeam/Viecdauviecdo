import { motion } from "framer-motion";

type FrameProps = {
  center?: boolean;
  height?: number | string;
  borderRadius?: number | string;
  style?: React.CSSProperties;
  drag?: boolean | "x" | "y";
  dragConstraints?: { left?: number; right?: number; top?: number; bottom?: number };
  onDragEnd?: (event: MouseEvent | TouchEvent | PointerEvent, info: any) => void;
  x?: any;
  animate?: any;
  rotate?: any;
  opacity?: any;
  children?: React.ReactNode;
};

export const Frame = ({
  center,
  style,
  children,
  ...props
}: FrameProps) => {
  const computedStyle: React.CSSProperties = {
    ...style,
    ...(center && {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }),
  };

  return (
    <motion.div style={computedStyle} {...props}>
      {children}
    </motion.div>
  );
};