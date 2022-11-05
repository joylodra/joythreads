import React from 'react';
import { BiSearch } from 'react-icons/bi';
import { TwitterTimelineEmbed } from 'react-twitter-embed'

const Widgets = () => {
    return (
        <div className="col-span-3 p-3 mt-2 hidden lg:block">
            <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-full">
                <BiSearch className="text-xl text-gray-300" />
                <input
                    className="bg-transparent flex-1 outline-none"
                    type="text"
                    placeholder="Search threads..."
                />
            </div>

            <TwitterTimelineEmbed
                sourceType="profile"
                screenName="sonnysangha"
                options={{ height: 1000 }}
                noBorders={true}
            />
        </div>
    )
}

export default Widgets;