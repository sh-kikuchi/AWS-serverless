function signIn() {

	let username = document.getElementById("email").value;
	let password = document.getElementById("password").value;

	let authenticationData = {
		Username: username,
		Password: password,
	};

	let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
		authenticationData
	);
	let poolData = {
		UserPoolId: config.UserPoolId,
		ClientId: config.ClientId,
	};
	let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
	let userData = {
		Username: username,
		Pool: userPool,
	};

	let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
	cognitoUser.authenticateUser(authenticationDetails, {
		onSuccess: function(result) {
			AWS.config.region = config.Region;

			const loginObj = {}
			const loginProvider = `cognito-idp.${config.Region}.amazonaws.com/${config.UserPoolId}`
			loginObj[loginProvider] = result.getIdToken().getJwtToken();

			AWS.config.credentials = new AWS.CognitoIdentityCredentials({
				IdentityPoolId: config.IdentityPoolId,
				Logins: loginObj
			});

			AWS.config.credentials.refresh(error => {
				if (error) {
					console.error(error);
				} else {
					window.location.assign('index.html');
				}
			});
		},

		onFailure: function(err) {
			alert(err.message || JSON.stringify(err));
		},
	});
}
