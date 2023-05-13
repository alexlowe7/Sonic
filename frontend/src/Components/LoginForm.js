import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { Alert, Button, Stack, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAuth from '../Authorization/useAuth';


const LoginForm = () => {

    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const navigate = useNavigate();
    const { user, setUser } = useAuth();

    const initialValues = {
        email: '',
        password: '',
    }

    const loginUser = async (values, { setSubmitting }) => {
        setErrorMessage('')
        const data = {
            email: values.email,
            password: values.password,
        };
        
        try {
            const response = await fetch('http://localhost:8000/login/', {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                setErrorMessage(result.message);
                setSubmitting(false)
                return
            }

            console.log(result)
            setSuccessMessage('Login Successful.')
            setTimeout(() => {
                setUser(result.user)
                navigate('/')
            }, 500)
            
        } catch (error) {
            setErrorMessage('Server Error. Please try again later.');
        }
    }

    return(
        <Formik
            onSubmit={loginUser}
            initialValues={initialValues}
        >   
            {({ isSubmitting }) => (
                <Form className='register-form-container'>
                    <Stack spacing={2}>

                        <h2 className='text-center mt-2 mb-0'>Login</h2>

                        <h6>*All Fields Required</h6>

                        {errorMessage !== '' &&
                        <Alert severity="error">{errorMessage}</Alert>
                        }

                        {successMessage !== '' &&
                        <Alert>{successMessage}</Alert>
                        }
                        
                        <Field
                            as={TextField}
                            name='email'
                            label='Email'
                            margin='none'
                            variant='outlined'
                        />
                        <Field
                            as={TextField}
                            name='password'
                            label='Password'
                            variant='outlined'
                            margin='none'
                            type='password'
                        />
                        <Button 
                            type="submit"
                            variant="contained"
                            className='login-button'
                            disabled={isSubmitting}
                            sx={{
                                fontSize: 16,
                                fontWeight: 550,
                            }}
                        >
                            {isSubmitting ? 'Logging in...' : 'Login'}
                        </Button>
                    </Stack>
                </Form>
            )}
        </Formik>        
    )




};

export default LoginForm