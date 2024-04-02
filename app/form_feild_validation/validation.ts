import * as Yup from "yup";
const emailRules = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
const numberrules = /^(0|[1-9]\d*)$/;
const stringrules = /^[A-Za-z ]*$/;
const passwordrules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;


export const loginFormvalidation = Yup.object().shape({
    email: Yup.string()
      .required("Email is a required field *")
      .matches(emailRules, "Please Enter a valid email address *")
      .email("Please Enter a valid email *"),
    password:Yup.string()
    .required("Password is a required field *")
});

export const signUpFormvalidation = Yup.object().shape({
    first_name: Yup.string()
    .required("First name field is required *")
    .min(3, "First name must be at least 3 characters *")
    .matches(stringrules, "Please enter valid name *"),
    last_name: Yup.string()
    .required("Last name field is required **")
    .min(3, "Last name must be at least 3 characters *")
    .matches(stringrules, "Please enter valid name *"),
    email: Yup.string()
    .required("Email is a required field *")
    .matches(emailRules, "Please Enter a valid email address *")
    .email("Please Enter a valid email address *"),
    phone: Yup.string()
    .required("Number field is required **")
    .matches(numberrules, "Please Enter a valid number *")
    .min(10, "Number must be 10 digit *")
    .max(10, "Number must be 10 digit *"),
    password:Yup.string()
    .required("Password is a required field *")
    .matches(passwordrules, "Password must have at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character *")
});


export const CheckoutformvalidationStep = Yup.object().shape({
  
  email: Yup.string()
    .required("Email is a required field **")
    .matches(emailRules, "Please Enter a valid email **")
    .email("Please Enter a valid email **"),
  number: Yup.string()
    .required("Number field is required **")
    .matches(numberrules, "Please Enter a valid number **")
    .min(10, "Number must be 10 digit **")
    .max(10, "Number must be 10 digit **"),
  city: Yup.string()
    .required("City field is required **")
    .matches(stringrules, "Please enter valid city **"),
  state: Yup.string()
    .required("State field is required **")
    .matches(stringrules, "Please enter valid state **"),
  country: Yup.string()
    .required("Country field is required **")
    .matches(stringrules, "Please enter valid Country **"),
  postalcode: Yup.string()
    .required("Postal Code field is required **")
    .matches(numberrules, "Please Enter a valid number **"),
});

// export const Userformvalidation = Yup.object().shape({
//   firstname: Yup.string()
//     .required("First name field is required **")
//     .min(3, "First name must be at least 3 characters **")
//     .matches(stringrules, "Please enter valid name **"),
//   lastname: Yup.string()
//     .required("Last name field is required **")
//     .min(3, "Last name must be at least 3 characters **")
//     .matches(stringrules, "Please enter valid name **"),
//   email: Yup.string()
//     .required("Email is a required field **")
//     .matches(emailRules, "Please Enter a valid email **")
//     .email("Please Enter a valid email **"),
//   number: Yup.string()
//     .required("Number field is required **")
//     .matches(numberrules, "Please Enter a valid number **")
//     .min(10, "Number must be 10 digit **")
//     .max(10, "Number must be 10 digit **"),
//   roleid: Yup.number().typeError("Role is Required **").
//   required("Role is Required *"),
//   subscriptionplanid: Yup.number()
//   .when('roleid', {
//     is: 1, 
//     then: Yup.number().typeError("Subscription plan is Required **")
//       .required("Subscription plan is Required **"),
//     otherwise: Yup.number().notRequired(),
//   }),
// });




export const UserProfileformvalidation = Yup.object().shape({
  firstname: Yup.string()
    .required("First name field is required **")
    .min(3, "First name must be at least 3 characters **")
    .matches(stringrules, "Please enter valid name **"),
  lastname: Yup.string()
    .required("Last name field is required **")
    .min(3, "Last name must be at least 3 characters **")
    .matches(stringrules, "Please enter valid name **"),
  email: Yup.string()
    .required("Email is a required field **")
    .matches(emailRules, "Please Enter a valid email **")
    .email("Please Enter a valid email **"),
  number: Yup.string()
    .required("Number field is required **")
    .matches(numberrules, "Please Enter a valid number **")
    .min(10, "Number must be 10 digit **")
    .max(10, "Number must be 10 digit **"),
});


export const ProductWithBookformvalidation = Yup.object().shape({
  title: Yup.string()
    .required("Field is required **")
    .min(3, "Field must be at least 3 characters **")
    .matches(stringrules, "Please enter valid name **"),
  price: Yup.string()
    .required("Field is required **")
    .matches(numberrules, "Please Enter a valid price **")
});


export const Roleformvalidation = Yup.object().shape({
  name: Yup.string()
    .required("Field is required **")
    .min(3, "Field must be at least 3 characters **")
    .matches(stringrules, "Please enter valid name **"),
});