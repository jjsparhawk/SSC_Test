//Set Logger Level to INFO
Logger.level = Logger.INFO;
//------------------------------------------------------------------------------------------------------------------------------------------

//OnLoad event

Hydra.onLoad(function(response) {
   var serverAuth = Hydra.Client.authServer();

   return Hydra.Client.get("/broadcast_channels/test/broadcast_messages", {auth: serverAuth})
   .then(function(result) {
      Global.set("onLoad", result.body);
      return true;
      
      //To test onLoad automatic re-try loop:
      //response.failure({})
   })
})

//------------------------------------------------------------------------------------------------------------------------------------------

//Account Events

//beforeCreate (with invalid return type)
Hydra.account.beforeCreate(function(request, response){
    Logger.info("Before Account Create Log");
    return true;
})

//afterCreate (with invalid return type)
Hydra.account.afterCreate(function(request, response){
    Logger.info("After Account Create Log");
    return null;
})


Hydra.account.beforeUpdate(function(request, response){
    Logger.info("Before Account Update Log");
    return {};
})

Hydra.account.afterUpdate(function(request, response){
    Logger.info("After Account Update Log");
    return {};
})

Hydra.account.beforeBan(function(request, response){
    Logger.info("Before Account Ban Log");
    return {};
})

Hydra.account.afterBan(function(request, response){
    Logger.info("After Account Ban Log");
    return {};
})

Hydra.account.beforeUnban(function(request, response){
    Logger.info("Before Account Unban Log");
    return {};
})

Hydra.account.afterUnban(function(request, response){
    Logger.info("After Account Unban Log");
    return {};
})

Hydra.account.beforeKick(function(request, response){
    Logger.info("Before Account Kick Log");
    return {};
})

Hydra.account.afterKick(function(request, response){
    Logger.info("After Account Kick Log");
    return {};
})

Hydra.account.beforeAuth(function(request, response){
    Logger.info("Before Account Auth Log");
    return {};
})

Hydra.account.afterOnline(function(request, response){
    response.success([['inc', 'server_data.timesWentOnline', 1]]);
})

Hydra.account.afterOffline(function(request, response){
    response.success([['inc', 'server_data.timesWentOffline', 1]]);
})

//------------------------------------------------------------------------------------------------------------------------------------------

//Profile Events

Hydra.profile.afterCreate(function(request, response){
    Logger.info("After Profile Create Log");
    return {};
})

//Edit compressed data on profile model
/*Hydra.profile.beforeUpdate(function(request, response){
    Logger.info("Before Profile Update Log");
    return response.success([['inc', 'server_data.timesBeforeProfileUpdateHit', 1], ['set', 'data.testingCompressedInSSCHook', new Types.Compressed("Compress This Data Yo.")]]);;
})*/

Hydra.profile.afterUpdate(function(request, response){
    Logger.info("After Profile Update Log");
    return {};
})

Hydra.profile.beforeFileCreate(function(request, response){
    Logger.info("Before Profile File Create Log");
    return {};
})

Hydra.profile.afterFileCreate(function(request, response){
    Logger.info("After Profile File Create Log");
    return {};
})

Hydra.profile.beforeFileUpdate(function(request, response){
    Logger.info("Before Profile File Update Log");
    return {};
})

Hydra.profile.afterFileUpdate(function(request, response){
    Logger.info("After Profile File Update Log");
    return {};
})

Hydra.profile.beforeFileDelete(function(request, response){
    Logger.info("Before Profile File Delete Log");
    return {};
})

Hydra.profile.afterFileDelete(function(request, response){
    Logger.info("After Profile File Delete Log");
    return {};
})

//------------------------------------------------------------------------------------------------------------------------------------------

//Match Events

Hydra.match.beforeCreate(function(request, response){
    Logger.info("Before Match Create Log");
    return {};
})

Hydra.match.afterCreate(function(request, response){
    Logger.info("After Match Create Log");
    return {};
})

Hydra.match.beforeUpdate(function(request, response){
    Logger.info("Before Match Update Log");
    return {};
})

