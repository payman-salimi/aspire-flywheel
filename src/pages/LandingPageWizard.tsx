import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { WizardProgress } from "@/components/wizard/WizardProgress";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, Eye } from "lucide-react";
import { toast } from "sonner";
import { LandingPageBasicInfo } from "@/components/landing-page/LandingPageBasicInfo";
import { LandingPageFormFields } from "@/components/landing-page/LandingPageFormFields";
import { LandingPageBranding } from "@/components/landing-page/LandingPageBranding";
import { LandingPagePreview } from "@/components/landing-page/LandingPagePreview";

export interface FormField {
  id: string;
  label: string;
  type: "text" | "email" | "url" | "textarea" | "select" | "number";
  required: boolean;
  placeholder?: string;
  options?: string[]; // For select fields
}

export interface LandingPageData {
  // Basic Info
  title: string;
  description: string;
  slug: string;
  // Form Fields
  formFields: FormField[];
  // Branding
  logoUrl: string;
  primaryColor: string;
  headerText: string;
  ctaButtonText: string;
  thankYouMessage: string;
}

const defaultFormFields: FormField[] = [
  { id: "1", label: "Full Name", type: "text", required: true, placeholder: "Enter your name" },
  { id: "2", label: "Email", type: "email", required: true, placeholder: "you@example.com" },
  { id: "3", label: "Instagram Handle", type: "text", required: true, placeholder: "@yourhandle" },
  { id: "4", label: "Follower Count", type: "select", required: true, options: ["1K-10K", "10K-50K", "50K-100K", "100K-500K", "500K+"] },
  { id: "5", label: "Why do you want to collaborate?", type: "textarea", required: false, placeholder: "Tell us about yourself..." },
];

const initialData: LandingPageData = {
  title: "Join Our Creator Program",
  description: "Partner with us to create amazing content and grow your audience",
  slug: "apply",
  formFields: defaultFormFields,
  logoUrl: "",
  primaryColor: "#14b8a6",
  headerText: "Become a Brand Ambassador",
  ctaButtonText: "Submit Application",
  thankYouMessage: "Thank you for applying! We'll review your application and get back to you soon.",
};

const steps = [
  { title: "Basic Info", description: "Page details" },
  { title: "Form Fields", description: "Collect data" },
  { title: "Branding", description: "Customize look" },
  { title: "Preview", description: "Review & publish" },
];

export default function LandingPageWizard() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<LandingPageData>(initialData);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const updateData = (updates: Partial<LandingPageData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePublish = () => {
    toast.success("Landing page published successfully!", {
      description: `Your page is now live at /apply/${data.slug}`,
    });
    navigate("/creators");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <LandingPageBasicInfo data={data} updateData={updateData} />;
      case 2:
        return <LandingPageFormFields data={data} updateData={updateData} />;
      case 3:
        return <LandingPageBranding data={data} updateData={updateData} />;
      case 4:
        return <LandingPagePreview data={data} />;
      default:
        return null;
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/creators")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-semibold">Create Landing Page</h1>
              <p className="text-sm text-muted-foreground">
                Build a custom application page for creators
              </p>
            </div>
          </div>
          {currentStep < 4 && (
            <Button variant="outline" onClick={() => setShowPreviewModal(true)}>
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
          )}
        </div>

        {/* Progress */}
        <div className="rounded-lg border bg-card p-6">
          <WizardProgress steps={steps} currentStep={currentStep} />
        </div>

        {/* Step Content */}
        <div className="rounded-lg border bg-card p-6">{renderStep()}</div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div className="flex gap-2">
            {currentStep < steps.length ? (
              <Button onClick={handleNext}>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handlePublish}>
                <Check className="mr-2 h-4 w-4" />
                Publish Landing Page
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-auto rounded-lg border bg-card shadow-lg">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-card p-4">
              <h2 className="font-semibold">Preview</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowPreviewModal(false)}>
                Close
              </Button>
            </div>
            <div className="p-6">
              <LandingPagePreview data={data} />
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
