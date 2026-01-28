import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface WizardStepProps {
  step: number;
  currentStep: number;
  title: string;
  description?: string;
}

export function WizardStep({ step, currentStep, title, description }: WizardStepProps) {
  const isCompleted = currentStep > step;
  const isCurrent = currentStep === step;

  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium transition-colors",
          isCompleted && "bg-primary text-primary-foreground",
          isCurrent && "bg-primary text-primary-foreground ring-4 ring-primary/20",
          !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
        )}
      >
        {isCompleted ? <Check className="h-4 w-4" /> : step}
      </div>
      <div className="hidden sm:block">
        <p
          className={cn(
            "text-sm font-medium",
            isCurrent ? "text-foreground" : "text-muted-foreground"
          )}
        >
          {title}
        </p>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
}
