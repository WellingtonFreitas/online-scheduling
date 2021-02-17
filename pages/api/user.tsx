import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../utils/database';

interface ErrorResponseType {
    error: string;
}

interface SucessResponseType {
    _id: string;
    name: string;
    email: string
    cellphone: string;
    custommer: string;
}

export default async (
    req: NextApiRequest,
    res: NextApiResponse<ErrorResponseType | SucessResponseType>
): Promise<void> => {
    if (req.method === 'POST') {
        const { name, email, cellphone, custommer } = req.body;
        if (!name || !email || !cellphone || !custommer) {
            res.status(400).json({ error: 'Missing body parameter' });
            return;
        }

        const { db } = await connect();
        const response = await db.collection('users').insertOne({
            name, email, cellphone, custommer,
        })
        res.status(200).json(response.ops[0]);
    } else {
        res.status(400).json({ error: 'Is not post' });
    }

};