Hydra.match.afterUpdate(function(request, response){
    Logger.info("After Match Update Log");
    return {};
})

Hydra.match.beforeJoin(function(request, response){
    Logger.info("Before Match Join Log");
    return {};
})

Hydra.match.afterJoin(function(request, response){
    Logger.info("After Match Join Log");
    return {};
})

Hydra.match.beforeLeave(function(request, response){
    Logger.info("Before Match Leave Log");
    return {};
})

Hydra.match.afterLeave(function(request, response){
    Logger.info("After Match Leave Log");
    return {};
})

Hydra.match.beforeComplete(function(request, response){
    Logger.info("Before Match Complete Log");
    return {};
})

Hydra.match.afterComplete(function(request, response){
    Logger.info("After Match Complete Log");
    return {};
})

Hydra.match.beforeKick(function(request, response){
    Logger.info("Before Match Kick Log");
    return {};
})

Hydra.match.afterKick(function(request, response){
    Logger.info("After Match Kick Log");
    return {};
})

Hydra.match.beforeInvite(function(request, response){
    Logger.info("Before Match Invite Log");
    return {};
})

Hydra.match.afterInvite(function(request, response){
    Logger.info("After Match Invite Log");
    return {};
})

Hydra.match.beforeFluidCreate(function(request, response){
    Logger.info("Before Fluid Match Create Log");
    return {};
})

Hydra.match.afterFluidCreate(function(request, response){
    Logger.info("After Fluid Match Create Log");
    return {};
})

Hydra.match.beforeFixedCreate(function(request, response){
    Logger.info("Before Fixed Match Create Log");
    return {};
})

Hydra.match.afterFixedCreate(function(request, response){
    Logger.info("After Fixed Match Create Log");
    return {};
})

//------------------------------------------------------------------------------------------------------------------------------------------

//Generic Object Events

Hydra.object.beforeCreate(function(request, response){
    Logger.info("Before Generic Object Create Log");
    response.success([['set', 'server_data.beforeCreateHookHit', "true"]]);
})

Hydra.object.afterCreate(function(request, response){
    Logger.info("After Generic Object Create Log");
    response.success([['set', 'data.afterCreateHookHit', "true"]]);
})

Hydra.object.beforeUpdate(function(request, response){
    Logger.info("Before Generic Object Update Log");
    return {};
})

Hydra.object.afterUpdate(function(request, response){
    Logger.info("After Generic Object Update Log");
    return {};
})

Hydra.object.beforeDelete(function(request, response){
    Logger.info("Before Generic Object Delete Log");
    return {};
})

Hydra.object.afterDelete(function(request, response){
    Logger.info("After Generic Object Delete Log");
    return {};
})

//------------------------------------------------------------------------------------------------------------------------------------------

//Clan Events

Hydra.clan.beforeCreate(function(request, response){
    Logger.info("Before Clan Create Log");
    return {};
})

Hydra.clan.afterCreate(function(request, response){
    Logger.info("After Clan Create Log");
    return {};
})

Hydra.clan.beforeUpdate(function(request, response){
    Logger.info("Before Clan Update Log");
    return {};
})

Hydra.clan.afterUpdate(function(request, response){
    Logger.info("After Clan Update Log");
    return {};
})

Hydra.clan.beforeDelete(function(request, response){
    Logger.info("Before Clan Delete Log");
    return {};
})

Hydra.clan.afterDelete(function(request, response){
    Logger.info("After Clan Delete Log");
    return {};
})

Hydra.clan.beforeClanMembersIdle(function(request, response){
    var serverAuth = Hydra.Client.authServer();

    return Hydra.Client.get("/broadcast_channels/ClanMembersIdle/broadcast_messages", {auth: serverAuth})
   .then(function(result) {
      Global.set("onLoad", result.body);
      return true;
   })
})

//------------------------------------------------------------------------------------------------------------------------------------------

//Clan Member Events

Hydra.clanMember.beforeJoin(function(request, response){
    Logger.info("Before Clan Member Join Log");
    return {};
})

