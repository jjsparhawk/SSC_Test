Hydra.get('testFileDeletion', function(request, response){
    var serverAuth = Hydra.Client.authServer();

    Hydra.Client.get("/ssc/invoke/chain_link_b", {auth: serverAuth, body:[["set","data.ServerMe","Impossible"]]}, function(serverRequest, body) {
        if(serverRequest.statusCode == 200) {
            response.success({});
        } else {
            response.failure({});
        }
    })
});