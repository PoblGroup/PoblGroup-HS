import { useMsal } from '@azure/msal-react'
import { loginRequest } from '../../config/authConfig.js'

const handleLogin = (instance) => {
    instance.loginRedirect(loginRequest).catch(e => {
        console.error(e)
    })
}

const SignIn = () => {
    const { instance } = useMsal()
    
    return (
        <button className='btn btn-yellow' onClick={() => handleLogin(instance)}>
            Sign In
        </button>
    )
}

export default SignIn