import ForgetPasswordForm from '../../../components/organisms/ForgetPasswordForm'
import Link from 'next/link'
export default function Forgetpassword() {
    return (
        <div className="right-side">
            <div className="action-link">
                <p>Already have an account? <Link href='/login'>Sign In</Link></p>
            </div>

            <div className="register-inner">

                <div className="register-form-text">
                    <h2>Forget Password</h2>
                    <p>Don’t worry we got your back. Please enter the registered email here</p>
                </div>

                <ForgetPasswordForm />

                <div className="form-info-bar">
                    <p>Please wait for 30s in order to send it again</p>
                </div>

                <div className="action-link mob-view">
                    <p>Already have an account? <Link href='/login'>Sign In</Link></p>
                </div>

            </div>
        </div >
    )
}