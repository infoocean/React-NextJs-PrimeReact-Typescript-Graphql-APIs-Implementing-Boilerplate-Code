import { LoginFormValues, resetpasswordFormValues, verifyOtpFormValues } from "@/types/auth";
import client from "../api/grapgql_api";
import { GET_AUTHORIZATION_TOKEN } from "../grapgql/grapgql_query/auth_query";
import { FORGOT_PASSWORD, LOGIN_MUTATION, RESET_PASSWORD, VERIFY_OTP } from "../grapgql/grapgql_mutation/auth_mutation";

const get_authorization_token = async () => {
  try {
    const { data: { generateAuthorizationToken: { token } } } = await client.query({
      query: GET_AUTHORIZATION_TOKEN,
    });
    if (token) {
      localStorage.setItem("authorization_token", token);
    }
  } catch (error) {
    console.error("Error fetching authorization token:", error);
  }
};
export { get_authorization_token };

export const handleLogin = async (loginInputData: LoginFormValues) => {
  try {
    const { data } = await client.mutate({
      mutation: LOGIN_MUTATION,
      variables: {
        email: loginInputData?.email,
        password: loginInputData?.password,
      },
    });
    if (data && data.login && data.login.token) {
      return { success: true, data: data };
    }
  } catch (error) {
    return { success: false, message: "An error occurred while logging in", error: error };
  }
};

export const handleVerifyOtp = async (verifyOtpInputData: verifyOtpFormValues) => {
  try {
    const { data } = await client.mutate({
      mutation: VERIFY_OTP,
      variables: {
        email: verifyOtpInputData?.email,
        otp: verifyOtpInputData?.otp,
      },
    });
    if (data) {
      return { success: true, data: data };
    }
  } catch (error) {
    return { success: false, message: "An error occurred while verify otp in", error: error };
  }
};

//forgot password and resend otp working with this function
export const forgotPassword = async (email: string|null) => {
  try {
    const { data } = await client.mutate({
      mutation: FORGOT_PASSWORD,
      variables: {
        userEmail: email,
      },
    });
    if (data) {
      return { success: true, data: data };
    }
  } catch (error) {
    return { success: false, message: "An error occurred while resend otp in", error: error };
  }
};

export const resetPassword = async (inputdata: resetpasswordFormValues) => {
  try {
    const { data } = await client.mutate({
      mutation: RESET_PASSWORD,
      variables: {
        token: inputdata?.reset_password_token,
        password: inputdata?.password
      },
    });
    if (data) {
      return { success: true, data: data };
    }
  } catch (error) {
    return { success: false, message: "An error occurred while resend otp in", error: error };
  }
};


