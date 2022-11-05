import { Comment, Thread } from "../typings";

export const fetchThreads = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/threads`);

    const data = await res.json();
    const threads: Thread[] = data.threads;

    return threads;
};

export const fetchComments = async (threadId: string) => {
    const res = await fetch(`/api/comments?threadId=${threadId}`);

    const data = await res.json()
    const comments: Comment[] = data.comments;

    return comments;
};