Hydra.clanMember.afterJoin(function(request, response){
    Logger.info("After Clan Member Join Log");
    return {};
})

Hydra.clanMember.beforeUpdate(function(request, response){
    Logger.info("Before Clan Member Update Log");
    return {};
})

Hydra.clanMember.afterUpdate(function(request, response){
    Logger.info("After Clan Member Update Log");
    return {};
})

Hydra.clanMember.beforeLeave(function(request, response){
    Logger.info("Before Clan Member Leave Log");
    return {};
})

Hydra.clanMember.afterLeave(function(request, response){
    Logger.info("After Clan Member Leave Log");
    return {};
})

Hydra.clanMember.beforeKick(function(request, response){
    Logger.info("Before Clan Member Kick Log");
    return {};
})

Hydra.clanMember.afterKick(function(request, response){
    Logger.info("After Clan Member Kick Log");
    return {};
})

Hydra.clanMember.beforeRoleUpdate(function(request, response){
    Logger.info("Before Clan Member Role Update Log");
    return {};
})

Hydra.clanMember.afterRoleUpdate(function(request, response){
    Logger.info("After Clan Member Role Update Log");
    return {};
})

Hydra.clanMember.beforeInvite(function(request, response){
    Logger.info("Before Clan Member Invite Log");
    return {};
})

Hydra.clanMember.afterInvite(function(request, response){
    Logger.info("After Clan Member Invite Log");
    return {};
})

Hydra.clanMember.beforeApply(function(request, response){
    Logger.info("Before Clan Member Apply Log");
    return {};
})

Hydra.clanMember.afterApply(function(request, response){
    Logger.info("After Clan Member Apply Log");
    return {};
})

Hydra.clanMember.beforeApprove(function(request, response){
    Logger.info("Before Clan Member Approve Log");
    return {};
})

Hydra.clanMember.afterApprove(function(request, response){
    Logger.info("After Clan Member Approve Log");
    return {};
})

Hydra.clanMember.beforeReject(function(request, response){
    Logger.info("Before Clan Member Reject Log");
    return {};
})

Hydra.clanMember.afterReject(function(request, response){
    Logger.info("After Clan Member Reject Log");
    return {};
})

Hydra.clanMember.beforeDecline(function(request, response){
    Logger.info("Before Clan Member Decline Log");
    return {};
})

Hydra.clanMember.afterDecline(function(request, response){
    Logger.info("After Clan Member Decline Log");
    return {};
})

//------------------------------------------------------------------------------------------------------------------------------------------

//Lobby Events

Hydra.lobby.beforeCreate(function(request, response){
    Logger.info("Before Lobby Create Log");
    return {};
})

Hydra.lobby.afterCreate(function(request, response){
    Logger.info("After Lobby Create Log");
    return {};
})

Hydra.lobby.beforeUpdate(function(request, response){
    Logger.info("Before Lobby Update Log");
    return {};
})

Hydra.lobby.afterUpdate(function(request, response){
    Logger.info("After Lobby Update Log");
    return {};
})

Hydra.lobby.beforeDelete(function(request, response){
    Logger.info("Before Lobby Delete Log");
    return {};
})

Hydra.lobby.afterDelete(function(request, response){
    Logger.info("After Lobby Delete Log");
    return {};
})

//------------------------------------------------------------------------------------------------------------------------------------------

//Matchmaking Request Events

Hydra.matchMakingRequest.beforeCreate(function(request, response){
    Logger.info("Before Matchmaking Request Create Log");
    return {};
})

Hydra.matchMakingRequest.afterCreate(function(request, response){
    Logger.info("After Matchmaking Request Create Log");
    return {};
})

Hydra.matchMakingRequest.beforeCancel(function(request, response){
    Logger.info("Before Matchmaking Cancel Log");
    return {};
})

Hydra.matchMakingRequest.afterCancel(function(request, response){
    Logger.info("After Matchmaking Request Cancel Log");
    return {};
})

//------------------------------------------------------------------------------------------------------------------------------------------

