
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Building2, Users, Key } from "lucide-react";
import PMSForm from "@/components/PMSForm";

const Index = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = (formData: any) => {
    console.log('Form submitted with data:', formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl mx-auto text-center shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="pt-12 pb-12 px-8">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-slate-800 mb-6">
              Thank You for Your Submission!
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              We've successfully recorded your Property Management System requirements. 
              Our expert development team will carefully review your specifications.
            </p>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-blue-900 mb-3 flex items-center justify-center gap-2">
                <Building2 className="w-5 h-5" />
                What Happens Next?
              </h3>
              <p className="text-sm text-blue-800 leading-relaxed">
                Our development team will analyze your requirements and prepare a comprehensive, 
                customized proposal for your Property Management System within 2-3 business days. 
                You'll receive a detailed technical specification and timeline.
              </p>
            </div>
            <Button 
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              className="bg-white hover:bg-slate-50 border-slate-300 text-slate-700 px-8 py-3 text-lg"
            >
              Submit Another Response
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              PMS Development
            </h1>
          </div>
          
          <h2 className="text-3xl font-semibold text-slate-700 mb-6">
            Requirements Questionnaire
          </h2>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-8">
            Welcome to our comprehensive Property Management System Development Requirements platform.
            Help us design the perfect PMS solution tailored to your specific needs and workflow requirements.
          </p>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="pt-6 pb-6 px-6 text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">For</h3>
                <p className="text-slate-600">Chandresh Patel</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="pt-6 pb-6 px-6 text-center">
                <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 font-bold text-lg">⏱</span>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Duration</h3>
                <p className="text-slate-600">10-15 minutes</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="pt-6 pb-6 px-6 text-center">
                <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Key className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Purpose</h3>
                <p className="text-slate-600">Custom PMS Design</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Form Section */}
        <PMSForm onSubmit={handleFormSubmit} />
      </div>
    </div>
  );
};

export default Index;
