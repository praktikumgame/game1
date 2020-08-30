type authContext = {
  isAuthorized: boolean;
  authorize(): void;
  logout(): void;
  isLoad?: boolean;
};

export { authContext };
