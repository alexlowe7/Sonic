import React, { useState } from 'react';
import { Formik, Field, Form, useField, useFormikContext } from 'formik';
import { Alert, Button, Stack, TextField } from '@mui/material';
import { SignUpSchema } from '../Helpers/Validation';
import { useNavigate } from 'react-router-dom';


const SignUpForm = () => {

    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const navigate = useNavigate();

    const initialValues = {
        username: '',
        email: '',
        password: '',
        confirmation: '',
    }

    const signUpUser = async (values, { setSubmitting }) => {
        setErrorMessage('')
        const data = {
            username: values.username,
            email: values.email,
            password: values.password,
            confirmation: values.confirmation,
        };
        
        try {
            const response = await fetch("http://localhost:8000/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
                setErrorMessage(result.message);
                setSubmitting(false)
                return
            }
            setSuccessMessage('Sign Up successful!')
            setTimeout(() => {
                setSubmitting(false);
                navigate('/')
            }, 1000)
        } catch (error) {
            console.log('error caught')
            setErrorMessage('Server Error. Please try again later.');
        }
    }

    return(
        <Formik
            onSubmit={signUpUser}
            initialValues={initialValues}
            // validationSchema={SignUpSchema}
        >   
            {({ errors, touched, values, isSubmitting }) => (
                <Form className='register-form-container'>
                    <Stack spacing={2}>
                        <h2 className='text-center mt-2 mb-0'>Sign Up</h2>
                        <h6>*All Fields Required</h6>
                        {errorMessage !== '' &&
                        <Alert severity="error">{errorMessage}</Alert>
                        }
                        {successMessage !== '' &&
                        <Alert>{successMessage}</Alert>
                        }
                        <Field
                            as={TextField}
                            name='username'
                            label='Username'
                            margin='none'
                            variant='outlined'
                            error={!!errors.username && touched.username}
                            helperText={!!errors.username && touched.username && errors.username}
                        />
                        <Field
                            as={TextField}
                            name='email'
                            label='Email'
                            margin='none'
                            variant='outlined'
                            error={!!errors.email && touched.email}
                            helperText={!!errors.email && touched.email && errors.email}
                        />
                        <Field
                            as={TextField}
                            name='password'
                            label='Password'
                            variant='outlined'
                            margin='none'
                            type='password'
                            error={!!errors.password && touched.password}
                            helperText={!!errors.password && touched.password && errors.password}
                        />
                        <Field
                            as={TextField}
                            name='confirmation'
                            label='Confirm Password'
                            margin='none'
                            variant='outlined'
                            type='password'
                            error={!!errors.confirmation && touched.confirmation}
                            helperText={
                                !!errors.confirmation && 
                                touched.confirmation && 
                                ((values.password !== values.confirmation) 
                                    ? "Passwords must match" 
                                    : errors.confirmation)
                            }
                        />
                        <Button 
                            type="submit"
                            variant="contained"
                            className='signup-button'
                            disabled={isSubmitting}
                            sx={{
                                fontSize: 16,
                                fontWeight: 550,
                            }}
                        >
                            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                        </Button>
                    </Stack>
                </Form>
            )}
        </Formik>        
    )




};

export default SignUpForm