import { WizardStep } from "./WizardStep";

interface Step {
  title: string;
  description?: string;
}

interface WizardProgressProps {
  steps: Step[];
  currentStep: number;
}

export function WizardProgress({ steps, currentStep }: WizardProgressProps) {
  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <WizardStep
            step={index + 1}
            currentStep={currentStep}
            title={step.title}
            description={step.description}
          />
          {index < steps.length - 1 && (
            <div
              className={`hidden sm:block mx-4 h-0.5 w-12 lg:w-24 ${
                currentStep > index + 1 ? "bg-primary" : "bg-muted"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
