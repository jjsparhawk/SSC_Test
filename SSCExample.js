//Set Logger Level to INFO
Logger.level = Logger.INFO;
//------------------------------------------------------------------------------------------------------------------------------------------

//OnLoad event

Hydra.onLoad(function(response) {
    //return true;
    var serverAuth = Hydra.Client.authServer();

    return Hydra.Client.get("/broadcast_channels/test/OnLoadWasJustHit", {auth: serverAuth})
    .then(function(result) {
      Global.set("onLoad", result.body);
      return true;

      //To test onLoad automatic re-try loop:
      //response.failure({})
    })
})

/*
    This function retreives a list of the log objects (there should only be 1)
    It then updates the specified data field to true, confirming the hook was hit
*/
function updateLogObject(dataFieldToUpdate){
    var serverAuth = Hydra.Client.authServer();
    return Hydra.Client.get("/objects/log-object/list", {auth: serverAuth})
        .then(function (myReq){
            var loggerObjectList = myReq.body;
            Logger.info("Logger Object List: " + loggerObjectList.objects)
            if(loggerObjectList.objects.length > 0 && loggerObjectList.objects.length < 2){
                Logger.info("loopB");
                var objectToUpdate = "/objects/log-object/" + loggerObjectList.objects[0].id;
                return Hydra.Client.put(objectToUpdate, {auth: serverAuth, body: [["inc", dataFieldToUpdate, 1]]})
                        .then(function (reqResp){
                            Logger.info("reqResp Status Code: " + reqResp.response.statusCode);
                            if(reqResp.response.statusCode == 200) {
                                return D.resolved();
                            } else {
                                return D.rejected();
                            }
                        })
            }
            else {
                Logger.info("Number of Logging Objects: " + loggerObjectList.objects.length);
                return D.rejected();
            }
        })
}

function setLogObjectData(dataFromTest){
    var serverAuth = Hydra.Client.authServer();
    var loggerObjectJSON = Hydra.Client.get("/objects/log-object/list", {auth: serverAuth}, function(serverRequest, body){
        var loggerObjectList = body;

        if(loggerObjectList.objects.length > 0 && loggerObjectList.objects.length < 2){
            var objectToUpdate = "/objects/log-object/" + loggerObjectList.objects[0].id;
            Hydra.Client.put(objectToUpdate, {auth: serverAuth, body: [["set", "data.dataFromTest", dataFromTest]]}, function(serverRequest2, body2){
                if(serverRequest2.statusCode == 200){
                    response.success({});
                } else{
                    response.failure({});
                }
            });
        }
        else{
            response.failure({});
        }
    });
}

//------------------------------------------------------------------------------------------------------------------------------------------

//Account Events

