
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
      <div key={question.id} className="space-y-3">
        <Label className="text-base font-medium text-gray-900 leading-relaxed">
          {question.label}
          {question.required && <span className="text-red-500 ml-1">*</span>}
        </Label>

        {question.type === 'text' && (
          <Input
            value={value}
            onChange={(e) => onFieldChange(question.id, e.target.value)}
            placeholder={question.placeholder}
            className={error ? 'border-red-500' : ''}
          />
        )}

        {question.type === 'textarea' && (
          <Textarea
            value={value}
            onChange={(e) => onFieldChange(question.id, e.target.value)}
            placeholder={question.placeholder}
            rows={4}
            className={error ? 'border-red-500' : ''}
          />
        )}

        {question.type === 'select' && (
          <Select
            value={value}
            onValueChange={(newValue) => onFieldChange(question.id, newValue)}
          >
            <SelectTrigger className={error ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {question.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
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
            className="space-y-2"
          >
            {question.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                <Label htmlFor={`${question.id}-${option.value}`} className="font-normal">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}

        {question.type === 'multiselect' && (
          <div className="space-y-3">
            {question.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
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
                />
                <Label htmlFor={`${question.id}-${option.value}`} className="font-normal">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        )}

        {error && (
          <p className="text-sm text-red-500 mt-1">{error}</p>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {section.questions.map(renderQuestion)}
    </div>
  );
};

export default FormSection;
