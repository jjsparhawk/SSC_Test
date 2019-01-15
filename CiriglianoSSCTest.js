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












