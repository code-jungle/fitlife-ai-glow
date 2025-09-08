import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import PersonalInfoStep from "@/components/profile/PersonalInfoStep";
import ActivityLevelStep from "@/components/profile/ActivityLevelStep";
import GoalsStep from "@/components/profile/GoalsStep";
import RestrictionsStep from "@/components/profile/RestrictionsStep";

const steps = [
  { id: 1, title: "Informações Pessoais", description: "Dados físicos básicos" },
  { id: 2, title: "Nível de Atividade", description: "Frequência de exercícios" },
  { id: 3, title: "Objetivos", description: "Suas metas fitness" },
  { id: 4, title: "Restrições", description: "Limitações alimentares" },
];

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState({
    // Personal Info
    age: "",
    gender: "",
    height: "",
    weight: "",
    // Activity Level
    activityLevel: "",
    // Goals
    goal: "",
    targetWeight: "",
    // Restrictions
    allergies: [] as string[],
    dietaryRestrictions: [] as string[],
  });

  const progress = (currentStep / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save profile and redirect
      console.log("Profile completed:", profileData);
      navigate("/dashboard");
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep 
            data={profileData} 
            updateData={setProfileData} 
          />
        );
      case 2:
        return (
          <ActivityLevelStep 
            data={profileData} 
            updateData={setProfileData} 
          />
        );
      case 3:
        return (
          <GoalsStep 
            data={profileData} 
            updateData={setProfileData} 
          />
        );
      case 4:
        return (
          <RestrictionsStep 
            data={profileData} 
            updateData={setProfileData} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-poppins font-bold gradient-text mb-2">
            Configurar Perfil
          </h1>
          <p className="text-muted-foreground">
            Personalize sua experiência fitness
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-muted-foreground">
              Etapa {currentStep} de {steps.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}% concluído
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Card */}
        <Card className="glass-card border border-white/10 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-poppins text-foreground">
              {steps[currentStep - 1].title}
            </CardTitle>
            <p className="text-muted-foreground">
              {steps[currentStep - 1].description}
            </p>
          </CardHeader>
          
          <CardContent>
            {renderStep()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="btn-secondary"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Anterior
          </Button>
          
          <Button
            onClick={handleNext}
            className="btn-primary"
          >
            {currentStep === steps.length ? "Finalizar" : "Próximo"}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;