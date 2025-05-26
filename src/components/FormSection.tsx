
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormSection as FormSectionType, Question } from '@/types/form';

interface FormSectionProps {
  section: FormSectionType;
  formData: Record<string, any>;
  errors: Record<string, string>;
  onFieldChange: (fieldName: string, value: any) => void;
}

const FormSection: React.FC<FormSectionProps> = ({
  section,
  formData,
  errors,
  onFieldChange
}) => {
  const renderQuestion = (question: Question) => {
    const value = formData[question.id] || (question.type === 'multiselect' ? [] : '');
    const error = errors[question.id];

    return (
      <div key={question.id} className="space-y-3 sm:space-y-4 p-4 sm:p-6 bg-gradient-to-r from-slate-50/50 to-blue-50/50 rounded-xl border border-slate-200/50">
        <Label className="text-base sm:text-lg font-semibold text-slate-800 leading-relaxed block">
          {question.label}
          {question.required && <span className="text-red-500 ml-2">*</span>}
        </Label>

        {question.type === 'text' && (
          <Input
            value={value}
            onChange={(e) => onFieldChange(question.id, e.target.value)}
            placeholder={question.placeholder}
            className={`text-sm sm:text-base py-2 sm:py-3 px-3 sm:px-4 bg-white border-2 focus:border-blue-400 transition-all duration-200 ${
              error ? 'border-red-400 bg-red-50' : 'border-slate-200 hover:border-slate-300'
            }`}
          />
        )}

        {question.type === 'textarea' && (
          <Textarea
            value={value}
            onChange={(e) => onFieldChange(question.id, e.target.value)}
            placeholder={question.placeholder}
            rows={3}
            className={`text-sm sm:text-base py-2 sm:py-3 px-3 sm:px-4 bg-white border-2 focus:border-blue-400 transition-all duration-200 resize-none ${
              error ? 'border-red-400 bg-red-50' : 'border-slate-200 hover:border-slate-300'
            }`}
          />
        )}

        {question.type === 'select' && (
          <Select
            value={value}
            onValueChange={(newValue) => onFieldChange(question.id, newValue)}
          >
            <SelectTrigger className={`text-sm sm:text-base py-2 sm:py-3 px-3 sm:px-4 bg-white border-2 focus:border-blue-400 transition-all duration-200 ${
              error ? 'border-red-400 bg-red-50' : 'border-slate-200 hover:border-slate-300'
            }`}>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent className="bg-white border-2 border-slate-200 shadow-xl">
              {question.options?.map((option) => (
                <SelectItem 
                  key={option.value} 
                  value={option.value}
                  className="text-sm sm:text-base py-2 sm:py-3 hover:bg-blue-50 cursor-pointer"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {question.type === 'radio' && (
          <RadioGroup
            value={value}
            onValueChange={(newValue) => onFieldChange(question.id, newValue)}
            className="space-y-2 sm:space-y-4"
          >
            {question.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-300 transition-all duration-200">
                <RadioGroupItem 
                  value={option.value} 
                  id={`${question.id}-${option.value}`}
                  className="border-2 border-slate-300 data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500 w-4 h-4 sm:w-5 sm:h-5"
                />
                <Label 
                  htmlFor={`${question.id}-${option.value}`} 
                  className="text-sm sm:text-base font-medium text-slate-700 cursor-pointer flex-1 leading-relaxed"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}

        {question.type === 'multiselect' && (
          <div className="space-y-2 sm:space-y-3">
            {question.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-300 transition-all duration-200">
                <Checkbox
                  id={`${question.id}-${option.value}`}
                  checked={value.includes(option.value)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      onFieldChange(question.id, [...value, option.value]);
                    } else {
                      onFieldChange(question.id, value.filter((v: string) => v !== option.value));
                    }
                  }}
                  className="border-2 border-slate-300 data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500 w-4 h-4 sm:w-5 sm:h-5"
                />
                <Label 
                  htmlFor={`${question.id}-${option.value}`} 
                  className="text-sm sm:text-base font-medium text-slate-700 cursor-pointer flex-1 leading-relaxed"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 p-2 sm:p-3 bg-red-50 border border-red-200 rounded-lg">
            <span className="text-red-500 text-sm">⚠</span>
            <p className="text-xs sm:text-sm text-red-600 font-medium">{error}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {section.questions.map(renderQuestion)}
    </div>
  );
};

export default FormSection;
