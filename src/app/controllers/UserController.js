import User from '../models/User';

class UserController {
	async store(req, res) {
		const emailExists = await User.findOne({ where: { email: req.body.email } });
		const userExists = await User.findOne({ where: { name: req.body.name } });

		if (userExists || emailExists) {
			return res.status(400).json({ error: 'User or Email already exists' });
		}
		const user = await User.create(req.body);

		return res.json(user);
	}
}

export default new UserController();
