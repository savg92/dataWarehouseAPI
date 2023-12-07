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
			'Users',
			[
				{
					name: 'admin',
					email: 'admin@easymedia.com',
					password:
						'$2b$10$XiQyf8dUxfSEN9ylJONkXei/k5b/QOQQBAicjx58aSi5Z.CLisv7e',
					profile: 'Admin',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'John Doe',
					email: 'jdoe@easymedia.com',
					password:
						'$2b$10$96csXUOAz5Y55sHyagNY6eIh301Lcrv9PDZujXnBieDC3m4pIrX3a',
					profile: 'User',
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
