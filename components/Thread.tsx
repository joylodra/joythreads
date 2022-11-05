import React, { useEffect, useState } from 'react';
import { Comment, CommentBody, Thread } from '../typings';
import { GrMore } from 'react-icons/gr';
import { threadButtons } from '../utils/constants';
import TimeAgo from 'timeago-react';
import { FaRegComment } from 'react-icons/fa';
import { fetchComments } from '../utils/fetch';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

interface Props {
    thread: Thread
};

const ThreadComponent = ({ thread }: Props) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [input, setInput] = useState<string>("");
    const [showCommentBox, setShowCommentBox] = useState<boolean>(false);

    const { data: session } = useSession();

    const refreshComments = async () => {
        const comments: Comment[] = await fetchComments(thread._id);
        setComments(comments);
    };

    useEffect(() => {
        refreshComments();
    }, []);

    const handleSubmit = async (
        e: React.MouseEvent<HTMLFormElement>
    ) => {
        e.preventDefault()

        const commentToast = toast.loading('Posting Comment...')

        // Comment logic
        const comment: CommentBody = {
            comment: input,
            threadId: thread._id,
            username: session?.user?.name || 'Unknown',
            profileImg: session?.user?.image || 'https://links.papareact.com/gll',
        }

        const result = await fetch(`/api/addComment`, {
            body: JSON.stringify(comment),
            method: 'POST',
        });

        toast.success('Comment Posted!', {
            id: commentToast,
        });

        setInput('')
        setShowCommentBox(false)
        refreshComments()
    };

    return (
        <div>
            <div className="flex gap-2 p-5">
                <img
                    className="h-10 w-10 rounded-full"
                    src={thread.profileImg}
                    alt="Profile Picture"
                />

                <div className="flex-1 flex flex-col">
                    <div className="flex items-center justify-between">
                        <div className="flex gap-1 items-center">
                            <p className="font-bold">{thread.username}</p>
                            <p className="hidden text-sm text-gray-500 md:block">
                                @{thread.username.replace(/\s+/g, '').toLowerCase()}
                            </p>
                            <p className="text-sm text-gray-500"> · </p>
                            <TimeAgo
                                className="text-sm text-gray-500"
                                datetime={thread._createdAt}
                            />
                        </div>

                        <GrMore />
                    </div>

                    <p>{thread.text}</p>

                    {thread.image && (
                        <img
                            className="max-h-60 object-cover mt-5 rounded-lg 
                        bg-black shadow-sm cursor-pointer"
                            src={thread.image}
                            alt={thread.text}
                        />
                    )}

                    <div className="flex justify-between py-4 text-gray-400">
                        <div
                            className="flex items-center gap-2 text-sm"
                            onClick={() => session && setShowCommentBox((prev) => !prev)}
                        >
                            <FaRegComment
                                className="text-xl cursor-pointer
                                transition-transform duration-200 ease-out 
                                hover:scale-125"
                            />

                            <p>{comments.length}</p>
                        </div>

                        {threadButtons.map((button) => (
                            <div key={button.menu}>{button.icon}</div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="border-t" />

            {showCommentBox && (
                <div className="p-4 max-h-44 overflow-y-scroll">
                    <form onSubmit={handleSubmit} className="mt-3 flex gap-3 mb-3">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-1 rounded-lg bg-gray-100 p-2
                                outline-none"
                            type="text"
                            placeholder="Write a comment..."
                        />
                        <button
                            disabled={!input}
                            type="submit"
                            className="text-primary disabled:text-gray-200"
                        >
                            POST
                        </button>
                    </form>

                    {comments?.length > 0 && comments.map((comment) => (
                        <div
                            className="relative flex gap-2 p-2"
                            key={comment._id}
                        >

                            {comments[comments.length - 1].comment === comment.comment
                                ? (<></>)
                                : (<hr className="absolute left-5 top-9 h-full border-x" />)
                            }

                            <img
                                className="h-7 w-7 rounded-full object-cover"
                                src={comment.profileImg}
                                alt="Profile Picture"
                            />

                            <div>
                                <div className="flex items-center gap-1">
                                    <p className="font-bold">{comment.username}</p>
                                    <p className="text-sm text-gray-500"> · </p>
                                    <p className="hidden text-sm text-gray-500 md:block">
                                        @{comment.username.replace(/\s+/g, '').toLowerCase()}
                                    </p>
                                    <TimeAgo
                                        className="text-sm text-gray-500"
                                        datetime={comment._createdAt}
                                    />
                                </div>

                                <p>{comment.comment}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="border-t" />
        </div>
    )
}

export default ThreadComponent;