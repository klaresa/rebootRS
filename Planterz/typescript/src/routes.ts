import { Request, Response } from 'express';
import createUser from './services/CreateUser';

export function helloWorld(request: Request, response: Response) {
    const user = createUser({
        name: 'Ana',
        email: "ana@ana.com",
        password: '123',
        techs: ["JS", "Node.js",
            { title: "JavaScript", experience: 100 },
            {  }
        ],
    });

    return response.json({ message: "Hiiii world!"});
}
