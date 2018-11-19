Logger.level = Logger.INFO;

//Custom Ping/Pong endpoint
Hydra.get('custom_ping', function(request, response) {
    return D.resolved({"ret":"custom_pong"});
});