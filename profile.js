Logger.level = Logger.INFO;
// Profile before update hook
Hydra.profile.beforeUpdate(function(request){
	let banlist = Global.get("restricted");
	Logger.info(banlist);
	let acceptable = true;
	Logger.info(request.userRequest.body.operations[1]);
	if (request.userRequest.body.operations[1] === 'myNickname') {
		for (var bannedWord in banlist) {
			if (request.userRequest.body.operations[2] === bannedWord){
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