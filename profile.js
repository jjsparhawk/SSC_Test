// Profile before update hook
Hydra.profile.beforeUpdate(function(request){
	let banlist = Global.get("restricted");
	let acceptable = true;
	for (var bannedWord in banlist) {
		if (request.userRequest.body.data.myNickname === bannedWord){
			acceptable = false;
		}
	}
	if (acceptable){
		return{};
	}
	else{
		return D.rejected({'msg' : 'Innappropriate Nickname Submitted'});
	}
})