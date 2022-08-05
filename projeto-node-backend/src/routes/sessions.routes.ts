import { Router } from 'express';
import AuthUserService from '../services/AuthUserService';


const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
	const { email, password } = request.body;

	const authUserService = new AuthUserService();

	const { user, token } = await authUserService.execute({ email, password });

	delete user.password;

	return response.json({ user, token });
});

// @ts-ignore
export default sessionsRouter;
