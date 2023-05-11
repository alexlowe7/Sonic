import * as Yup from "yup"

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

export const SignUpSchema = Yup.object().shape({
    username: Yup.string().min(1).max(25).required("Username required"),
    email: Yup.string().min(1).max(25).matches(emailRegex, "Invalid Email").required("Email required"),
    password: Yup.string().min(8, 'Password must be at least 8 characters')
        .max(128, 'Password must not exceed 128 characters').required("Password required"),
    confirmation: Yup.string().min(8, 'Password must be at least 8 characters')
        .max(128, 'Password must not exceed 128 characters').required("Confirm Password required")
});

export const LoginSchema = Yup.object().shape({
    email: Yup.string().required("Email required"),
    password: Yup.string().required("Password required"),
});