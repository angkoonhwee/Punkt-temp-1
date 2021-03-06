export const LoginStart = (userCredentials) => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const LoginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});

export const GoogleLogin = (user) => ({
  type: "GOOGLE_LOGIN",
  payload: user,
});

export const Logout = (user) => ({
  type: "LOGOUT",
});
