import { useState, useRef } from 'react';
import { usePathname } from 'next/navigation';

const useWorkspaceState = () => {
    const searchRef = useRef(null);
    const sidebarRef = useRef(null);
    const mobiletoggleRef = useRef(null);
    const notifyRef = useRef(null);
    const profileRef = useRef(null);
    const [ToggleSearch, setToggleSearch] = useState(false);
    const [sidebarMobile, setSidebarMobile] = useState(false);
    const [sidebarDesktop, setSidebarDesktop] = useState(false);
    const [notify, setNotify] = useState(false);
    const [profile, setProfile] = useState(false);
    const CurrentPath = usePathname();

    const isActive = (path) => {
        return CurrentPath === path;
    };

    // Desktop SideBar Handling
    const handleSidebarToggle = () => {
        if (window.innerWidth >= 991) {
            setSidebarDesktop(prevState => !prevState);
        } else {
            setSidebarMobile(false);
        }
    };

    // Mobile SideBar Handling
    const handleSidebarMobile = () => {
        setSidebarMobile(true);
    };

    // Clicking Outside Functionality
    const handleClickOutside = (e) => {
        if (!searchRef.current.contains(e.target)) {
            setToggleSearch(false);
        }
        if (!sidebarRef.current.contains(e.target) && !mobiletoggleRef.current.contains(e.target)) {
            setSidebarMobile(false);
        }
        if (!notifyRef.current.contains(e.target)) {
            setNotify(false);
        }
        if (!profileRef.current.contains(e.target)) {
            setProfile(false);
        }
    };

    return {
        searchRef,
        sidebarRef,
        mobiletoggleRef,
        notifyRef,
        profileRef,
        ToggleSearch,
        setToggleSearch,
        sidebarMobile,
        sidebarDesktop,
        isActive,
        handleSidebarToggle,
        handleSidebarMobile,
        handleClickOutside,
        notify,
        setNotify,
        profile,
        setProfile
    };
};

export default useWorkspaceState;
