Logger.level = Logger.INFO;
// Profile before update hook
Hydra.profile.beforeUpdate(function(request){
	let userRequestBody = request.userRequest.body;
	if (userRequestBody.operations[0][1] === 'data.myNickname') {
		let acceptable = filter.validateWord(userRequestBody.operations[0][2]);
		if (acceptable){
			return {};
		} else{
			return D.rejected({'msg' : 'Innappropriate Nickname Submitted'});
		}
	} else {
		return {};
	}
})