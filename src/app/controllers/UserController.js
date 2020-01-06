import * as Yup from 'yup';
import User from '../models/User';

class UserController {
	async store(req, res) {
		const emailExists = await User.findOne({ where: { email: req.body.email } });
		const userExists = await User.findOne({ where: { name: req.body.name } });

		const schema = Yup.object().shape({
			name: Yup.string().required(),
			email: Yup.string().email().required(),
			password: Yup.string().min(6).required(),
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Verification failed' });
		}

		if (userExists || emailExists) {
			return res.status(400).json({ error: 'User or Email already exists' });
		}
		const user = await User.create(req.body);

		return res.json(user);
	}

	async update(req, res) {
		const { email, oldPassword } = req.body;

		const schema = Yup.object().shape({
			name: Yup.string(),
			email: Yup.string().email(),
			oldPassword: Yup.string().min(6),
			password: Yup.string().min(6).when('oldPassword', (oldPasswd, field) => (oldPasswd ? field.required() : field)),
			confirmPassword: Yup.string().when('password', (password, field) => (password ? field.required().oneOf([Yup.ref('password')]) : field)),
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Verification failed' });
		}

		const user = await User.findByPk(req.userId);

		if (email !== user.email) {
			const userExists = await User.findOne({ where: { email } });
			if (userExists) {
				return res.status(400).json({ error: 'Email already exists' });
			}
		}

		if (oldPassword && !(await user.checkPassword(oldPassword))) {
			return res.status(401).json({ error: 'Password does not match' });
		}

		const { id, name, provider } = await user.update(req.body);

		return res.json({
			id,
			name,
			email,
			provider,
		});
	}
}

export default new UserController();
