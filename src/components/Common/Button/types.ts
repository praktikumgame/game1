export interface IProps {
  onClick: (event: React.MouseEvent) => void;
  formIsValid?: boolean;
  buttonText: string;
  className?: string;
}