//Matchmaking Result Events

Hydra.matchMakingResult.beforeCreate(function(request, response){
    Logger.info("Before Matchmaking Result Create Log");
    return {};
})

Hydra.matchMakingResult.afterCreate(function(request, response){
    Logger.info("After Matchmaking Result Create Log");
    return {};
})

//------------------------------------------------------------------------------------------------------------------------------------------

//UGC Item Events

Hydra.userContentItem.beforeCreate(function(request, response){
    Logger.info("Before UGC Item Create Log");
    return {};
})

Hydra.userContentItem.afterCreate(function(request, response){
    Logger.info("After User Content Item Create Log");
    return {};
})

Hydra.userContentItem.beforeUpdate(function(request, response){
    Logger.info("Before UGC Item Update Log");
    return {};
})

Hydra.userContentItem.afterUpdate(function(request, response){
    Logger.info("After User Content Item Update Log");
    return {};
})

Hydra.userContentItem.beforeShare(function(request, response){
    Logger.info("Before UGC Item Share Log");
    return {};
})

Hydra.userContentItem.afterShare(function(request, response){
    Logger.info("After User Content Item Share Log");
    return {};
})

Hydra.userContentItem.beforeUnshare(function(request, response){
    Logger.info("Before UGC Item Unshare Log");
    return {};
})

Hydra.userContentItem.afterUnshare(function(request, response){
    Logger.info("After User Content Item Unshare Log");
    return {};
})

Hydra.userContentItem.beforePublish(function(request, response){
    Logger.info("Before UGC Item Publish Log");
    return {};
})

Hydra.userContentItem.afterPublish(function(request, response){
    Logger.info("After User Content Item Publish Log");
    return {};
})

Hydra.userContentItem.beforeUnpublish(function(request, response){
    Logger.info("Before UGC Item Unpublish Log");
    return {};
})

Hydra.userContentItem.afterUnpublish(function(request, response){
    Logger.info("After User Content Item Unpublish Log");
    return {};
})

Hydra.userContentItem.beforeDelete(function(request, response){
    Logger.info("Before UGC Item Delete Log");
    return {};
})

Hydra.userContentItem.afterDelete(function(request, response){
    Logger.info("After User Content Item Delete Log");
    return {};
})

//------------------------------------------------------------------------------------------------------------------------------------------

//UGC Version Events

Hydra.userContentVersion.beforeCreate(function(request, response){
    Logger.info("Before UGC Version Create Log");
    return {};
})

Hydra.userContentVersion.afterCreate(function(request, response){
    Logger.info("After User Content Version Create Log");
    return {};
})

Hydra.userContentVersion.beforeFileCreate(function(request, response){
    Logger.info("Before UGC Version File Create Log");
    return {};
})

Hydra.userContentVersion.afterFileCreate(function(request, response){
    Logger.info("After User Content Version File Create Log");
    return {};
})

Hydra.userContentVersion.beforeFileUpdate(function(request, response){
    Logger.info("Before UGC Version File Update Log");
    return {};
})

Hydra.userContentVersion.afterFileUpdate(function(request, response){
    Logger.info("After User Content Version File Update Log");
    return {};
})

Hydra.userContentVersion.beforeFileDelete(function(request, response){
    Logger.info("Before UGC Version File Delete Log");
    return {};
})

Hydra.userContentVersion.afterFileDelete(function(request, response){
    Logger.info("After User Content Version File Delete Log");
    return {};
})

//------------------------------------------------------------------------------------------------------------------------------------------

//Purchase Events

Hydra.purchase.beforeCreate(function(request, response){
    Logger.info("Before Purchase Create Log");
    return {};
})

Hydra.purchase.afterFinalize(function(request, response){
    Logger.info("After Purchase Finalize Log");
    return {};
})

Hydra.purchase.afterCancel(function(request, response){
    Logger.info("After Purchase Cancel Log");
    return {};
})

//------------------------------------------------------------------------------------------------------------------------------------------

//Inventory Events

