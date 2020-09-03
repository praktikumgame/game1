type AuthContext = {
  isAuthorized: boolean;
  authorize(): void;
  logout(): void;
  isLoading?: boolean;
};

export { AuthContext };