//beforeCreate (with invalid return type)
Hydra.account.beforeCreate(function(request, response){
    Logger.info("Before Account Create Log");
    return{};
    
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
Hydra.profile.beforeUpdate(function(request, response){
    Logger.info("Before Profile Update Log");
    return response.success([['inc', 'server_data.timesBeforeProfileUpdateHit', 1], ['set', 'data.testingCompressedInSSCHook', new Hydra.Types.Compressed("Compress This Data Yo.")]]);;
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
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.BeforeMatchCreateHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.match.afterCreate(function(request, response){
    Logger.info("After Match Create Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.AfterMatchCreateHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.match.beforeUpdate(function(request, response){
    Logger.info("Before Match Update Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.BeforeMatchUpdateHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.match.afterUpdate(function(request, response){
    Logger.info("After Match Update Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.AfterMatchUpdateHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.match.beforeJoin(function(request, response){
    Logger.info("Before Match Join Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.BeforeMatchJoinHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.match.afterJoin(function(request, response){
    Logger.info("After Match Join Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.AfterMatchJoinHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.match.beforeLeave(function(request, response){
    Logger.info("Before Match Leave Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.BeforeMatchLeaveHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.match.afterLeave(function(request, response){
    Logger.info("After Match Leave Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.AfterMatchLeaveHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.match.beforeComplete(function(request, response){
    Logger.info("Before Match Complete Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.BeforeMatchCompleteHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.match.afterComplete(function(request, response){
    Logger.info("After Match Complete Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.AfterMatchCompleteHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.match.beforeKick(function(request, response){
    Logger.info("Before Match Kick Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.BeforeMatchKickHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.match.afterKick(function(request, response){
    Logger.info("After Match Kick Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.AfterMatchKickHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.match.beforeInvite(function(request, response){
    Logger.info("Before Match Invite Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.BeforeMatchInviteHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.match.afterInvite(function(request, response){
    Logger.info("After Match Invite Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.AfterMatchInviteHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.match.beforeFluidCreate(function(request, response){
    Logger.info("Before Fluid Match Create Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.BeforeFluidMatchCreateHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.match.afterFluidCreate(function(request, response){
    Logger.info("After Fluid Match Create Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.AfterFluidMatchCreateHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.match.beforeFixedCreate(function(request, response){
    Logger.info("Before Fixed Match Create Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.BeforeFixedMatchCreateHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.match.afterFixedCreate(function(request, response){
    Logger.info("After Fixed Match Create Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.AfterFixedMatchCreateHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

//------------------------------------------------------------------------------------------------------------------------------------------

//Generic Object Events

Hydra.object.beforeCreate(function(request, response){
    Logger.info("Before Generic Object Create Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.BeforeObjectCreateHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.object.afterCreate(function(request, response){
    Logger.info("After Generic Object Create Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.AfterObjectCreateHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.object.beforeUpdate(function(request, response){
    Logger.info("Before Generic Object Update Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.BeforeObjectUpdateHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.object.afterUpdate(function(request, response){
    Logger.info("After Generic Object Update Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.AfterObjectUpdateHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.object.beforeDelete(function(request, response){
    Logger.info("Before Generic Object Delete Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        updateLogObject("data.NumTimesBeforeObjectDeleteHit");
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.object.afterDelete(function(request, response){
    Logger.info("After Generic Object Delete Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        updateLogObject("data.NumTimesAfterObjectDeleteHit");
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

//------------------------------------------------------------------------------------------------------------------------------------------

//Clan Events

Hydra.clan.beforeCreate(function(request, response){
    Logger.info("Before Clan Create Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.BeforeClanCreateHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.clan.afterCreate(function(request, response){
    Logger.info("After Clan Create Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.AfterClanCreateHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.clan.beforeUpdate(function(request, response){
    Logger.info("Before Clan Update Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.BeforeClanUpdateHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.clan.afterUpdate(function(request, response){
    Logger.info("After Clan Update Log");
    var serverAuth = Hydra.Client.authServer();
    Hydra.Client.put("/profiles/AfterClanUpdateWasJustHit", {auth: serverAuth, body: request});
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.AfterClanUpdateHit", true]]);
    else if(myMap["query-string"] == "TestModelBefore=True")
        setLogObjectData(request);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.clan.beforeDelete(function(request, response){
    Logger.info("Before Clan Delete Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        updateLogObject("data.NumTimesBeforeClanDeleteHit");
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.clan.afterDelete(function(request, response){
    Logger.info("After Clan Delete Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        updateLogObject("data.NumTimesAfterClanDeleteHit");
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
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
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.BeforeClanMemberJoinHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.clanMember.afterJoin(function(request, response){
    Logger.info("After Clan Member Join Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.AfterClanMemberJoinHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.clanMember.beforeUpdate(function(request, response){
    Logger.info("Before Clan Member Update Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.BeforeClanMemberUpdateHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.clanMember.afterUpdate(function(request, response){
    Logger.info("After Clan Member Update Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.AfterClanMemberUpdateHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.clanMember.beforeLeave(function(request, response){
    Logger.info("Before Clan Member Leave Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.BeforeClanMemberLeaveHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.clanMember.afterLeave(function(request, response){
    Logger.info("After Clan Member Leave Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestAfterHook=True")
        response.success([["set", "data.AfterClanMemberLeaveHit", true]]);
    else if(myMap["query-string"] == "TestAfterHook=False")
        return {};
    else
        return {};
})

Hydra.clanMember.beforeKick(function(request, response){
    Logger.info("Before Clan Member Kick Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.BeforeClanMemberKickHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.clanMember.afterKick(function(request, response){
    Logger.info("After Clan Member Kick Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestAfterHook=True")
        response.success([["set", "data.AfterClanMemberKickHit", true]]);
    else if(myMap["query-string"] == "TestAfterHook=False")
        return {};
    else
        return {};
})

Hydra.clanMember.beforeRoleUpdate(function(request, response){
    Logger.info("Before Clan Member Role Update Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.BeforeClanMemberRoleUpdateHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.clanMember.afterRoleUpdate(function(request, response){
    Logger.info("After Clan Member Role Update Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.AfterClanMemberRoleUpdateHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.clanMember.beforeInvite(function(request, response){
    Logger.info("Before Clan Member Invite Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.BeforeClanMemberInviteHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.clanMember.afterInvite(function(request, response){
    Logger.info("After Clan Member Invite Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.AfterClanMemberInviteHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.clanMember.beforeApply(function(request, response){
    Logger.info("Before Clan Member Apply Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.BeforeClanMemberApplyHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.clanMember.afterApply(function(request, response){
    Logger.info("After Clan Member Apply Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.AfterClanMemberApplyHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.clanMember.beforeApprove(function(request, response){
    Logger.info("Before Clan Member Approve Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.BeforeClanMemberApproveHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.clanMember.afterApprove(function(request, response){
    Logger.info("After Clan Member Approve Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.AfterClanMemberApproveHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.clanMember.beforeReject(function(request, response){
    Logger.info("Before Clan Member Reject Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.BeforeClanMemberRejectHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.clanMember.afterReject(function(request, response){
    Logger.info("After Clan Member Reject Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.AfterClanMemberRejectHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.clanMember.beforeDecline(function(request, response){
    Logger.info("Before Clan Member Decline Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.BeforeClanMemberDeclineHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.clanMember.afterDecline(function(request, response){
    Logger.info("After Clan Member Decline Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.AfterClanMemberDeclineHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

//------------------------------------------------------------------------------------------------------------------------------------------

//Lobby Events

Hydra.lobby.beforeCreate(function(request, response){
    Logger.info("Before Lobby Create Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.BeforeLobbyCreateHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.lobby.afterCreate(function(request, response){
    Logger.info("After Lobby Create Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.AfterLobbyCreateHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.lobby.beforeUpdate(function(request, response){
    Logger.info("Before Lobby Update Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.BeforeLobbyUpdateHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.lobby.afterUpdate(function(request, response){
    Logger.info("After Lobby Update Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.AfterLobbyUpdateHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.lobby.beforeDelete(function(request, response){
    Logger.info("Before Lobby Delete Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return {updateLogObject("data.NumTimesBeforeLobbyDeleteHit");}
    return D.resolved();
})

Hydra.lobby.afterDelete(function(request, response){
    Logger.info("After Lobby Delete Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        updateLogObject("data.NumTimesAfterLobbyDeleteHit");
    return D.resolved();
})

//------------------------------------------------------------------------------------------------------------------------------------------

//Matchmaking Request Events

Hydra.matchMakingRequest.beforeCreate(function(request, response){
    Logger.info("Before Matchmaking Request Create Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.BeforeMatchmakingRequestCreateHit", true]])
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.matchMakingRequest.afterCreate(function(request, response){
    Logger.info("After Matchmaking Request Create Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.AfterMatchmakingRequestCreateHit", true]])
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.matchMakingRequest.beforeCancel(function(request, response){
    Logger.info("Before Matchmaking Cancel Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        updateLogObject("data.NumTimesBeforeMatchmakingRequestCancelHit");
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.matchMakingRequest.afterCancel(function(request, response){
    Logger.info("After Matchmaking Request Cancel Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        updateLogObject("data.NumTimesAfterMatchmakingRequestCancelHit");
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
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
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.BeforeUserContentItemCreateHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.userContentItem.afterCreate(function(request, response){
    Logger.info("After User Content Item Create Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.AfterUserContentItemCreateHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.userContentItem.beforeUpdate(function(request, response){
    Logger.info("Before UGC Item Update Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.BeforeUserContentItemUpdateHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.userContentItem.afterUpdate(function(request, response){
    Logger.info("After User Content Item Update Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.AfterUserContentItemUpdateHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.userContentItem.beforeShare(function(request, response){
    Logger.info("Before UGC Item Share Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.BeforeUserContentItemShareHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.userContentItem.afterShare(function(request, response){
    Logger.info("After User Content Item Share Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.AfterUserContentItemShareHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.userContentItem.beforeUnshare(function(request, response){
    Logger.info("Before UGC Item Unshare Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.BeforeUserContentItemUnshareHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.userContentItem.afterUnshare(function(request, response){
    Logger.info("After User Content Item Unshare Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.AfterUserContentItemUnshareHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.userContentItem.beforePublish(function(request, response){
    Logger.info("Before UGC Item Publish Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.BeforeUserContentItemPublishHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.userContentItem.afterPublish(function(request, response){
    Logger.info("After User Content Item Publish Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.AfterUserContentItemPublishHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.userContentItem.beforeUnpublish(function(request, response){
    Logger.info("Before UGC Item Unpublish Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.BeforeUserContentItemUnpublishHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.userContentItem.afterUnpublish(function(request, response){
    Logger.info("After User Content Item Unpublish Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.AfterUserContentItemUnpublishHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.userContentItem.beforeDelete(function(request, response){
    Logger.info("Before UGC Item Delete Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        updateLogObject("data.NumTimesBeforeUserContentItemDeleteHit");
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.userContentItem.afterDelete(function(request, response){
    Logger.info("After User Content Item Delete Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        updateLogObject("data.NumTimesAfterUserContentItemDeleteHit");
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

//------------------------------------------------------------------------------------------------------------------------------------------

//UGC Version Events

Hydra.userContentVersion.beforeCreate(function(request, response){
    Logger.info("Before UGC Version Create Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.BeforeUserContentVersionCreateHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.userContentVersion.afterCreate(function(request, response){
    Logger.info("After User Content Version Create Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.AfterUserContentVersionCreateHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.userContentVersion.beforeFileCreate(function(request, response){
    Logger.info("Before UGC Version File Create Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.BeforeUserContentVersionFileCreateHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.userContentVersion.afterFileCreate(function(request, response){
    Logger.info("After User Content Version File Create Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.AfterUserContentVersionFileCreateHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.userContentVersion.beforeFileUpdate(function(request, response){
    Logger.info("Before UGC Version File Update Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.BeforeUserContentVersionFileUpdateHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.userContentVersion.afterFileUpdate(function(request, response){
    Logger.info("After User Content Version File Update Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.AfterUserContentVersionFileUpdateHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.userContentVersion.beforeFileDelete(function(request, response){
    Logger.info("Before UGC Version File Delete Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.BeforeUserContentVersionFileDeleteHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.userContentVersion.afterFileDelete(function(request, response){
    Logger.info("After User Content Version File Delete Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        response.success([["set", "data.AfterUserContentVersionFileDeleteHit", true]]);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

//------------------------------------------------------------------------------------------------------------------------------------------

//Purchase Events

Hydra.purchase.beforeCreate(function(request, response){
    Logger.info("Before Purchase Create Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        updateLogObject("data.BeforePurchaseCreateHit");
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.purchase.afterFinalize(function(request, response){
    Logger.info("After Purchase Finalize Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        updateLogObject("data.AfterPurchaseFinalizeHit");
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

Hydra.purchase.afterCancel(function(request, response){
    Logger.info("After Purchase Cancel Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        updateLogObject("data.AfterPurchaseCancelHit");
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})

//------------------------------------------------------------------------------------------------------------------------------------------

//Inventory Events

Hydra.inventory.beforeUpdate(function(request, response){
    Logger.info("Before Inventory Update Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        updateLogObject("data.NumTimesBeforeInventoryUpdateHit");
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
        return {};
})
// Will probably need to use log object for these endpoints
Hydra.inventory.afterUpdate(function(request, response){
    Logger.info("After Inventory Update Log");
    var serverAuth = Hydra.Client.authServer();
    Hydra.Client.put("/profiles/AfterInventoryUpdateWasJustHit", {auth: serverAuth, body: request});
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        updateLogObject("data.NumTimesAfterInventoryUpdateHit");
    else if(myMap["query-string"] == "TestModelBefore=True")
        setLogObjectData(request);
    else if(myMap["query-string"] == "TestThisHook=False")
        return {};
    else
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









