import { motion } from "framer-motion";

interface Props {
  text: string;
}
const TypingText = ({ text }: Props) => {
  const textArray = text.split("");
  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const child = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        ease: "linear",
        duration: 0.05, // Adjust duration for speed of typing
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      style={{ overflow: "hidden", display: "inline-block" }}
    >
      {textArray.map((char, index) => (
        <motion.span key={index} variants={child}>
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default TypingText;