Hydra.inventory.beforeUpdate(function(request, response){
    Logger.info("Before Inventory Update Log");
    return {};
})

Hydra.inventory.afterUpdate(function(request, response){
    Logger.info("After Inventory Update Log");
    return {};
})

//------------------------------------------------------------------------------------------------------------------------------------------

//Notification Events

Hydra.notification.beforeConsume(function(request, response){
    Logger.info("Before Notification Consume Log");
    return {};
})

Hydra.notification.afterConsume(function(request, response){
    Logger.info("After Notification Consume Log");
    return {};
})

//------------------------------------------------------------------------------------------------------------------------------------------

//Custom Endpoints

//Custom Ping/Pong endpoint
Hydra.get('custom_ping', function(request, response) {
    response.success({"ret":"custom_pong"});
});

//Custom Endpoint with Query Parameter Use
Hydra.get('query_param_use', function(request) {
    var speedy_return_value = request.userRequest.queryparams.TestInput;
    return D.resolved(speedy_return_value);
});

//Custom Endpoint Testing All Logger Levels
Hydra.get('custom_test_all_logger_levels', function(request, response) {
    Logger.level = Logger.INFO;

    Logger.info("Here's the custom info message.");
    Logger.warning("Here's the custom warning message.");
    Logger.error("Here's the custom error message.");
    response.success({})
});

//Attempt an Impossible Update, updating 'me' with Server Access
Hydra.get('impossible_update', function(request, response){
    var serverAuth = Hydra.Client.authServer();

    Hydra.Client.put("/profiles/me", {auth: serverAuth, body:[["set","data.ServerMe","Impossible"]]}, function(serverRequest, body) {
        if(serverRequest.statusCode == 200) {
            response.success({});
        } else {
            response.failure({});
        }
    })
});

//Custom Endpoint that notifies all online players
Hydra.get('notify_online', function(request, response){
    var serverAuth = Hydra.Client.authServer();

    Hydra.Client.put("/profiles/notify", {auth: serverAuth, body:{"target":{"presence_state":"online"}, "notification":{"template":"YoureOnline", "data":{"IntTest":42, "DoubleTest":3.14156926, "DateTimeTest":"2017-04-04T15:07:04+00:00", "StringTest":"HelloWorld"}}}}, function(serverRequest, body) {
        if(serverRequest.statusCode == 200) {
            response.success({});
        } else {
            response.failure({});
        }
    })
});

//Custom Endpoint that sends a notification to a specific player
Hydra.get('notify_specific', function(request, response){
    var serverAuth = Hydra.Client.authServer();

    Hydra.Client.put("/profiles/58766d4df3efd0b60d176995", {auth: serverAuth, body:{
  "operations": [["set","data.kills",23]],
  "notification": {
    "data": {"IntTest":42, "DoubleTest":3.14156926, "DateTimeTest":"2017-04-04T15:07:04+00:00", "StringTest":"HelloWorld"},
    "template": "Hello"
  },
  "_model_update": true
}}, function(serverRequest, body) {
        if(serverRequest.statusCode == 200) {
            response.success({});
        } else {
            response.failure({});
        }
    })
});

//Create an event chain, to test a list of parent Id's in the Log Viewer
Hydra.get('chain_link_a', function(request, response){
    var serverAuth = Hydra.Client.authServer();

    Hydra.Client.get("/ssc/invoke/chain_link_b", {auth: serverAuth, body:[["set","data.ServerMe","Impossible"]]}, function(serverRequest, body) {
        if(serverRequest.statusCode == 200) {
            response.success({});
        } else {
            response.failure({});
        }
    })
});

Hydra.get('chain_link_b', function(request, response){
    var serverAuth = Hydra.Client.authServer();

    Hydra.Client.get("/ssc/invoke/chain_link_c", {auth: serverAuth, body:[["set","data.ServerMe","Impossible"]]}, function(serverRequest, body) {
        if(serverRequest.statusCode == 200) {
            response.success({});
        } else {
            response.failure({});
        }
    })
});

Hydra.get('chain_link_c', function(request, response){
    response.success({"ret":"Chain_End_Found"});
});



