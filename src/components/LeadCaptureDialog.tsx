import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface LeadCaptureDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LeadCaptureDialog = ({ open, onOpenChange }: LeadCaptureDialogProps) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [instagram, setInstagram] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onOpenChange(false);
      setTimeout(() => {
        setSubmitted(false);
        setEmail("");
        setPhone("");
        setInstagram("");
      }, 300);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border sm:max-w-md">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12"
            >
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4 shadow-gold">
                <Check className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-display text-2xl text-foreground mb-2">ACCESS GRANTED</h3>
              <p className="font-body text-sm text-muted-foreground">
                Welcome to the Siege Masterclass, Champion.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DialogHeader>
                <DialogTitle className="font-display text-2xl text-foreground text-center tracking-wider">
                  <span className="text-gradient-gold">GET INSTANT ACCESS</span>
                </DialogTitle>
                <p className="font-body text-sm text-muted-foreground text-center mt-2">
                  Enter your details below to enroll in the Siege Masterclass.
                </p>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                <div>
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground font-body"
                  />
                </div>
                <div>
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground font-body"
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    placeholder="Instagram Handle"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground font-body"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full font-display text-lg tracking-wider py-6 bg-primary text-primary-foreground hover:bg-gold-glow transition-all duration-300"
                >
                  GET INSTANT ACCESS
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default LeadCaptureDialog;
