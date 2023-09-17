function signUp() {

	var poolData = {
		UserPoolId: config.UserPoolId,
		ClientId: config.ClientId,
	};
	var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

	var username = document.getElementById("email").value;
	var password = document.getElementById("password").value;

	userPool.signUp(username, password, null, null, function(
		err,
		result
	) {
		if (err) {
			alert(err.message || JSON.stringify(err));
			return;
		}
		window.location.assign('signin.html');
	});
}