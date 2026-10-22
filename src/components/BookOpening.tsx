import { motion, useReducedMotion } from "framer-motion";
import { BookOpen, Star } from "lucide-react";

export default function BookOpening({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className="book-opening"
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ duration: reduced ? 0 : 6.5, times: [0, 0.05, 0.94, 1] }}
      onAnimationComplete={onComplete}
    >
      <div className="opening-book">
        <div className="opening-pages">
          <Star />
          <span>
            Todo gran misterio
            <br />
            empieza con una página.
          </span>
        </div>
        <motion.div
          className="opening-cover"
          initial={{ rotateY: 0 }}
          animate={{ rotateY: -155 }}
          transition={{
            duration: reduced ? 0 : 1.6,
            delay: reduced ? 0 : 1.2,
            ease: "easeInOut",
          }}
        >
          <BookOpen />
          <span>
            El misterio de
            <br />
            nuestro universo
          </span>
          <Star size={18} />
        </motion.div>
      </div>
    </motion.div>
  );
}
