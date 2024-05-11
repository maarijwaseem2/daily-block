import Link from 'next/link'
import CreatePasswordForm from '../organisms/CreatePasswordForm'
export default function ChangePasswordActionPanel() {
    return (
        <div className="right-side">

            <div className="action-link">
                <p>
                    <Link href='/login'>Sign In</Link> |
                    <Link href='/signup' className="signup"> Sign Up</Link>
                </p>
            </div>

            <div className="register-inner">


                <div className="register-form-text">
                    <h2>New Password</h2>
                    <p>Please enter your new password.</p>
                </div>
                <CreatePasswordForm />

                <div className="action-link mob-view">
                    <Link href='/login'>Sign In</Link> |
                    <Link href='/signup' className="signup"> Sign Up</Link>
                </div>

            </div>

        </div>
    )
}