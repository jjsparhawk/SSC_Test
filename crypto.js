Hydra.put('crypto_random_data', function(request, response) {
    Crypto.randomBytes(request.body.data_size)
    .then(function(randomBuffer) {
        response.success({randomData: randomBuffer, dataSize: randomBuffer.length});
    }, function(error) {
        response.failure({error: error});
    });
});