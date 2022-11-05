import React from 'react';
import { VscSignOut } from 'react-icons/vsc';
import { GrMore } from 'react-icons/gr';
import { BiUser } from 'react-icons/bi';
import SidebarRow from './SidebarRow';
import { sideBarMenu } from '../utils/constants';
import { RiMessage3Fill } from 'react-icons/ri';
import { useSession, signIn, signOut } from 'next-auth/react';

const Sidebar = () => {
    const { data: session } = useSession();

    return (
        <div className="overflow-scroll max-h-screen col-span-2 
        lg:col-span-2 flex flex-col items-center scrollbar-hide 
        md:items-start p-5">
            <span className="text-primary font-bold
            mb-5 text-xl hidden items-center md:flex md:gap-1">
                joythreads <RiMessage3Fill />
            </span>

            <span className="text-primary font-bold
            mb-5 text-3xl block md:hidden">
                <RiMessage3Fill />
            </span>

            {sideBarMenu.map((menu) => (
                <SidebarRow Icon={menu.icon} title={menu.menu} key={menu.menu} />
            ))}

            {session
                ? <SidebarRow onClick={signOut} Icon={VscSignOut} title={"Sign out"} />
                : <SidebarRow onClick={signIn} Icon={BiUser} title={"Sign in"} />
            }
            <SidebarRow Icon={GrMore} title={"More"} />
        </div>
    )
}

export default Sidebar;