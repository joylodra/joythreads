import type { NextApiRequest, NextApiResponse } from 'next';
import { sanityClient } from '../../sanity';
import { Comment } from '../../typings';
import { groq } from 'next-sanity';

const commentQuery = groq`
    *[_type == "comment" && references(*[_type=="thread" && _id==$threadId]._id)] {
        _id,
        ...
    } | order(_createdAt desc)
`;

interface Data {
    comments: Comment[]
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { threadId } = req.query;

    const comments: Comment[] = await sanityClient.fetch(commentQuery, {
        threadId,
    });

    res.status(200).json({ comments });
};