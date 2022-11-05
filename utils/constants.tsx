import {
    AiOutlineHome,
    AiOutlineMail,
    AiOutlineSearch,
    AiOutlineCalendar,
    AiOutlineRetweet,
    AiOutlineHeart,
    AiOutlineDownload
} from 'react-icons/ai';
import { HiOutlineHashtag, HiOutlineEmojiHappy } from 'react-icons/hi';
import { MdNotificationsNone } from 'react-icons/md';
import { BsBookmark, BsFolder } from 'react-icons/bs';
import { GoLocation } from 'react-icons/go';
import { FaRegComment } from 'react-icons/fa';

export const sideBarMenu = [
    {
        menu: "Home",
        icon: AiOutlineHome
    },
    {
        menu: "Explore",
        icon: HiOutlineHashtag
    },
    {
        menu: "Notifications",
        icon: MdNotificationsNone
    },
    {
        menu: "Messages",
        icon: AiOutlineMail
    },
    {
        menu: "Bookmarks",
        icon: BsBookmark
    },
    {
        menu: "Lists",
        icon: BsFolder
    },
];

export const threadBoxIcons = [
    {
        menu: "Search",
        icon: <AiOutlineSearch className="text-xl cursor-pointer
        transition-transform duration-200 ease-out hover:scale-125" />
    },
    {
        menu: "Calendar",
        icon: <AiOutlineCalendar className="text-xl cursor-pointer
        transition-transform duration-200 ease-out hover:scale-125" />
    },
    {
        menu: "Emoji",
        icon: <HiOutlineEmojiHappy className="text-xl cursor-pointer
        transition-transform duration-200 ease-out hover:scale-125" />
    },
    {
        menu: "Location",
        icon: <GoLocation className="text-xl cursor-pointer
        transition-transform duration-200 ease-out hover:scale-125" />
    }
];

export const threadButtons = [
    {
        menu: "Retweet",
        icon: <AiOutlineRetweet className="text-xl cursor-pointer
        transition-transform duration-200 ease-out hover:scale-125" />
    },
    {
        menu: "Like",
        icon: <AiOutlineHeart className="text-xl cursor-pointer
        transition-transform duration-200 ease-out hover:scale-125" />
    },
    {
        menu: "Download",
        icon: <AiOutlineDownload className="text-xl cursor-pointer
        transition-transform duration-200 ease-out hover:scale-125" />
    },
];
