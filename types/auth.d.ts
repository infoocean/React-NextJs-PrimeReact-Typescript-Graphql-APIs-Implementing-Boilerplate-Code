export interface LoginFormValues {
    email: string;
    password: string;
}

interface SignUpFormValues {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    password: string;
    role_id?: number;
}

interface verifyOtpFormValues {
    email: string | null;
    otp:number;
}

interface resetpasswordFormValues {
    password: string; 
    confirmpassword?:string;
    reset_password_token?: string | null;
}

interface OtpData {
    digit1: string;
    digit2: string;
    digit3: string;
    digit4: string;
}

interface VerificationField {
    label: string;
    type: string;
    name: string;
    maxLength?: number;
}

interface VerificationFormProps {
    onCancel: (data: any) => void;
    buttonText: string;
    onSubmit: (data: any) => void;
    fields: VerificationField[];
}