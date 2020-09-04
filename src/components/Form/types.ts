interface IProps {
  sendFormHandler(event: React.MouseEvent): void;
  children: React.ReactNode;
  formIsLoad: boolean;
  buttonText: string;
  formValidator?: (value: string) => boolean;
  serverError: string;
  clearError: () => void;
}

export { IProps };
