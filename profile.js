// Profile before update hook
Hydra.profile.beforeUpdate(function(request, response){
	var banlist = Global.get("restricted");
})