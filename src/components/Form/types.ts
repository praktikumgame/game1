interface IProps {
  sendFormHandler(): Promise<void>;
  children: React.ReactNode;
  buttonText: string;
}

export { IProps };
