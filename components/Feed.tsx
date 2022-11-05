import React, { useState } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';
import { Thread } from '../typings';
import ThreadBox from './ThreadBox';
import ThreadComponent from './Thread';
import { fetchThreads } from '../utils/fetch';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';

interface Props {
    threads: Thread[]
};

const Feed = ({ threads: threadsProp }: Props) => {
    const [threads, setThreads] = useState<Thread[]>(threadsProp);

    const { data: session } = useSession();

    const handleRefresh = async () => {
        const refreshToast = toast.loading('Refreshing...');

        const threads = await fetchThreads();
        setThreads(threads);

        toast.success('Feed Updated!', {
            id: refreshToast
        });
    };

    return (
        <div className="overflow-scroll max-h-screen scrollbar-hide">
            <div className="flex items-center justify-between 
            pt-5 px-5 pb-2">
                <h1 className="text-xl font-bold">Home</h1>
                <FiRefreshCcw
                    onClick={handleRefresh}
                    className="text-2xl text-primary transition-all
                    duration-500 ease-out hover:scale-105 active:rotate-180 active:scale-125
                    cursor-pointer"
                />
            </div>

            {session &&
                <div>
                    <ThreadBox setThreads={setThreads} />
                </div>
            }

            <div>
                {threads.map((thread) => (
                    <ThreadComponent thread={thread} key={thread._id} />
                ))}
            </div>
        </div>
    )
}

export default Feed;