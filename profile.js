// Profile before update hook
Hydra.profile.beforeUpdate(function(request){
	let banlist = Global.get("restricted");
	let acceptable = true;
	for (var bannedWord in banlist) {
		if (request.userRequest.body.myNickname === bannedWord){
			accetable = false
		}
	}
	if (accetable){
		return;
	}
	else{
		return D.rejected({'msg' : 'Innappropriate Nickname Submitted'});
	}
})