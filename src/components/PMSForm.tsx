
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FormSection from './FormSection';
import { formSections } from '@/data/formSections';

interface PMSFormProps {
  onSubmit: (data: any) => void;
}

const PMSForm: React.FC<PMSFormProps> = ({ onSubmit }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalSections = formSections.length;
  const progress = ((currentSection + 1) / totalSections) * 100;

  const handleFieldChange = (fieldName: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
    
    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: ''
      }));
    }
  };

  const validateCurrentSection = () => {
    const currentSectionData = formSections[currentSection];
    const newErrors: Record<string, string> = {};
    
    currentSectionData.questions.forEach(question => {
      if (question.required && (!formData[question.id] || 
          (Array.isArray(formData[question.id]) && formData[question.id].length === 0))) {
        newErrors[question.id] = 'This field is required';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentSection()) {
      if (currentSection < totalSections - 1) {
        setCurrentSection(currentSection + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = () => {
    if (validateCurrentSection()) {
      onSubmit(formData);
    }
  };

  const isLastSection = currentSection === totalSections - 1;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Section {currentSection + 1} of {totalSections}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {/* Current Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-900">
            {formSections[currentSection].title}
          </CardTitle>
          {formSections[currentSection].description && (
            <CardDescription className="text-base">
              {formSections[currentSection].description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <FormSection
            section={formSections[currentSection]}
            formData={formData}
            errors={errors}
            onFieldChange={handleFieldChange}
          />
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentSection === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        <div className="flex gap-2">
          {formSections.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSection(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSection
                  ? 'bg-blue-600'
                  : index < currentSection
                  ? 'bg-green-500'
                  : 'bg-gray-300'
              }`}
              aria-label={`Go to section ${index + 1}`}
            />
          ))}
        </div>

        {isLastSection ? (
          <Button
            onClick={handleSubmit}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
          >
            Submit Form
            <CheckCircle2 className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            className="flex items-center gap-2"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default PMSForm;
