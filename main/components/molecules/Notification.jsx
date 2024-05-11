import Link from 'next/link'
import NotifyIcon from '../../public/notify-icon.svg'
import Image from 'next/image'
export default function Notification({classname}) {
    return (
        <Link href="" className={classname}>
            <div className="notify-icon">
                <Image src={NotifyIcon} alt={''} style={{ layout: '' }} priority={false}></Image>
            </div>
            <div className="notify-text">
                <p>Redeem your points for gift cards and discounts now!"</p>
                <span>Just Now</span>
            </div>
        </Link>
    )
}