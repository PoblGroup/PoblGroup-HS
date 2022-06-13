import { useMsal } from '@azure/msal-react'
import { loginRequest } from '../../config/authConfig.js'

const handleLogin = (instance) => {
    instance.loginPopup(loginRequest).catch(e => {
        console.error(e)
    })
}

const SignIn = () => {
    const { instance } = useMsal()
    
    return (
        <button className='btn' onClick={() => handleLogin(instance)}>
            Sign In
        </button>
    )
}

export default SignIn