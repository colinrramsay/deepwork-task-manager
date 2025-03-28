import Header from "./Header"
import Button from "./Button"

const Login = () => {
    return (
        <div className="container">
            <div className="login">
                <h2>Login</h2>
                <a href="http://localhost:2121/auth/google" className='btn' style={{backgroundColor: '#4285F4'}} >
                    <i className="fab fa-google left" /> Sign In With Google
                </a>
            </div>

        </div>
    )
}

export default Login