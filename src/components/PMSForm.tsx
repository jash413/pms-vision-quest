
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import FormSection from './FormSection';
import { formSections } from '@/data/formSections';

interface PMSFormProps {
  onSubmit: (data: any) => void;
}

const PMSForm: React.FC<PMSFormProps> = ({ onSubmit }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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

  const handleSubmit = async () => {
    if (!validateCurrentSection()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Extract some key fields for easier querying
      const submitterName = formData['submitter_name'] || formData['contact_name'] || '';
      const targetTimeline = formData['target_timeline'] || '';
      const deploymentModel = formData['deployment_model'] || '';
      const multiPropertySupport = formData['multi_property_support'] === 'yes' || 
                                   (Array.isArray(formData['multi_property_support']) && 
                                    formData['multi_property_support'].includes('yes'));
      const whiteLabeledOption = formData['white_labeled'] === 'yes' || 
                                (Array.isArray(formData['white_labeled']) && 
                                 formData['white_labeled'].includes('yes'));

      console.log('Submitting form data:', formData);

      const { data, error } = await supabase
        .from('pms_requirements')
        .insert({
          form_data: formData,
          submitter_name: submitterName,
          target_timeline: targetTimeline,
          deployment_model: deploymentModel,
          multi_property_support: multiPropertySupport,
          white_labeled: whiteLabeledOption
        })
        .select()
        .single();

      if (error) {
        console.error('Error submitting form:', error);
        toast({
          title: "Submission Error",
          description: "There was an error submitting your form. Please try again.",
          variant: "destructive",
        });
        return;
      }

      console.log('Form submitted successfully:', data);
      toast({
        title: "Form Submitted Successfully!",
        description: "Your PMS requirements have been recorded.",
      });

      onSubmit(formData);
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Submission Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
          disabled={currentSection === 0 || isSubmitting}
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
              disabled={isSubmitting}
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
            disabled={isSubmitting}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Form'}
            <CheckCircle className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            disabled={isSubmitting}
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
