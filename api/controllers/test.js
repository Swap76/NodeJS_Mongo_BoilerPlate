exports.test = async (req, res) => {
	message = [
		{id: 1, firstName:'Swapnil', lastName:'Shinde'},
		{id: 2, firstName:'Rahul', lastName:'Sawant-Desai'},
		{id: 3, firstName:'Omkar', lastName:'Prabhu'},
	]
	return message;
}

exports.test1 = async (req, res) => {
	message = [
		{id: 1, firstName:'Swapnil', lastName:'Shinde'},
		{id: 2, firstName:'Rahul', lastName:'Sawant-Desai'},
		{id: 3, firstName:'Omkar', lastName:'Prabhu'},
		{id: 4, firstName:'Shwetz', lastName:'Sies'},
	]
	return message;
}