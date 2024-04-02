import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(userLoginData: { email: $email, password: $password }) {
      message
      status
      token
    }
  }
`;

export const FORGOT_PASSWORD = gql`
  mutation forgotPassword($userEmail: String!) {
    forgotPassword(userEmail: $userEmail)
  }
`;

export const VERIFY_OTP = gql`
  mutation VerifyOtp($email: String!, $otp: Float!) {
    verifyOtp(verifyOtpData: { email: $email, otp: $otp }) {
      message
      status
      token
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation Resetpasssword($token: String!, $password: String!) {
    resetpasssword(resetPasswordInput: { token: $token, password: $password })
  }
`;
