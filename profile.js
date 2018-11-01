// Profile before update hook
Hydra.profile.beforeUpdate(function(request){
	let banlist = Global.get("restricted");
	let acceptable = true;
	if (request.userRequest.body.Operations[2] === 'myNickname') {
		for (var bannedWord in banlist) {
			if (request.userRequest.body.Operations[3] === bannedWord){
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