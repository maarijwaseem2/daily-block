import WorkspaceTemplate from '@/components/templates/WorkspaceTemplate'
import Notificationlist from '../../components/organisms/Notificationlist'
export default function Notification() {

    const Notifications = [{ isRead: false }, { isRead: false }, { isRead: true }]
    let notificationUnread = 0;
    Notifications.forEach((item, index) => { if (item.isRead === false) { notificationUnread = notificationUnread + 1 } })
    return (
        <WorkspaceTemplate>
            <div className="content-head">
                <h1>Notifications</h1>
                <p>You have <span>{notificationUnread}</span> unread notifications</p>
            </div>
            <div className="content-body">
                <div className="notify-details-list">
                    <Notificationlist Notifications={Notifications} />
                </div>
            </div>
        </WorkspaceTemplate>
    )
}