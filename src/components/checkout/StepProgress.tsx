import { motion } from "framer-motion";

interface StepProgressProps {
  currentStep: number;
  steps: string[];
}

const StepProgress = ({ currentStep, steps }: StepProgressProps) => (
  <div className="flex items-center justify-center gap-0 mb-8">
    {steps.map((label, i) => (
      <div key={label} className="flex items-center">
        <div className="flex flex-col items-center">
          <motion.div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-display border-2 transition-colors ${
              i <= currentStep
                ? "bg-primary border-primary text-primary-foreground"
                : "border-muted-foreground/30 text-muted-foreground"
            }`}
            animate={i === currentStep ? { scale: [1, 1.15, 1] } : {}}
            transition={{ duration: 0.4 }}
          >
            {i + 1}
          </motion.div>
          <span className={`text-xs font-body mt-1 whitespace-nowrap ${
            i <= currentStep ? "text-primary" : "text-muted-foreground"
          }`}>
            {label}
          </span>
        </div>
        {i < steps.length - 1 && (
          <div className={`w-12 md:w-20 h-0.5 mx-1 mt-[-14px] ${
            i < currentStep ? "bg-primary" : "bg-muted-foreground/30"
          }`} />
        )}
      </div>
    ))}
  </div>
);

export default StepProgress;
