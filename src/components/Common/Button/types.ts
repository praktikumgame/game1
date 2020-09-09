export interface IProps {
  onClick: (event: React.MouseEvent) => void;
  disabled?: boolean;
  buttonText: string;
  className?: string;
}
