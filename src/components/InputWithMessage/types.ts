interface IProps {
  saveInputValue(target: HTMLInputElement): void;
  validator(target: HTMLInputElement, callback: (text: string) => void): boolean | void;
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
