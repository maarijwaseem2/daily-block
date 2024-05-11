import RegistrationForm from '../../../components/organisms/RegistrationForm'
import Link from 'next/link'
export default function Signup() {
    return (
        <div className="right-side">
            <div className="action-link">

                <p>Already have an account? <Link href='/login'>Sign In</Link></p>
            </div>
            <div className="register-inner register">

                <div className="register-form-text">
                    <h2>Register Yourself</h2>
                    <p>Please enter the following information in order to register yourself</p>
                </div>

                <RegistrationForm />
                <div className="action-link mob-view">
                    <p>Already have an account? <Link href='/login'>Sign In</Link></p>
                </div>
            </div>
        </div>
    )
}