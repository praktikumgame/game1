interface IProps {
  sendFormHandler(event: React.MouseEvent): void;
  children: React.ReactNode;
  formIsLoad: boolean;
  buttonText: string;
  formValidator?: () => boolean;
  serverError: string;
}

export { IProps };
