'use client'
import Menu from '../organisms/Menu'
import NavigationBar from '../organisms/NavigationBar'
import useWorkspaceState from '../../hooks/SideBarAndNavbarHook'
export default function WorkspaceTemplate({ children }) {
  const {
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
  } = useWorkspaceState();

  return (
    <main>
      <div onClick={(e) => handleClickOutside(e)}>
        <div className="dashboard-outer-wrap">
          <div className={(sidebarMobile) ? "dashboard-inner-wrap transition-02 expanded" : (sidebarDesktop) ? "dashboard-inner-wrap transition-02 toggled" : "dashboard-inner-wrap transition-02"} id="dashboard-inner-wrap">
            <Menu handleSidebarToggle={handleSidebarToggle} isActive={isActive} sidebarMobile={sidebarMobile} sidebarRef={sidebarRef} />
            <div className="content-outer-wrap" >
              <NavigationBar
                SetToggleSearch={setToggleSearch}
                ToggleSearch={ToggleSearch}
                handlesidebarMobile={handleSidebarMobile}
                searchRef={searchRef}
                mobiletoggleRef={mobiletoggleRef}
                notifyRef={notifyRef}
                profileRef={profileRef}
                notify={notify}
                setNotify={setNotify}
                profile={profile}
                setProfile={setProfile}
              />

              <div className={(ToggleSearch || sidebarMobile) ? "content-wrap overlay" : "content-wrap"} id="content-wrap">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}