Logger.level = Logger.INFO;
// Profile before update hook
Hydra.profile.beforeUpdate(function(request){
	let banlist = Global.get("restricted");
	let userRequestBody = request.userRequest.body;
	Logger.info(banlist);
	let acceptable = true;
	if (userRequestBody.operations[0][1] === 'data.myNickname') {
		for (var bannedWord in banlist[]) {
			if (userRequestBody.operations[0][2] === bannedWord){
				acceptable = false;
			}
		}
		Logger.info(userRequestBody.operations[0][2]);
		Logger.info(acceptable);
		if (acceptable){
			return {};
		} else{
			return D.rejected({'msg' : 'Innappropriate Nickname Submitted'});
		}
	} else {
		return {};
	}
})