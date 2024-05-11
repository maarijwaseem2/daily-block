'use client'
import Link from 'next/link';
import Image from 'next/image'
import Notification from '../molecules/Notification'

export default function NavigationBar({ SetToggleSearch, ToggleSearch, handlesidebarMobile, searchRef, mobiletoggleRef, notifyRef, profileRef, notify, setNotify, profile, setProfile }) {

    //handle search
    const handleSearch = (e) => {

        if (ToggleSearch) {
            SetToggleSearch(false);
        }
        else {
            SetToggleSearch(true);
        }
    }



    //Notification Icon Handler
    const handleNotify = (e) => {

        if (notify) {
            setNotify(false)
        }
        else {
            setNotify(true)
        }
    }

    //Profile Icon Handler
    const handleProfile = (e) => {
        if (profile) {
            setProfile(false);
        }
        else {
            setProfile(true);
        }
    }






    return (
        <div className="topbar">
            <div className="top-bar-menu">
                <div ref={mobiletoggleRef} className="mobile-toggle" id="mobile-toggle" onClick={(e) => handlesidebarMobile(e)}>
                    <Image src={'/toggle-btn-mobile.svg'} alt={''} style={{ layout: '' }} priority={false} height='20' width='20' />
                </div>

                <div className={(ToggleSearch) ? "search-bar expanded" : "search-bar"} id="search-bar">
                    <input ref={searchRef} type="search" name="search" id="search" placeholder="Search here..." onClick={(e) => handleSearch(e)} />
                    <div
                        className={`search-results ${ToggleSearch ? 'show' : ''}`}
                        id="search-results"
                        style={ToggleSearch ? { display: "block" } : { maxHeight: "1000px", overflow: "hidden", transition: "max-height 0.15s ease-in-out" }}
                    >
                        <ul >
                            <li><Image src={'/search-icon.svg'} alt={''} style={{ layout: '' }} priority={false} height='20' width='20' /><Link href="">Jupiter</Link></li>
                            <li><Image src={'/search-icon.svg'} alt={''} style={{ layout: '' }} priority={false} height='20' width='20' /><Link href="">Jupiter</Link></li>
                            <li><Image src={'/search-icon.svg'} alt={''} style={{ layout: '' }} priority={false} height='20' width='20' /><Link href="">Jupiter</Link></li>
                            <li><Image src={'/search-icon.svg'} alt={''} style={{ layout: '' }} priority={false} height='20' width='20' /><Link href="">Jupiter</Link></li>
                        </ul>
                    </div>

                </div>
            </div>


            <div className="topbar-options">
                <div className="topbar-dropdowns">
                    <div className="notify-dropdown">
                        <Link ref={notifyRef} href="#" className="notify-btn dropdown-trigger" data-dropdown="dropdown-1" onClick={(e) => handleNotify(e)}>
                            <Image src={'/bell-icon.svg'} alt={''} style={{ layout: '' }} priority={false} height='25' width='25'></Image>
                            <span className="notify-count">2</span>
                        </Link>

                        <div className="notify-content dropdown-content" id="dropdown-1" style={notify ? { display: "block" } : { display: "none" }}>
                            <div className="notify-head">
                                <h3>Notifications</h3>
                                <Link href="#">Mark all as read</Link>
                            </div>
                            <div className="notify-body">
                                <div className="notify-list">
                                    <Notification classname={"notify-item unread"} />
                                    <Notification classname={"notify-item"} />
                                    <Notification classname={"notify-item"} />
                                </div>
                            </div>
                            <div className="notify-footer">
                                <Link href="/notifications">View All Notifications</Link>
                                <Link href="/notifications">View All</Link>
                            </div>
                        </div>

                    </div>
                    <span className="separator"></span>
                    <div className="profile-dropdown">
                        <Link ref={profileRef} href="#" className="profile-btn dropdown-trigger" data-dropdown="dropdown-2" onClick={(e) => handleProfile(e)}>
                            <Image src={'/profile-avatar.png'} alt={''} style={{ layout: '' }} priority={false} height='20' width='20'></Image>
                        </Link>
                        <div className="profile-content dropdown-content" id="dropdown-2" style={profile ? { display: "block" } : { display: "none" }}>
                            <ul>
                                <li><Link href="">Profile</Link></li>
                                <li><Link href="/login">Logout</Link></li>
                            </ul>
                        </div>


                    </div >
                </div >
            </div >
        </div >

    )
}
