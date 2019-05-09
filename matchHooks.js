//set Logger Level
Logger.level = Logger.INFO;
//before and after hooks for testing
Hydra.match.afterComplete(function(request, response){
    Logger.info("After Match Complete Log");
    return {};
})

Hydra.match.beforeComplete(function(request, response){
    Logger.info("After Match Complete Log");
    return {};
})

Hydra.match.afterAbandon(function(request, response){
    Logger.info("After Match Complete Log");
    return {};
})