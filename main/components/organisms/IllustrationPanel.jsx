import logoWhite from '../../public/logo-white.svg';
import Image from 'next/image'


export default function ViewPanel({ image }) {
  return (
    <div className="left-side">
      <div className="register-content">
            <div className="logo">
                <Image src={logoWhite} alt={''} className={"img-fluid"} style={{ layout: '' }} priority={false}></Image>
            </div>
            <div className="register-text">
                <h1>Start your journey<br /> with us.</h1>
                <p>Lorem ipsum dolor sit amet consectetur. Pellentesque quis urna proin urna faucibus ut erat bibendum.</p>
            </div>
            <div className="register-img">
                <Image src={image} alt={'laptop illustration'} className={"img-fluid"} style={{ layout: 'responsive' }} priority={false}></Image>
            </div>

        </div>
    </div>
  )
}