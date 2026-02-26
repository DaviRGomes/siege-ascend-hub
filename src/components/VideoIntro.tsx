import { motion } from "framer-motion";

interface VideoIntroProps {
  onComplete: () => void;
}

const VideoIntro = ({ onComplete }: VideoIntroProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-[90%] max-w-2xl"
      >
        <p className="font-display text-sm tracking-[0.3em] text-gold-dim text-center mb-4 uppercase">
          Assista antes de continuar
        </p>

        <div className="relative aspect-video rounded-lg overflow-hidden border border-border/30 shadow-lg">
          <iframe
            src="https://drive.google.com/file/d/1Or00Ske5vsme2VtZIPqheyCltZRAIOY9/preview"
            className="w-full h-full"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
          <div className="absolute inset-0 z-10" />
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          onClick={onComplete}
          className="mt-6 mx-auto block font-display text-sm tracking-widest px-8 py-3 rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
        >
          CONTINUAR ▶
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default VideoIntro;
