import { useState } from "react";
import { motion } from "framer-motion";

interface VideoIntroProps {
  onComplete: () => void;
}

const VideoIntro = ({ onComplete }: VideoIntroProps) => {
  const [ready, setReady] = useState(false);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-full h-full">
        <iframe
          src="https://drive.google.com/file/d/1Or00Ske5vsme2VtZIPqheyCltZRAIOY9/preview"
          className="w-full h-full"
          allow="autoplay; encrypted-media"
          allowFullScreen
          onLoad={() => setReady(true)}
        />
      </div>

      {ready && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={onComplete}
          className="absolute bottom-8 right-8 font-display text-sm tracking-widest px-6 py-3 rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-all z-10"
        >
          PULAR ▶
        </motion.button>
      )}
    </motion.div>
  );
};

export default VideoIntro;
