
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, CheckCircle, Building2, Sparkles } from "lucide-react";
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
    <div className="max-w-5xl mx-auto">
      {/* Progress Section */}
      <Card className="mb-10 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <CardContent className="pt-8 pb-8 px-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 w-10 h-10 rounded-xl flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-lg font-semibold text-slate-800">
                  Section {currentSection + 1} of {totalSections}
                </p>
                <p className="text-sm text-slate-600">
                  {formSections[currentSection].title}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-slate-800">
                {Math.round(progress)}%
              </p>
              <p className="text-sm text-slate-600">Complete</p>
            </div>
          </div>
          <Progress 
            value={progress} 
            className="h-3 bg-slate-200" 
          />
        </CardContent>
      </Card>

      {/* Current Section */}
      <Card className="mb-10 bg-white/90 backdrop-blur-sm border-0 shadow-2xl">
        <CardHeader className="pb-6 px-8 pt-8">
          <div className="flex items-start gap-4">
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-8 h-8 text-blue-600" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-3xl text-slate-800 mb-3 leading-tight">
                {formSections[currentSection].title}
              </CardTitle>
              {formSections[currentSection].description && (
                <CardDescription className="text-lg text-slate-600 leading-relaxed">
                  {formSections[currentSection].description}
                </CardDescription>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <FormSection
            section={formSections[currentSection]}
            formData={formData}
            errors={errors}
            onFieldChange={handleFieldChange}
          />
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentSection === 0 || isSubmitting}
          className="flex items-center gap-2 px-6 py-3 text-lg bg-white hover:bg-slate-50 border-slate-300 text-slate-700 disabled:opacity-50"
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </Button>

        <div className="flex gap-3">
          {formSections.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSection(index)}
              disabled={isSubmitting}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentSection
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 scale-125 shadow-lg'
                  : index < currentSection
                  ? 'bg-gradient-to-r from-green-400 to-green-500 shadow-md'
                  : 'bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to section ${index + 1}`}
            />
          ))}
        </div>

        {isLastSection ? (
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-8 py-3 text-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Requirements'}
            <CheckCircle className="w-5 h-5" />
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-3 text-lg bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Next Section
            <ChevronRight className="w-5 h-5" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default PMSForm;
