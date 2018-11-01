Logger.level = Logger.INFO;
// Profile before update hook
Hydra.profile.beforeUpdate(function(request){
	let banlist = Global.get("restricted");
	let userRequestBody = request.userRequest.body;
	Logger.info(banlist);
	let acceptable = true;
	Logger.info(userRequestBody.operations[0]);
	if (userRequestBody.operations[0][1] === 'data.myNickname') {
		for (var bannedWord in banlist) {
			if (request.userRequest.body.operations[0][2] === bannedWord){
				acceptable = false;
			}
		}
		if (acceptable){
			return {};
		} else{
			return D.rejected({'msg' : 'Innappropriate Nickname Submitted'});
		}
	} else {
		return {};
	}
})