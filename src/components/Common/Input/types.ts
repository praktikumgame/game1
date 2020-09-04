import { ChangeEvent } from 'react';

interface IProps {
  handleOnChange(event: ChangeEvent): void;
  isError?: boolean;
  type: string;
  placeholder: string;
  name: string;
  value: string;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
}

export { IProps };