//Promises Custom Endpoint Test
Hydra.get('custom_promises', function(request, response) {
    return D.resolved(123);
});

//Custom Endpoint Without Headers
Hydra.get('custom_get_without_headers', function(request, response) {
    var serverAuth = Hydra.Client.authServer();

    Hydra.Client.get("/profiles/123", {"auth":serverAuth}, function(profileResponse, body) {
    })
    .then(function(requestresponse){
        response.success(requestresponse.body);
    });
});

//Custom Endpoint with Custom Header
Hydra.get('custom_get_with_headers', function(request, response) {
    var serverAuth = Hydra.Client.authServer();

    Hydra.Client.get("/profiles/123", {"headers": {"test_header_A": "test_A", "test_header_B": "test_B"}, "auth":serverAuth}, function(profileResponse, body) {
    })
    .then(function(requestresponse){
        response.success(requestresponse.body);
    });
});

//Custom Endpoint with Custom Client Header
Hydra.get('custom_get_with_custom_client_header', function(request, response) {
    var myMap = new Map();
    myMap = request.userRequest.headers;
    Logger.info(myMap["http-kristaps"]);
    return {};
});

//Custom Endpoint That Doesn't Return
Hydra.get('custom_no_response', function(request, response) {});

//Custom 'StartsWith' Test
Hydra.get('custom_starts_with_test', function(requst, response){
    var theString = "test123";
    if(theString.startsWith("test")){
        Logger.info("Yes, string starts with test.");
    }else{
        Logger.info("No, string starts with something else.");
    }
    return {};
});

//Custom Endpoint to Get All Globals
Hydra.get('custom_global_get_all', function(request, response) {
    response.success({"ret": Global.getAll()})
});

//Custom Endpoint that creates an UUID
Hydra.get('custom_create_uuid', function(request, response) {
    response.success({"v1": UUID.v1(), "v4": UUID.v4()})
});

//Custom Endpoint that returns body data
Hydra.put('send_and_receive', function(request, response) {
  response.success(request.body['data']);
});

//Custom Endpoint to test decompressing a string
Hydra.post('decompress_this_string', function(request, response) {
  var theCompressedData = request.body['compressed'];
  var decompressed = theCompressedData.decompressSync();

  decompressed = "Your String Decompressed: " + decompressed;
  Logger.info(decompressed);
  response.success({"compressed": new Types.Compressed(decompressed)});
});

//Custom Endpoint to test decompressing a map
Hydra.post('decompress_this_map', function(request, response) {
  var theCompressedData = request.body['compressed'];
  theCompressedData.decompressSync();

  decompressed['output'] = "HadoopScaleReduce";
  Logger.info("Decompressed Map:" + decompressed);
  response.success({"compressed": new Types.Compressed(decompressed)});
});

//Endpoint to Compress a String
Hydra.post('compress_this_string', function(request, response) {
  var theString = request.body['decompressed'];
  var theCompressedString = new Types.Compressed(theString);
  theCompressedString.compressSync();

  Logger.info("The Compressed String: " +  JSON.stringify(theCompressedString));
  response.success({"decompressed": theCompressedString.decompressSync()});
});

//Endpoint to Write compressed data to a profile with a raw url
Hydra.put('update_profile_with_compressed', function(request, response){
    var serverAuth = Hydra.Client.authServer();

    var profileToUpdate = "/profiles/" + request.body['account_id'];
    var theData = new Types.Compressed("Compress This Data For Me Please");
    theData.compressSync();

    Hydra.Client.put(profileToUpdate, {auth: serverAuth, body:
        [["set", "data.compressedByCustomEndpoint", theData]]}
    , function(serverRequest, body) {
        if(serverRequest.statusCode == 200) {
            response.success({});
        } else {
            response.failure({});
        }
    })
});

