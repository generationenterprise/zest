module.exports = function(db) {
	var customer = db.Customer.create({
		username: 'brices@gmail.com',
		password: 'somethingsecret',
		firstName: 'Samuel',
		lastName: 'Brice',
		company: 'ACME',
		email: 'brices@gmail.com',
		homePhone: 6464502537,
		cellPhone: 6464502537,
		address: '30-48 32nd Street',
		city: 'Lagos',
		postcode: 'ZS234 HB44',
		referrer: 'Google',
		notes: 'VIP customer'
	});
	console.log('Added to user table!!!!!');
};