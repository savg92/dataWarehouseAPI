const bcrypt = require('bcrypt');
const { User } = require('../models');

// const createUser = async (req, res) => {
// 	// if(req.auth.data.type === 'Admin') {
// 	const hash = bcrypt.hashSync(req.body.password, 10);
// 	try {
// 		const email = await User.findOne({ where: { email: req.body.email } });
// 		if (email) {
// 			return res
// 				.status(409)
// 				.json({ message: 'Email already exists or is in use' });
// 		} else {
// 			try {
// 				const user = await User.create({
// 					name: req.body.name,
// 					email: req.body.email,
// 					password: hash,
// 					profile: req.body.profile,
// 				});
// 				res.status(201).json({
// 					error: false,
// 					code: 201,
// 					message: 'Usuario creado',
// 					data: user,
// 				});
// 			} catch (err) {
// 				res.status(400).json({
// 					error: true,
// 					code: 400,
// 					message: 'Error creating user',
// 					data: err,
// 				});
// 			}
// 		}
// 	} catch (err) {
// 		res.status(400).json({
// 			error: true,
// 			code: 400,
// 			message: 'Error creating user',
// 			data: err,
// 		});
// 	}
// 	// } else if(req.auth.data.type === 'User') {
// 	//   res.status(401).json({
// 	//     error: true,
// 	//     code: 401,
// 	//     message: 'No autorizado para crear usuario',
// 	//   });
// 	// }
// };

const getAllUsers = async (req, res) => {
	if (req.auth.data.type === 'Admin') {
		try {
			const users = await User.findAll({
				attributes: { exclude: ['password'] },
			});
			res.status(200).json({
				error: false,
				code: 200,
				message: 'List of users',
				data: users,
			});
		} catch (err) {
			res.status(400).json({
				error: true,
				code: 400,
				message: 'Error listing users',
				data: err,
			});
		}
	} else if (req.auth.data.type === 'User') {
		try {
			const users = await User.findAll({
				attributes: {
					exclude: ['password', 'profile', 'createdAt', 'updatedAt'],
				},
				where: { id: req.auth.data.id },
			});
			res.status(206).json({
				error: false,
				code: 206,
				message: 'User data',
				data: users,
			});
		} catch (err) {
			res.status(400).json({
				error: true,
				code: 400,
				message: 'Error listing users',
				data: err,
			});
		}
	} else {
		res.status(401).json({
			error: true,
			code: 401,
			message: 'Not authorized to list users',
		});
	}
};

const getUserById = async (req, res) => {
	if (req.auth.data.type === 'Admin') {
		try {
			const user = await User.findOne({
				where: { id: req.params.id },
				attributes: { exclude: ['password'] },
			});
			res.status(200).json({
				error: false,
				code: 200,
				message: 'User data',
				data: user,
			});
		} catch (err) {
			res.status(400).json({
				error: true,
				code: 400,
				message: 'Error listing user',
				data: err,
			});
		}
	} else if (req.params.id == req.auth.data.id) {
		try {
			const user = await User.findOne({
				where: { id: req.params.id },
				attributes: {
					exclude: ['password', 'profile', 'createdAt', 'updatedAt'],
				},
			});
			res.status(206).json({
				error: false,
				code: 206,
				message: 'User data',
				data: user,
			});
		} catch (err) {
			res.status(400).json({
				error: true,
				code: 400,
				message: 'Error listing user',
				data: err,
			});
		}
	} else {
		res.status(401).json({
			error: true,
			code: 401,
			message: 'Not authorized to list user',
		});
	}
};

const updateUser = async (req, res) => {
	if (req.auth.data.type === 'Admin') {
		try {
			const { name, email, password, profile } = req.body;
			const user = await User.update(
				{ name, email, password, profile },
				{ where: { id: req.params.id } }
			);
			res.status(201).json({
				error: false,
				code: 201,
				message: 'User modified',
				data: user,
			});
		} catch (err) {
			res.status(400).json({
				error: true,
				code: 400,
				message: 'Error modifying user',
				data: err,
			});
		}
	} else if (req.params.id == req.auth.data.id) {
		try {
			const { name, password } = req.body;
			const user = await User.update(
				{ name, password },
				{ where: { id: req.auth.data.id } }
			);
			res.status(201).json({
				error: false,
				code: 201,
				message: 'User modified',
				data: user,
			});
		} catch (err) {
			res.status(400).json({
				error: true,
				code: 400,
				message: 'Error modifying user',
				data: err,
			});
		}
	} else {
		res.status(401).json({
			error: true,
			code: 401,
			message: 'Not authorized to modify user',
		});
	}
};

const deleteUser = async (req, res) => {
	if (req.auth.data.type === 'Admin') {
		try {
			const user = await User.destroy({ where: { id: req.params.id } });
			res.status(200).json({
				error: false,
				code: 200,
				message: 'User deleted',
				data: user,
			});
		} catch (err) {
			res.status(400).json({
				error: true,
				code: 400,
				message: 'Error deleting user',
				data: err,
			});
		}
	} else {
		res.status(401).json({
			error: true,
			code: 401,
			message: 'Not authorized to delete user',
		});
	}
};

module.exports = {
	// createUser,
	getAllUsers,
	getUserById,
	updateUser,
	deleteUser,
};
