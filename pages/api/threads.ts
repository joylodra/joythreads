import type { NextApiRequest, NextApiResponse } from 'next';
import { sanityClient } from '../../sanity';
import { Thread } from '../../typings';
import { groq } from 'next-sanity';

const feedQuery = groq`
    *[_type == "thread" && !blockThread] {
        _id,
        ...
    } | order(_createdAt desc)
`;

interface Data {
    threads: Thread[]
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const threads: Thread[] = await sanityClient.fetch(feedQuery);

    res.status(200).json({ threads });
};
