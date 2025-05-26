
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2 } from "lucide-react";
import PMSForm from "@/components/PMSForm";

const Index = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = (formData: any) => {
    console.log('Form submitted with data:', formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl mx-auto text-center">
          <CardContent className="pt-8 pb-8">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Thank You!
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              We've recorded your preferences. Our team will review this to design your ideal PMS.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>Next Steps:</strong> Our development team will analyze your requirements 
                and prepare a customized proposal for your Property Management System within 2-3 business days.
              </p>
            </div>
            <Button 
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              className="mt-4"
            >
              Submit Another Response
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            PMS Development Requirements
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Welcome to the Property Management System Development Requirements Questionnaire.
            Please fill out this form to define the key features and goals of your Property Management System.
          </p>
          <div className="mt-6 bg-white rounded-lg shadow-sm border p-4 max-w-2xl mx-auto">
            <p className="text-sm text-gray-700">
              <strong>For:</strong> Chandresh Patel | <strong>Estimated Time:</strong> 10-15 minutes
            </p>
          </div>
        </div>

        {/* Form */}
        <PMSForm onSubmit={handleFormSubmit} />
      </div>
    </div>
  );
};

export default Index;
