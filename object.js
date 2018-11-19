Logger.level = Logger.INFO;
//custom endpoint and afterHook to test new header
Hydra.object.afterCreate(function(request){
	Logger.info("After Profile Update Log");
	return ['inc', 'server_data.timesBeforeProfileUpdateHit', 1];
})