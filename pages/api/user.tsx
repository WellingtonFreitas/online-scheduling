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
    barberman: boolean;
    address: string;
    services: string[];
    schedule: Record<string, number[]>;
    reviews: Record<string, unknown>[];
    appointments: Record<string, unknown>[];
}

export default async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> => {
    if (req.method === 'POST') {
        const { name, email, cellphone, barberman, address, services, schedule, appointments } = req.body;

        if (barberman) {
            if (!name || !email || !cellphone || !barberman || !address || !services || !schedule) {
                res.status(400).json({ error: 'Missing body parameter' });
                return
            }
            
            try {
            const { db } = await connect();
            const response = await db.collection('users').insertOne({
                name, email, cellphone, barberman, address, services, schedule, appointments,
            })
                res.status(201).json(response.ops[0]);
            } catch (err) {
                res.status(400).json({ error: 'User create error - ' + err });
            }
        }
        else {
            if (!name || !email || !cellphone) {
                res.status(400).json({ error: 'Missing body parameter' });
                return
            }
            try {
                const { db } = await connect();
                const response = await db.collection('users').insertOne({
                    name, email, cellphone, appointments,
                })
                res.status(201).json(response.ops[0]);
            } catch (err) {
                res.status(400).json({ error: 'User create error - ' + err });
            }
        }
    } else if (req.method === 'GET') {

        const { name } = req.body;
        console.log('chegou no req bofy')
        const { db } = await connect();

        if (!name) {
            console.log('chegou aqui')
            const users = db.collection('users').find({ 'name': name });
            res.status(201).json(users);
        } else {
            const users = db.collection('users').find();
            res.status(201).json(users);
        }

    }


    else {
        res.status(400).json({ error: 'Wrong request method' });
    }

};
