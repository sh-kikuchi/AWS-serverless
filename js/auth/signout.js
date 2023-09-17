function signout() {
  const poolData = {
    UserPoolId: config.UserPoolId,
    ClientId: config.ClientId,
  };

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  const cognitoUser = userPool.getCurrentUser();

  if(cognitoUser !== null){
    cognitoUser.signOut();
    location.reload();
  }else{
    window.location.assign('signin.html');
  }

}
