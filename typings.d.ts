export interface Thread extends ThreadBody {
    _id: string,
    _createdAt: string,
    _updatedAt: string,
    _rev: string,
    _type: 'thread',
    blockThread: boolean
};

export interface ThreadBody {
    text: string,
    username: string,
    profileImg: string,
    image?: string,
};

export interface Comment extends CommentBody {
    _id: string,
    _createdAt: string,
    _updatedAt: string,
    _rev: string,
    _type: 'comment',
    thread: {
        _ref: string,
        _type: 'reference'
    }
};

export interface CommentBody {
    comment: string,
    username: string,
    profileImg: string,
    threadId: string,
};