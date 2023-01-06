import React from "react";
import {
    BellIcon,
    HashtagIcon,
    BookmarkIcon,
    RectangleStackIcon,
    EllipsisHorizontalCircleIcon,
    EnvelopeIcon,
    UserIcon,
    HomeIcon
} from '@heroicons/react/24/outline'
import SidebarRow from "./SidebarRow";
import { signIn, signOut, useSession } from "next-auth/react";

function Sidebar() {
    const {data: session} = useSession()

    return (
        <div className="flex flex-col col-span-2 items-center px-4 md:items-start">
            <img className="m-3 h-10 w-10" src="https://links.papareact.com/drq" alt="" />        
            <SidebarRow Icon={HomeIcon} title="Home" />
            <SidebarRow Icon={HashtagIcon} title="Explorer" />
            <SidebarRow Icon={BellIcon} title="Notifications" />
            <SidebarRow Icon={EnvelopeIcon} title="Messages" />
            <SidebarRow Icon={BookmarkIcon} title="Bookmarks" />
            <SidebarRow Icon={RectangleStackIcon} title="Lists" />            
            <SidebarRow Icon={UserIcon} 
                onClick={session ? signOut : signIn}
                title={session ? 'Sign out' : 'Sign In'} />
            <SidebarRow Icon={EllipsisHorizontalCircleIcon} title="More" />            
        </div>
    )
}

export default Sidebar