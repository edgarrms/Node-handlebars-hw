const connection = require('./connection');

function generateQuestionMarks(number) {
	let array = [];

	for (let i = 0; i < number; i++) {
		array.push('?');
	}

	return array.toString();
}

function covertObjectToSQL(obj) {
	const array = [];
	for (let keys in obj) {
		array.push(keys + '=' + obj[keys]);
	}

	var temp = array.toString();

	return temp;
}

const orm = {
	findAll: function(tableName, callbackFunction) {
		const queryString = `SELECT * FROM ${tableName}`;

		connection.query(queryString, function(err, results) {
			if (err) {
				throw err;
			}

			callbackFunction(results);
		});
	},
	createOne: function(tableName, columns, values, callbackFunction) {
		// const queryString = `INSERT INTO ${tableName} (burger_name, devoured) VALUES ( ?, ? )`;
		const queryString = `INSERT INTO ${tableName}
		(${columns.toString()}) VALUES
		(${generateQuestionMarks(values.length)})`;
		connection.query(queryString, values, function(err, results) {
			if (err) {
				throw err;
			}
			callbackFunction(results);
		});
	},
	updateOne: function(tableName, values, condition, callbackFunction) {
		// Error: ER_PARSE_ERROR: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'burger,devoured=true WHERE id=1' at line 2
		const queryString = `UPDATE ${tableName} SET ${covertObjectToSQL(values)} WHERE ${condition}`;

		connection.query(queryString, function(err, results) {
			if (err) {
				throw err;
			}

			callbackFunction(results);
		});
	}
};

// orm.createOne('burgers', ['burger_name', 'devoured'], ['random test', false]);
// orm.createOne("cats");

module.exports = orm;
