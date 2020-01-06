import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import AuthConfig from '../../config/auth';
import User from '../models/User';

class SessionController {
	async store(req, res) {
		const { email, password } = req.body;

		const user = await User.findOne({ where: { email } });

		const schema = Yup.object().shape({
			name: Yup.string().required(),
			email: Yup.string().email().required(),
			password: Yup.string().min(6).required(),
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Verification failed' });
		}

		if (!user) {
			return res.status(401).json({ msg: 'User not found' });
		}

		if (!(await user.checkPassword(password))) {
			return res.status(401).json({ msg: 'Password does not match' });
		}

		const { id, name } = user;

		return res.json({
			user: {
				id,
				name,
				email,
			},
			token: jwt.sign(
				{ id },
				AuthConfig.secret,
				{ expiresIn: AuthConfig.expiresIn },
			),
		});
	}
}

export default new SessionController();
