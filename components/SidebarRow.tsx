import React from 'react';
import { IconType } from 'react-icons';

interface Props {
    Icon: IconType,
    title: string,
    onClick?: () => {}
};

const SidebarRow = ({ Icon, title, onClick }: Props) => {
    return (
        <div
            onClick={() => onClick?.()}
            className="flex items-center gap-2 px-4 py-3 
            rounded-full transition-all duration-200 hover:bg-gray-100
            hover:text-primary cursor-pointer max-w-fit"
        >
            <Icon className="text-2xl" />
            <span className="hidden md:block">{title}</span>
        </div>
    )
}

export default SidebarRow;