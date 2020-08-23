type authContext = {
  isAuthorized: boolean;
  authorize(): void;
  logout(): void;
};

export { authContext };
