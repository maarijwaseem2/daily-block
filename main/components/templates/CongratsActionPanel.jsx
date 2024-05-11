import Image from 'next/image'
import congratsImage from '../../Images/congrats-img.svg'
import redirectImage from '../../Images/snake.gif'
export default function CongratsActionPanel() {
    return (
        <div className="right-side">
            <div className="register-inner congrats">
                
                <div className="register-form-text">
                    <h2>Congratulations</h2>
                    <p>Your password was changed successfully.</p>
                </div>
                <div className="congrats-img">
                    <Image src={congratsImage} alt={''} className={""} style={{ layout: '' }} priority={false}></Image>
                </div>
            </div>
            <div className="redirecting-msg">
                <p>Redirecting to homepage 
                    <Image src={redirectImage} alt={''} className={"img-fluid"} style={{ layout: '' }} priority={false}></Image>
                </p>
            </div>
        </div>
    )
}