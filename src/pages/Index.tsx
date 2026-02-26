import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import VideoIntro from "@/components/VideoIntro";
import LoadingScreen from "@/components/LoadingScreen";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import BenefitsSection from "@/components/BenefitsSection";
import PricingSection from "@/components/PricingSection";
import FooterSection from "@/components/FooterSection";
import LeadCaptureDialog from "@/components/LeadCaptureDialog";

const Index = () => {
  const [showVideo, setShowVideo] = useState(true);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {showVideo && <VideoIntro onComplete={() => setShowVideo(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {!showVideo && loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="min-h-screen bg-background"
        >
          <HeroSection onCtaClick={() => setDialogOpen(true)} />
          <ProblemSection />
          <BenefitsSection />
          <PricingSection onCtaClick={() => setDialogOpen(true)} />
          <FooterSection />
          <LeadCaptureDialog open={dialogOpen} onOpenChange={setDialogOpen} />
        </motion.div>
      )}
    </>
  );
};

export default Index;
