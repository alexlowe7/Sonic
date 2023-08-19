export async function handleLoginResponse (
    apiResponse, setErrorMessage, setSubmitting, 
    setUser, setSuccessMessage, navigate
) {
    console.log("handling login response")
    const result = await apiResponse.json()

    if (!apiResponse.ok) {
        setErrorMessage(result.message);
        setSubmitting(false)
        return
    }
    
    setUser(result.user)
    setSuccessMessage('Login Successful.')
    setTimeout(() => {
        navigate('/dashboard')
    }, 500)         
}