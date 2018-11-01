// Profile before update hook
Hydra.profile.beforeUpdate(function(request){
	let banlist = Global.get("restricted");
	let acceptable = true;
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