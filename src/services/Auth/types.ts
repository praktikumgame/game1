type authContext = {
  isAuthorized: boolean;
  authorize(): void;
  logout(): void;
  isLoading?: boolean;
};

export { authContext };
