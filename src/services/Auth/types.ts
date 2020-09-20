type AuthProps = {
  isAuthorized: boolean;
  authorize(): void;
  logout(): void;
  isLoad: boolean;
};

export { AuthProps };