//Endpoint to decompress and read a compressed field on the player profile
Hydra.put('decompress_profile_field', function(request, response){
    var serverAuth = Hydra.Client.authServer();

    var profileToRetrieve = "/profiles/" + request.body['account_id'];

    return Hydra.Client.get(profileToRetrieve, {auth: serverAuth, autoUnCompress: true})
    .then(function(result) {
        var theCompressedData = result.body["data"][request.body['field_to_compress']];
        theCompressedData.decompressSync();
        Logger.info("The Decompressed String: " + theCompressedData));
        return true;
    })
});


//Custom Endpoint to test decompressing a string
/*Hydra.post('decompress_this_string', function(request, response) {
  var theCompressedData = request.body['compressed'];
  var decompressed = theCompressedData.decompressSync();

  decompressed = "Your String Decompressed: " + decompressed;
  Logger.info(decompressed);
  response.success({"compressed": new Types.Compressed(decompressed)});
});*/
//------------------------------------------------------------------------------------------------------------------------------------------


















































//------------------------------------------------------------------------------------------------------------------------------------------

//Notification Hooks

//Before Notification Consume, update account
/*Hydra.notification.beforeConsume(function(request, response) {
    var serverAuth = Hydra.Client.authServer("1ef8c79dc364407f9eb9c84d053827c0", "MDZhZTU1MzEtOWViZS00YzRmLWFmMTYtOWRlOWYyMzBhNWZiNGUyMTE5ZjktY2QxNy00NjE4LTg3MDgtODZiNDExMWMzODNi");

    Hydra.Client.put("/accounts/572a7671e80762f4d7fe7953", {auth: serverAuth, body:[["inc","server_data.timesBeforeNotificationConsume",1]]}, function(serverRequest, body) {
        if(serverRequest.statusCode == 200) {
            response.success({});
        } else {
            response.failure({});
        }
    })
});

//After Notification Consume, update account
Hydra.notification.afterConsume(function(request, response) {
    var serverAuth = Hydra.Client.authServer("1ef8c79dc364407f9eb9c84d053827c0", "MDZhZTU1MzEtOWViZS00YzRmLWFmMTYtOWRlOWYyMzBhNWZiNGUyMTE5ZjktY2QxNy00NjE4LTg3MDgtODZiNDExMWMzODNi");

    Hydra.Client.put("/accounts/572a7671e80762f4d7fe7953", {auth: serverAuth, body:[["inc","server_data.timesAfterNotificationConsume",1]]}, function(serverRequest, body) {
        if(serverRequest.statusCode == 200) {
            response.success({});
        } else {
            response.failure({});
        }
    })
});*/


/*
//Before Generic Object Delete, Update Account
Hydra.object.beforeDelete(function(request, response) {
    var serverAuth = Hydra.Client.authServer("3f3379d19374409a9c069e4a087329fe", "YjRlZDRiMzUtNjhmYy00YjQ1LWJhNjUtZmIzNmI3Nzk5Nzg4ODEyZmVjYzgtNmU4Mi00MTRjLTkyNTAtZTgwYjMxMzk4NGMx");

    Hydra.Client.put("/accounts/561c174f1fd89c2c4388a9da", {auth: serverAuth, body:[["inc","server_data.timesBeforeDeleteHit",1]]}, function(serverRequest, body) {
        if(serverRequest.statusCode == 200) {
            response.success({});
        } else {
            response.failure({});
        }
    })
});

//After Generic Object Delete, Update Account
Hydra.object.afterDelete(function(request, response) {
    var serverAuth = Hydra.Client.authServer("cc909b3e8e8c4b2b98f76b54023aa821", "ZmI5ZjVmN2YtNDk0YS00NDgwLWJhYTMtNDJkZjA2MDEwZjUyOTQ1MDdjODMtNWFiYi00MGYxLWI1ZTctNDI1NmQ5MTA0MmZk");

    Hydra.Client.put("/accounts/569eb62c1fd89c3340c233ea", {auth: serverAuth, body:[["inc","server_data.timesAfterDeleteHit",1]]}, function(serverRequest, body) {
        if(serverRequest.statusCode == 200) {
            response.success([]);
        } else {
            response.failure([]);
        }
    })
});
*/
