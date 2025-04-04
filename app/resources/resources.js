export const endpoints = {
  auth: {
    createUser: "auth/signup",
    loginUser: "auth/signin",
    loginGoogle: "auth/google",
    forgetPassword: "auth/forgot-password",
    resetPasswordWithCode: "auth/reset-password",
    verifyOTP: "auth/verify-otp",
    refresh: "auth/refresh",
  },
  user: {
    profile: "account/profile",
  },
  pitch: {
    new: "pitch/new",
    // list: "pitch/list",
  },
}


