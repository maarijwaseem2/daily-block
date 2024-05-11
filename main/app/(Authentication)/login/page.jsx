import LoginForm from '../../../components/organisms/LoginForm'
import Link from 'next/link'
export default function Login() {
    return (
        <div className="right-side">
            <div className="action-link">
                <p>Dont have an account? <Link href='/signup' as="/signup">Register</Link></p>
            </div>
            <div className="register-inner">
                <div className="register-form-text">
                    <h2>Welcome back 👋</h2>
                    <p>Sign In to access your account</p>
                </div>

                <LoginForm />

                <div className="action-link mob-view">
                    <p>Dont have an account? <Link href='/signup'>Register</Link></p>
                </div>
            </div>
        </div>

    )
}