
export interface Option {
  value: string;
  label: string;
}

export interface Question {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'radio' | 'multiselect';
  options?: Option[];
  required?: boolean;
  placeholder?: string;
}

export interface FormSection {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}
