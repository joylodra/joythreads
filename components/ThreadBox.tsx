import React, { useState, useRef, SetStateAction, Dispatch } from 'react';
import { threadBoxIcons } from '../utils/constants';
import { useSession } from 'next-auth/react';
import { AiOutlineCamera } from 'react-icons/ai';
import { Thread, ThreadBody } from '../typings';
import { fetchThreads } from '../utils/fetch';
import toast from 'react-hot-toast';

interface Props {
    setThreads: Dispatch<SetStateAction<Thread[]>>
};

const ThreadBox = ({ setThreads }: Props) => {
    const [input, setInput] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false);

    const imageInputRef = useRef<HTMLInputElement>(null);

    const { data: session } = useSession();

    const addImageToThread = (
        e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
    ) => {
        e.preventDefault();

        if (!imageInputRef.current?.value) return;

        setImage(imageInputRef.current.value);
        imageInputRef.current.value = '';
        setImageUrlBoxIsOpen(false);
    };

    const postThread = async () => {
        const threadInfo: ThreadBody = {
            text: input,
            username: session?.user?.name || 'Unknown',
            profileImg: session?.user?.image || 'https://links.papareact.com/gll',
            image: image,
        };

        const result = await fetch(`/api/addThreads`, {
            body: JSON.stringify(threadInfo),
            method: 'POST'
        });

        const json = await result.json();

        const newThreads = await fetchThreads();
        setThreads(newThreads);

        toast("Tweet Posted", {
            icon: '🚀'
        });
    };

    const handleSubmit = (
        e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
    ) => {
        e.preventDefault();

        postThread();

        setInput('');
        setImage('');
        setImageUrlBoxIsOpen(false);
    };

    return (
        <div className="flex gap-3 border-b px-3 pb-5">
            <img
                className="h-14 w-14 rounded-full object-cover"
                src={session?.user?.image || 'https://links.papareact.com/gll'}
                alt="Profile Picture"
            />

            <div className="flex-1">
                <form>
                    <input
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                        type="text"
                        placeholder="What's happening?"
                        className="h-14 w-full outline-none text-xl"
                    />
                    <div className="flex items-center justify-between">
                        <div className="flex gap-2 text-primary">
                            <AiOutlineCamera
                                onClick={() => setImageUrlBoxIsOpen((prev) => !prev)}
                                className="text-xl cursor-pointer
                                transition-transform duration-200 ease-out 
                                hover:scale-125"
                            />

                            {threadBoxIcons.map((item) => (
                                <div key={item.menu}>{item.icon}</div>
                            ))}
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={!input}
                            className="bg-primary px-5 py-2 font-bold text-white 
                            rounded-full hover:opacity-90 disabled:opacity-40"
                        >
                            Send
                        </button>
                    </div>

                    {imageUrlBoxIsOpen && (
                        <form className="mt-5 py-2 px-4 rounded-lg flex bg-primary/80
                        transition-all">
                            <input
                                ref={imageInputRef}
                                className="flex-1 bg-transparent p-2 text-white
                                outline-none placeholder:text-white"
                                type="text"
                                placeholder="Enter image url..."
                            />
                            <button
                                type='submit'
                                onClick={addImageToThread}
                                className="font-bold text-white text-center"
                            >
                                ADD
                            </button>
                        </form>
                    )}

                    {image && (
                        <>
                            <img
                                src={image}
                                className="mt-10 h-40 w-full rounded-xl object-contain
                            shadow-lg transition-all"
                                alt="Posted Image"
                            />
                            <button
                                className="w-full px-5 py-2 bg-transparent border-2
                                border-red-500 rounded-full font-bold text-center
                                text-red-500 mt-5 hover:bg-red-500 hover:text-white"
                                onClick={() => setImage('')}
                            >
                                CANCEL
                            </button>
                        </>
                    )}
                </form>
            </div>
        </div>
    )
}

export default ThreadBox;