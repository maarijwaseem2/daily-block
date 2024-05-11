import Link from 'next/link'
import Image from 'next/image'

export default function Menu({ handleSidebarToggle, isActive, sidebarMobile, sidebarRef }) {


    return (
        <div ref={sidebarRef} className="sidebar-wrap" id="sidebar-wrap" style={sidebarMobile ? { left: "0px" } : { left: "-100%" }}>
            <div className="sidebar-top">
                <div className="sidebar-toggle-wrap">
                    <div className="brand-logo">
                        <Link href=""><Image src={'/logo-min.svg'} alt={''} style={{ layout: '' }} priority={false} height="30" width="30"></Image></Link>
                    </div>
                    <div className="sidebar-toggle">
                        <Image src={'/menu-toggle.svg'} alt={"sidebar toggle button"} className="toggle-btn-desktop" style={{ layout: '' }} priority={false} onClick={handleSidebarToggle} height="30" width="30" />
                        <Image src={'/toggle-btn-mobile.svg'} alt={"sidebar toggle button"} className="toggle-btn-mobile" style={{ layout: '' }} priority={false} height="20" width="20" />
                    </div>
                </div>
                <div className="sidebar-links">
                    <ul>
                        <li ><Link href="/dashboard" className={isActive('/dashboard') ? "active" : "noActive"}><Image src={'/monitor.svg'} alt={""} style={{ layout: '', width: '35px', height: '35px' }} priority={false} height="20" width="20" /><span className="menu-sidebar" >Dashboard</span></Link></li>
                        <li><Link href="/projects" className={isActive('/projects') || isActive('/addproject') ? "active" : "noActive"}><Image src={'/projects.svg'} alt={""} style={{ width: '35px', height: '35px' }} priority={false} height="20" width="20" /><span className="menu-sidebar">Project Management</span></Link></li>
                    </ul>
                </div>
            </div>
            <div className="sidebar-bottom">
                <div className="sidebar-links">
                    <ul>
                        <li><Link href="/settings" className={isActive('/settings') ? "active" : "noActive"}><Image src={'/setting.svg'} alt={""} style={{ width: '35px', height: '35px', paddingBottom: '5px' }} priority={false} height="20" width="20" /><span className="menu-sidebar">Settings</span></Link></li>
                    </ul>
                </div>
            </div>
        </div >

    )
}