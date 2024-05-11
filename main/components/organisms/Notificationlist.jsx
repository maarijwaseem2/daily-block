import Image from 'next/image'
import Link from 'next/link'
export default function NotificationList({ Notifications }) {
    return (
        <>
            {Notifications.map((item, index) => (
                <Link href="" className={(item.isRead) ? "notify-single card-bg" : "notify-single unread card-bg"}>
                    <div className="notify-single-info">
                        <div className="notify-single-img">
                            <Image src={"/notify-icon.svg"} alt={""} style={{ layout: '' }} priority={false} height="40" width="40"></Image>
                        </div>
                        <div className="notify-single-text">
                            <p>Redeem your points for gift cards and discounts now!"</p>
                        </div>
                    </div>
                    <div className="notify-single-time">
                        <span>Just Now</span>
                    </div>
                </Link>
            ))}

        </>
    )
}