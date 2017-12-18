const db = require('./connection');

function addUser(user) {
	return db('user').insert(user).returning('id')
		.then(arr => arr[0]);
}

function getUserById(id) {
	return db('user').select().where('id', id).first();
}

function getUserByName(username) {
	return db('user').select().where('username', username).first();
}

module.exports = {
	addUser,
	getUserById,
	getUserByName
};
