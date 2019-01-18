Logger.level = Logger.INFO;

// OnLoad

Hydra.onLoad(function(response) {
    Global.set("test-var", {
        "knees":"weak",
        "palms":"sweaty",
        "vomit":"on his sweater already",
        "mom's":"spaghetti"
    });
    return true;
})

// Custom Endpoints

Hydra.get('test-response', function(request) {
    return D.resolved({"ret":".egassem sdrawkcaB"});
});

Hydra.get('test-logging', function(request) {
    Logger.info("Here's some neat info for ya.");
    Logger.warning("Always make sure to secure the wrist strap before flailing wildly.");
    Logger.error("Instructions unclear; Wii Remote lodged in TV.");
    return D.resolved();
});

Hydra.get('test-get-profile', function(request) {
    let serverAuth = Hydra.Client.authServer();

    let accountId = request.userRequest.queryparams.accountId;
    return Hydra.Client.get("/profiles/" + accountId, {auth: serverAuth})
        .then(function(profileResponse) {
            return profileResponse.body;
        });
});

Hydra.get('test-get-global', function(request) {
    return D.resolved({"test-var":Global.get("test-var")})
});

Hydra.get('test-reject', function(request) {
    return D.rejected("Nope.");
});

Hydra.get('test-no-return', function(request) {});

Hydra.get('test-huge-log', function(request) {
    let log = "Badger";
    for (var i = 0; i < 22; i++) {
        log = log + log;
    }
    Logger.info(log);
    log = "Mushroom";
    for (var i = 0; i < 22; i++) {
        log = log + log;
    }
    Logger.warning(log);
    log = "Snake";
    for (var i = 0; i < 25; i++) {
        log = log + log;
    }
    Logger.error(log);
    return D.resolved("Log sent.");
});

// UGC Hooks

Hydra.userContentItem.beforeCreate(function(request) {
    let body = new Map();
    body = request.userRequest.body;
    if(body["type_slug"] == "lore-book") {
        return [["set", "data.LoreBookBeforeCreateHit", true]];
    }
    else if (body["type_slug"] == "log-tester") {
        let log = "Badger";
        for (var i = 0; i < 25; i++) {
            log = log + log;
        }
        Logger.info(log);
        return [["set", "data.LogSent", true]];
    }
    return {};
});

Hydra.userContentItem.afterCreate(function(request) {
    let body = new Map();
    body = request.userRequest.body;
    if(body["type_slug"] == "lore-book") {
        return [["inc", "data.LoreBookAfterCreateHit", true]];
    }
    return {};
});

Hydra.userContentItem.afterUpdate(function(request) {
    Logger.info("Hit UGC BeforeUpdate");
    let body = new Map();
    body = request.userRequest.body;
    return [["inc", "data.LoreBookUpdated", 1]];
});

// Pre-envelope return styles
Hydra.get('success_plain', function(request, response) {
    return 'all good';
});

Hydra.get('success_plain_response', function(request, response) {
    return {"code": 220, "body": "all good"};
});

Hydra.get('success_plain_promise', function(request, response) {
    return D.resolved('all good');
});

Hydra.get('success_plain_promise_response', function(request, response) {
    return D.resolved({"code": 220, "body": "all good"});
});

Hydra.get('success_plain_direct', function(request, response) {
    response.success('all good');
});

Hydra.get('success_plain_direct_response', function(request, response) {
    response.success({"code": 220, "body": "all good"});
});

Hydra.get('failure_plain_promise', function(request, response) {
    return D.rejected('all bad');
});

Hydra.get('failure_plain_promise_response', function(request, response) {
    return D.rejected({"code": 450, "body": "all bad"});
});

Hydra.get('failure_plain_direct', function(request, response) {
    response.failure('all bad');
});

Hydra.get('failure_plain_direct_response', function(request, response) {
    response.failure({"code": 450, "body": "all bad"});
});

// New SSC return code return styles
Hydra.get('success_envelope', function(request, response) {
    return new SSCSuccess(234, "all good");
});

Hydra.get('success_envelope_promise', function(request, response) {
    return D.resolved(new SSCSuccess(234, "all good"));
});

Hydra.get('success_envelope_direct', function(request, response) {
    response.success(new SSCSuccess(234, "all good"));
});

Hydra.get('error_envelope', function(request, response) {
    return new SSCError(234, "all bad");
});

Hydra.get('error_envelope_promise', function(request, response) {
    return D.rejected(new SSCError(234, "all bad"));
});

Hydra.get('error_envelope_direct', function(request, response) {
    response.failure(new SSCError(234, "all bad"));
});

Hydra.get('failure_envelope', function(request, response) {
    return new HydraError("all bad");
});

Hydra.get('failure_envelope_promise', function(request, response) {
    return D.rejected(new HydraError("all bad"));
});

Hydra.get('failure_envelope_direct', function(request, response) {
    response.failure(new HydraError("all bad"));
});

// New SSC return code return styles with metadata
Hydra.get('success_envelope_withmd', function(request, response) {
    return new SSCSuccess(234, "all good", {"hello": "world"});
});

Hydra.get('success_envelope_promise_withmd', function(request, response) {
    return D.resolved(new SSCSuccess(234, "all good", {"hello": "world"}));
});

Hydra.get('success_envelope_direct_withmd', function(request, response) {
    response.success(new SSCSuccess(234, "all good", {"hello": "world"}));
});

Hydra.get('error_envelope_withmd', function(request, response) {
    return new SSCError(234, "all bad", {"hello": "world"});
});

Hydra.get('error_envelope_promise_withmd', function(request, response) {
    return D.rejected(new SSCError(234, "all bad", {"hello": "world"}));
});

Hydra.get('error_envelope_direct_withmd', function(request, response) {
    response.failure(new SSCError(234, "all bad", {"hello": "world"}));
});

Hydra.get('failure_envelope_withmd', function(request, response) {
    return new HydraError("all bad", {"hello": "world"});
});

Hydra.get('failure_envelope_promise_withmd', function(request, response) {
    return D.rejected(new HydraError("all bad", {"hello": "world"}));
});

Hydra.get('failure_envelope_direct_withmd', function(request, response) {
    response.failure(new HydraError("all bad", {"hello": "world"}));
});

Hydra.object.beforeCreate(function(request, response){
    Logger.info("Before Generic Object Create Log");
    return new SSCSuccess(256, [["set", "data.BeforeObjectCreateHit", true]], {"meta":"data"});
})

Hydra.object.afterCreate(function(request, response){
    Logger.info("After Generic Object Create Log");
    return new HydraError([["set", "data.AfterObjectCreateHit", true]], {"meta":"data"});
})

Hydra.object.beforeUpdate(function(request, response){
    Logger.info("Before Generic Object Create Log");
    return new HydraError([["add", "data.BeforeObjectCreateHitVal", 3]], {"meta":"data"});
})

Hydra.object.afterUpdate(function(request, response){
    Logger.info("After Generic Object Create Log");
    return new SSCSuccess(256, [["add", "data.AfterObjectCreateHitVal", 3]], {"meta":"data"});
})








