Logger.level = Logger.INFO;
// Profile before update hook
Hydra.profile.beforeUpdate(function(request){
	let userRequestBody = request.userRequest.body;
	if (userRequestBody.operations[0][1] === 'data.myNickname') {
		let nickname = userRequestBody.operations[0][2];
		if (nickname instanceof Hydra.Types.Compressed){
			nickname = nickname.decompressedSync();
		}
		let acceptable = validateWord(nickname);
		if (acceptable){
			return {};
		} else{
			return D.rejected({'msg' : 'Innappropriate Nickname Submitted'});
		}
	} else {
		return {};
	}
})