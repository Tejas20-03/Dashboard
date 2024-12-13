interface LoginCredentials {
  email: string;
  password: string;
}

export const mockLogin = async (credentials: LoginCredentials) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (
    credentials.email === "user@example.com" &&
    credentials.password === "password123"
  ) {
    return {
      success: true,
      token: "mock-jwt-token",
      user: {
        id: 1,
        name: "Test User",
        email: credentials.email,
      },
    };
  }

  throw new Error("Invalid credentials");
};
