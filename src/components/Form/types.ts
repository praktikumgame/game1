interface IProps {
  sendFormHandler(event: React.MouseEvent): void;
  children: React.ReactNode;
  formIsLoad: boolean;
  buttonText: string;
  formValidator?: any;
  serverError: string;
  clearError: () => void;
}

export { IProps };
