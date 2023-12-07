const { Message } = require('../models');

const createMessage = async (req, res) => {
	try {
		const { title, body, UserId } = req.body;
		const message = await Message.create({ title, body, UserId });
		res.status(201).json({
			error: false,
			code: 201,
			message: 'Message created',
			answer: message,
		});
	} catch (err) {
		res.status(400).json({
			error: true,
			code: 400,
			message: 'Error creating message',
			answer: err,
		});
	}
};

const getAllMessages = async (req, res) => {
	try {
		const message = await Message.findAll();
		res.status(200).json({
			error: false,
			code: 200,
			message: 'List of Messages',
			answer: message,
		});
	} catch (err) {
		res.status(400).json({
			error: true,
			code: 400,
			message: 'Error getting Messages',
			answer: err,
		});
	}
};

const getMessagesById = async (req, res) => {
	try {
		const message = await Message.findAll({
			where: {
				UserId: req.params.id,
			},
		});
		res.status(200).json({
			error: false,
			code: 200,
			message: 'Messages by user',
			answer: message,
		});
	} catch (err) {
		res.status(400).json({
			error: true,
			code: 400,
			message: 'Error getting Messages by user',
			answer: err,
		});
	}
};

const getMessagesByDate = async (req, res) => {
	try {
		const message = await Message.findAll({
			where: {
				createdAt: {
					[Op.like]: `%${req.body.date}%`,
				},
			},
		});
		res.status(200).json({
			error: false,
			code: 200,
			message: 'Messages by date',
			answer: message,
		});
	} catch (err) {
		res.status(400).json({
			error: true,
			code: 400,
			message: 'Error getting Messages by date',
			answer: err,
		});
	}
};

const getMessagesByWord = async (req, res) => {
	// try {
	// 	const message = await Message.findAll({
	// 		where: {
	// 			title: {
	// 				[Op.like]: `%${req.body.word}%`,
	// 			},
	// 			body: {
	// 				[Op.like]: `%${req.body.word}%`,
	// 			},
	// 		},
	// 	});
	// 	res.status(200).json({
	// 		error: false,
	// 		code: 200,
	// 		message: 'Messages by word',
	// 		answer: message,
	// 	});
	// } catch (err) {
	// 	res.status(400).json({
	// 		error: true,
	// 		code: 400,
	// 		message: 'Error getting Messages by word',
	// 		answer: err,
	// 	});
	// }

	// try {
	// 	const { word } = req.body;
	// 	const messages = await Message.findAll({
	// 		where: {
	// 			[Op.or]: [
	// 				{ title: { [Op.iLike]: `%${word}%` } },
	// 				// { body: { [Op.iLike]: `%${word}%` } },
	// 			],
	// 		},
	// 	});
	// 	res.status(200).json({
	// 		error: false,
	// 		code: 200,
	// 		message: `Messages containing "${word}" in their title or body`,
	// 		data: messages,
	// 	});
	// } catch (err) {
	// 	res.status(400).json({
	// 		error: true,
	// 		code: 400,
	// 		message: 'Error finding messages',
	// 		data: err,
	// 	});
	// }

	try {
		const { word } = req.body;
		const messages = await Message.sequelize.query(
			// `SELECT * FROM Messages WHERE title LIKE '%${word}%' OR title LIKE '${word}%' OR title LIKE '%${word}' OR body LIKE '%${word}%' OR body LIKE '${word}%' OR body LIKE '%${word}';`
			// `SELECT * FROM Messages WHERE title LIKE '%dfd%'`
			`SELECT * FROM Messages`
		);
		res.status(200).json({
			error: false,
			code: 200,
			message: `Messages containing "${word}" in their title`,
			data: messages,
		});
	} catch (err) {
		res.status(400).json({
			error: true,
			code: 400,
			message: 'Error finding messages',
			data: err,
		});
	}

	// try {
	// 	const { word } = req.body.query.toLowerCase();
	// 	const messages = await Message.findAll({
	// 		where: {
	// 			body: {[Op.iLike]: `%${word}%`}
	// 		},
	// 	});
	// 	res.status(200).json({
	// 		error: false,
	// 		code: 200,
	// 		message: `Messages containing "${word}" in their body`,
	// 		data: messages,
	// 	});
	// } catch (err) {
	// 	res.status(400).json({
	// 		error: true,
	// 		code: 400,
	// 		message: 'Error finding messages',
	// 		data: err,
	// 	});
	// }
};

const updateMessage = async (req, res) => {
	if (req.auth.data.type === 'Admin') {
		try {
			const { title, body, UserId } = req.body;
			const message = await Message.update(
				{
					title,
					body,
					UserId,
				},
				{
					where: {
						id: req.params.id,
					},
				}
			);
			res.status(201).json({
				error: false,
				code: 201,
				message: 'Message modified',
				answer: message,
			});
		} catch (err) {
			res.status(400).json({
				error: true,
				code: 400,
				message: 'Error modifying Message',
				answer: err,
			});
		}
	} else if (req.auth.data.type === 'User') {
		res.status(400).json({
			error: true,
			code: 400,
			message: 'Not authorized to modify Message',
		});
	}
};

const deleteMessage = async (req, res) => {
	if (req.auth.data.type === 'Admin') {
		try {
			const message = await Message.destroy({
				where: {
					id: req.params.id,
				},
			});
			res.status(200).json({
				error: false,
				code: 200,
				message: 'Message deleted',
				answer: message,
			});
		} catch (err) {
			res.status(400).json({
				error: true,
				code: 400,
				message: 'Error deleting Message',
				answer: err,
			});
		}
	} else if (req.auth.data.type === 'User') {
		res.status(400).json({
			error: true,
			code: 400,
			message: 'Not authorized to delete Message',
		});
	}
};

module.exports = {
	createMessage,
	getAllMessages,
	getMessagesById,
	getMessagesByDate,
	getMessagesByWord,
	updateMessage,
	deleteMessage,
};
