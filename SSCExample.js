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

//------------------------------------------------------------------------------------------------------------------------------------------

//Profile Events

Hydra.profile.afterCreate(function(request, response){
    Logger.info("After Profile Create Log");
    return {};
})

Hydra.profile.beforeUpdate(function(request, response){
    Logger.info("Before Profile Update Log");
    return {};
})

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
    return {};
})

Hydra.object.afterCreate(function(request, response){
    Logger.info("After Generic Object Create Log");
    return {};
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

//beforeDelete
Hydra.clan.beforeDelete(function(request, response){
    Logger.info("Before Clan Delete Log");
    return {};
})

//afterDelete
Hydra.clan.afterDelete(function(request, response){
    Logger.info("After Clan Delete Log");
    return {};
})

Hydra.clan.beforeCreate(function(request, response){
    Logger.info("Before Clan Create Log");
    return {};
})

Hydra.clan.afterCreate(function(request, response){
    Logger.info("After Clan Create Log");
    return {};
})

Hydra.clan.beforeClanMembersInactive(function(request, response){
    var serverAuth = Hydra.Client.authServer();

    return Hydra.Client.get("/broadcast_channels/ClanMembersInactive/broadcast_messages", {auth: serverAuth})
   .then(function(result) {
      Global.set("onLoad", result.body);
      return true;
   })
})

/*beforeUpdate
afterUpdate*/

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

Hydra.clanMember.beforeDecline(function(request, response){
    Logger.info("Before Clan Member Decline Log");
    return {};
})

Hydra.clanMember.afterDecline(function(request, response){
    Logger.info("After Clan Member Decline Log");
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

//------------------------------------------------------------------------------------------------------------------------------------------

//Clan Member Invitation Events
/*
//beforeInvite
Hydra.clanMemberInvitation.beforeInvite(function(request, response){
    Logger.info("Before Clan Member Invite Log");
    return {};
})

//afterInvite
Hydra.clanMemberInvitation.afterInvite(function(request, response){
    Logger.info("After Clan Member Invite Log");
    return {};
})

//beforeApply
Hydra.clanMemberInvitation.beforeApply(function(request, response){
    Logger.info("Before Clan Member Apply Log");
    return {};
})

//afterApply
Hydra.clanMemberInvitation.afterApply(function(request, response){
    Logger.info("After Clan Member Apply Log");
    return {};
})

//beforeApprove
Hydra.clanMemberInvitation.beforeApprove(function(request, response){
    Logger.info("Before Clan Member Approve Log");
    return {};
})

//afterApprove
Hydra.clanMemberInvitation.afterApprove(function(request, response){
    Logger.info("After Clan Member Approve Log");
    return {};
})

//beforeDeny
Hydra.clanMemberInvitation.beforeDeny(function(request, response){
    Logger.info("Before Clan Member Deny Log");
    return {};
})

//afterDeny
Hydra.clanMemberInvitation.afterDeny(function(request, response){
    Logger.info("After Clan Member Deny Log");
    return {};
})

//beforeAccept
Hydra.clanMemberInvitation.beforeAccept(function(request, response){
    Logger.info("Before Clan Member Accept Log");
    return {};
})

//afterAccept
Hydra.clanMemberInvitation.afterAccept(function(request, response){
    Logger.info("After Clan Member Accept Log");
    return {};
})

//beforeReject
Hydra.clanMemberInvitation.beforeReject(function(request, response){
    Logger.info("Before Clan Member Reject Log");
    return {};
})

//afterReject
Hydra.clanMemberInvitation.afterReject(function(request, response){
    Logger.info("After Clan Member Reject Log");
    return {};
}) */

//------------------------------------------------------------------------------------------------------------------------------------------

//Lobby Events
/*beforeCreate
afterCreate
beforeUpdate
afterUpdate
beforeDelete
afterDelete*/

//------------------------------------------------------------------------------------------------------------------------------------------

//Matchmaking Request Events
/*beforeCreate
afterCreate
beforeCancel
afterCancel*/

//------------------------------------------------------------------------------------------------------------------------------------------

//Matchmaking Result Events
/*beforeCreate
afterCreate*/

//------------------------------------------------------------------------------------------------------------------------------------------

//UGC Item Events
/*beforeCreate
afterCreate
beforeUpdate
afterUpdate
beforeShare
afterShare
beforeUnshare
afterUnshare
beforePublish
afterPublish
beforeUnpublish
afterUnpublish
beforeDelete
afterDelete*/

//------------------------------------------------------------------------------------------------------------------------------------------

//UGC Version Events
/*beforeCreate
afterCreate
beforeFileCreate
afterFileCreate
beforeFileUpdate
afterFileUpdate
beforeFileDelete
afterFileDelete*/

//------------------------------------------------------------------------------------------------------------------------------------------

//Purchase Events
/*beforeCreate
afterFinalize
afterCancel*/

//------------------------------------------------------------------------------------------------------------------------------------------

//Inventory Events
/*beforeUpdate
afterUpdate*/

//------------------------------------------------------------------------------------------------------------------------------------------

//Notification Events
/*beforeConsume
afterConsume*/

//------------------------------------------------------------------------------------------------------------------------------------------

//Custom Endpoints

//Custom Ping/Pong endpoint
Hydra.get('custom_ping', function(request, response) {
    response.success({"ret":"custom_pong"});
    //return {"ret":"custom_pong"};
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

Hydra.get('query_param_use', function(request) {
    var speedy_return_value = request.userRequest.queryparams.TestInput;
    return D.resolved(speedy_return_value);
});

//------------------------------------------------------------------------------------------------------------------------------------------

//Before Profile Update 
/*Hydra.profile.beforeUpdate(function(request, response) {
    response.success([['inc', 'server_data.times_profile_updated', 1]]);
});*/




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
//Generic Object Service Hooks

//Before Generic Object creation 
Hydra.object.beforeCreate(function(request, response) {
  response.success([['set', 'server_data.beforeCreateHookHit', "true"]]);
});

//After Generic Object creation 
Hydra.object.afterCreate(function(request, response) {
  response.success([['set', 'server_data.afterCreateHookHit', "true"]]);
});

//Before Generic Object Update 
Hydra.object.beforeUpdate(function(request, response) {
  response.success([['inc', 'data.timesBeforeUpdateHit', 1]]);
});

//After Generic Object Update 
Hydra.object.afterUpdate(function(request, response) {
  response.success([['inc', 'data.timesAfterUpdateHit', 1]]);
});

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

//Test custom logger stuff
Logger.level = Logger.WARNING;

Hydra.get('custom_log', function(request, response) {
    Logger.error("error message");
    response.success({})
});

Hydra.get('custom_log_global_levels', function(request, response) {
    Logger.info("info message");
    Logger.warning("warning message");
    Logger.error("error message");
    response.success({})
});

Hydra.get('custom_log_local_levels', function(request, response) {
    Logger.level = Logger.INFO;

    Logger.info("info message");
    Logger.warning("warning message");
    Logger.error("error message");
    response.success({})
});*/
