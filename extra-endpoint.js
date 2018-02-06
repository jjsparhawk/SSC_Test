//Custom Ping/Pong endpoint
Hydra.get('super_ping', function(request, response) {
    response.success({"ret":"super_pong"});
});