'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		await queryInterface.bulkInsert(
			'Messages',
			[
				{
					title: 'Message 1',
					body: 'This is the first message',
					UserId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					title: 'Message 2',
					body: 'This is the second message',
					UserId: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					title: 'Message 3',
					body: 'This is the third message',
					UserId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					title: 'Message 4',
					body: 'This is the fourth message',
					UserId: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
