import { SignUpFormValues } from "@/types/auth";
import client from "../api/grapgql_api";
import { CREATE_USER } from "../grapgql/grapgql_mutation/user_mutation";

export const handleSignUp = async (signUpInputData: SignUpFormValues) => {
    try {
      const { data } = await client.mutate({
        mutation: CREATE_USER,
        variables: {
          first_name:signUpInputData?.first_name,
          last_name:signUpInputData?.last_name,
          email: signUpInputData?.email,
          phone: signUpInputData?.phone,
          password: signUpInputData?.password,
          role_id: signUpInputData?.role_id ? signUpInputData?.role_id : 2
        },
      });
      if (data && data.createUser) {
        return { success: true, data: data };
      }
    } catch (error) {
      return { success: false, message: "An error occurred while signing in", error: error };
    }
  };