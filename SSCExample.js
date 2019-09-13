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
        });
}

function setLogObjectData(dataFromTest){
    var serverAuth = Hydra.Client.authServer();
    return Hydra.Client.get("/objects/log-object/list", {auth: serverAuth})
        .then(function(myReq){
            var loggerObjectList = myReq.body;

            if(loggerObjectList.objects.length > 0 && loggerObjectList.objects.length < 2){
                var objectToUpdate = "/objects/log-object/" + loggerObjectList.objects[0].id;
                return Hydra.Client.put(objectToUpdate, {auth: serverAuth, body: [["set", "data.dataFromTest", dataFromTest]]})
                    .then(function(serverReq){
                        if(serverReq.response.statusCode == 200){
                            return D.resolved();
                        } else{
                            return D.rejected();
                        }
                    })
            }
            else{
                return D.rejected();
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
    return [['inc', 'server_data.timesWentOnline', 1]];
})

Hydra.account.afterOffline(function(request, response){
    return [['inc', 'server_data.timesWentOffline', 1]];
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
    return [['inc', 'server_data.timesBeforeProfileUpdateHit', 1], ['set', 'data.testingCompressedInSSCHook', new Hydra.Types.Compressed("Compress This Data Yo.")]];;
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
        return [["set", "data.BeforeMatchCreateHit", true]];
    return {};
})

Hydra.match.afterCreate(function(request, response){
    Logger.info("After Match Create Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.AfterMatchCreateHit", true]];
    return {};
})

Hydra.match.beforeUpdate(function(request, response){
    Logger.info("Before Match Update Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.BeforeMatchUpdateHit", true]];
    return {};
})

Hydra.match.afterUpdate(function(request, response){
    Logger.info("After Match Update Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.AfterMatchUpdateHit", true]];
    return {};
})

Hydra.match.beforeJoin(function(request, response){
    Logger.info("Before Match Join Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.BeforeMatchJoinHit", true]];
    return {};
})

Hydra.match.afterJoin(function(request, response){
    Logger.info("After Match Join Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.AfterMatchJoinHit", true]];
    return {};
})

Hydra.match.beforeLeave(function(request, response){
    Logger.info("Before Match Leave Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.BeforeMatchLeaveHit", true]];
    return {};
})

Hydra.match.afterLeave(function(request, response){
    Logger.info("After Match Leave Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.AfterMatchLeaveHit", true]];
    return {};
})

Hydra.match.beforeComplete(function(request, response){
    Logger.info("Before Match Complete Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.BeforeMatchCompleteHit", true]];
    return {};
})

Hydra.match.afterComplete(function(request, response){
    Logger.info("After Match Complete Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.AfterMatchCompleteHit", true]];
    return {};
})

Hydra.match.beforeKick(function(request, response){
    Logger.info("Before Match Kick Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.BeforeMatchKickHit", true]];
    return {};
})

Hydra.match.afterKick(function(request, response){
    Logger.info("After Match Kick Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.AfterMatchKickHit", true]];
    return {};
})

Hydra.match.beforeInvite(function(request, response){
    Logger.info("Before Match Invite Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.BeforeMatchInviteHit", true]];
    return {};
})

Hydra.match.afterInvite(function(request, response){
    Logger.info("After Match Invite Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.AfterMatchInviteHit", true]];
    return {};
})

Hydra.match.beforeFluidCreate(function(request, response){
    Logger.info("Before Fluid Match Create Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.BeforeFluidMatchCreateHit", true]];
    return {};
})

Hydra.match.afterFluidCreate(function(request, response){
    Logger.info("After Fluid Match Create Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.AfterFluidMatchCreateHit", true]];
    return {};
})

Hydra.match.beforeFixedCreate(function(request, response){
    Logger.info("Before Fixed Match Create Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.BeforeFixedMatchCreateHit", true]];
    return {};
})

Hydra.match.afterFixedCreate(function(request, response){
    Logger.info("After Fixed Match Create Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.AfterFixedMatchCreateHit", true]];
    return {};
})

Hydra.match.doArbitration(function(request, response){
    Logger.info("Arbitration hook logger test");
    return {"win":[], "loss":[], "draw":bool(true)};
})

//------------------------------------------------------------------------------------------------------------------------------------------

//Generic Object Events

Hydra.object.beforeCreate(function(request, response){
    Logger.info("Before Generic Object Create Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.BeforeObjectCreateHit", true]];
    return {};
})

Hydra.object.afterCreate(function(request, response){
    Logger.info("After Generic Object Create Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.AfterObjectCreateHit", true]];
    return {};
})

Hydra.object.beforeUpdate(function(request, response){
    Logger.info("Before Generic Object Update Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.BeforeObjectUpdateHit", true]];
    return {};
})

Hydra.object.afterUpdate(function(request, response){
    Logger.info("After Generic Object Update Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.AfterObjectUpdateHit", true]];
    return {};
})

Hydra.object.beforeDelete(function(request, response){
    Logger.info("Before Generic Object Delete Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        updateLogObject("data.NumTimesBeforeObjectDeleteHit");
        return D.resolved({});
    return D.resolved({});
})

Hydra.object.afterDelete(function(request, response){
    Logger.info("After Generic Object Delete Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        updateLogObject("data.NumTimesAfterObjectDeleteHit");
        return D.resolved({});
    return D.resolved({});
})

//------------------------------------------------------------------------------------------------------------------------------------------

//Clan Events

Hydra.clan.beforeCreate(function(request, response){
    Logger.info("Before Clan Create Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.BeforeClanCreateHit", true]];
    return {};
})

Hydra.clan.afterCreate(function(request, response){
    Logger.info("After Clan Create Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.AfterClanCreateHit", true]];
    return {};
})

Hydra.clan.beforeUpdate(function(request, response){
    Logger.info("Before Clan Update Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.BeforeClanUpdateHit", true]];
    return {};
})

Hydra.clan.afterUpdate(function(request, response){
    Logger.info("After Clan Update Log");
    var serverAuth = Hydra.Client.authServer();
    Hydra.Client.put("/profiles/AfterClanUpdateWasJustHit", {auth: serverAuth, body: request});
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.AfterClanUpdateHit", true]];
    else if(myMap["query-string"] == "TestModelBefore=True")
        setLogObjectData(request);
    return {};
})

Hydra.clan.beforeDelete(function(request, response){
    Logger.info("Before Clan Delete Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        updateLogObject("data.NumTimesBeforeClanDeleteHit");
        return D.resolved({});
    return D.resolved({});
})

Hydra.clan.afterDelete(function(request, response){
    Logger.info("After Clan Delete Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        updateLogObject("data.NumTimesAfterClanDeleteHit");
        return D.resolved({});
    return D.resolved({});
})

Hydra.clan.beforeClanMembersIdle(function(request, response){
    var serverAuth = Hydra.Client.authServer();
    Logger.info("Clan Member Going Idle");

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
        return [["set", "data.BeforeClanMemberJoinHit", true]];
    return {};
})

Hydra.clanMember.afterJoin(function(request, response){
    Logger.info("After Clan Member Join Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.AfterClanMemberJoinHit", true]];
    return {};
})

Hydra.clanMember.beforeUpdate(function(request, response){
    Logger.info("Before Clan Member Update Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.BeforeClanMemberUpdateHit", true]];
    return {};
})

Hydra.clanMember.afterUpdate(function(request, response){
    Logger.info("After Clan Member Update Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.AfterClanMemberUpdateHit", true]];
    return {};
})

Hydra.clanMember.beforeLeave(function(request, response){
    Logger.info("Before Clan Member Leave Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.BeforeClanMemberLeaveHit", true]];
    return {};
})

Hydra.clanMember.afterLeave(function(request, response){
    Logger.info("After Clan Member Leave Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestAfterHook=True")
        return [["set", "data.AfterClanMemberLeaveHit", true]];
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
        return [["set", "data.BeforeClanMemberKickHit", true]];
    return {};
})

Hydra.clanMember.afterKick(function(request, response){
    Logger.info("After Clan Member Kick Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestAfterHook=True")
        return [["set", "data.AfterClanMemberKickHit", true]];
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
        return [["set", "data.BeforeClanMemberRoleUpdateHit", true]];
    return {};
})

Hydra.clanMember.afterRoleUpdate(function(request, response){
    Logger.info("After Clan Member Role Update Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.AfterClanMemberRoleUpdateHit", true]];
    return {};
})

Hydra.clanMember.beforeInvite(function(request, response){
    Logger.info("Before Clan Member Invite Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.BeforeClanMemberInviteHit", true]];
    return {};
})

Hydra.clanMember.afterInvite(function(request, response){
    Logger.info("After Clan Member Invite Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.AfterClanMemberInviteHit", true]];
    return {};
})

Hydra.clanMember.beforeApply(function(request, response){
    Logger.info("Before Clan Member Apply Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.BeforeClanMemberApplyHit", true]];
    return {};
})

Hydra.clanMember.afterApply(function(request, response){
    Logger.info("After Clan Member Apply Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.AfterClanMemberApplyHit", true]];
    return {};
})

Hydra.clanMember.beforeApprove(function(request, response){
    Logger.info("Before Clan Member Approve Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.BeforeClanMemberApproveHit", true]];
    return {};
})

Hydra.clanMember.afterApprove(function(request, response){
    Logger.info("After Clan Member Approve Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.AfterClanMemberApproveHit", true]];
    return {};
})

Hydra.clanMember.beforeReject(function(request, response){
    Logger.info("Before Clan Member Reject Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.BeforeClanMemberRejectHit", true]];
    return {};
})

Hydra.clanMember.afterReject(function(request, response){
    Logger.info("After Clan Member Reject Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.AfterClanMemberRejectHit", true]];
    return {};
})

Hydra.clanMember.beforeDecline(function(request, response){
    Logger.info("Before Clan Member Decline Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.BeforeClanMemberDeclineHit", true]];
    return {};
})

Hydra.clanMember.afterDecline(function(request, response){
    Logger.info("After Clan Member Decline Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.AfterClanMemberDeclineHit", true]];
    return {};
})

//------------------------------------------------------------------------------------------------------------------------------------------

//Lobby Events

Hydra.lobby.beforeCreate(function(request, response){
    Logger.info("Before Lobby Create Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.BeforeLobbyCreateHit", true]];
    return {};
})

Hydra.lobby.afterCreate(function(request, response){
    Logger.info("After Lobby Create Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.AfterLobbyCreateHit", true]];
    return {};
})

Hydra.lobby.beforeUpdate(function(request, response){
    Logger.info("Before Lobby Update Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.BeforeLobbyUpdateHit", true]];
    return {};
})

Hydra.lobby.afterUpdate(function(request, response){
    Logger.info("After Lobby Update Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.AfterLobbyUpdateHit", true]];
    return {};
})

Hydra.lobby.beforeDelete(function(request, response){
    Logger.info("Before Lobby Delete Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        updateLogObject("data.NumTimesBeforeLobbyDeleteHit");
        return D.resolved({});
    return D.resolved({});
})

Hydra.lobby.afterDelete(function(request, response){
    Logger.info("After Lobby Delete Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        updateLogObject("data.NumTimesAfterLobbyDeleteHit");
        return D.resolved({});
    return D.resolved({});
})

//------------------------------------------------------------------------------------------------------------------------------------------

//Matchmaking Request Events

Hydra.matchMakingRequest.beforeCreate(function(request, response){
    Logger.info("Before Matchmaking Request Create Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.BeforeMatchmakingRequestCreateHit", true]]
    return {};
})

Hydra.matchMakingRequest.afterCreate(function(request, response){
    Logger.info("After Matchmaking Request Create Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.AfterMatchmakingRequestCreateHit", true]]
    return {};
})

Hydra.matchMakingRequest.beforeCancel(function(request, response){
    Logger.info("Before Matchmaking Cancel Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        updateLogObject("data.NumTimesBeforeMatchmakingRequestCancelHit");
    return {};
})

Hydra.matchMakingRequest.afterCancel(function(request, response){
    Logger.info("After Matchmaking Request Cancel Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        updateLogObject("data.NumTimesAfterMatchmakingRequestCancelHit");
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
        return [["set", "data.BeforeUserContentItemCreateHit", true]];
    return {};
})

Hydra.userContentItem.afterCreate(function(request, response){
    Logger.info("After User Content Item Create Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.AfterUserContentItemCreateHit", true]];
    return {};
})

Hydra.userContentItem.beforeUpdate(function(request, response){
    Logger.info("Before UGC Item Update Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.BeforeUserContentItemUpdateHit", true]];
    return {};
})

Hydra.userContentItem.afterUpdate(function(request, response){
    Logger.info("After User Content Item Update Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.AfterUserContentItemUpdateHit", true]];
    return {};
})

Hydra.userContentItem.beforeShare(function(request, response){
    Logger.info("Before UGC Item Share Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.BeforeUserContentItemShareHit", true]];
    return {};
})

Hydra.userContentItem.afterShare(function(request, response){
    Logger.info("After User Content Item Share Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.AfterUserContentItemShareHit", true]];
    return {};
})

Hydra.userContentItem.beforeUnshare(function(request, response){
    Logger.info("Before UGC Item Unshare Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.BeforeUserContentItemUnshareHit", true]];
    return {};
})

Hydra.userContentItem.afterUnshare(function(request, response){
    Logger.info("After User Content Item Unshare Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.AfterUserContentItemUnshareHit", true]];
    return {};
})

Hydra.userContentItem.beforePublish(function(request, response){
    Logger.info("Before UGC Item Publish Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.BeforeUserContentItemPublishHit", true]];
    return {};
})

Hydra.userContentItem.afterPublish(function(request, response){
    Logger.info("After User Content Item Publish Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.AfterUserContentItemPublishHit", true]];
    return {};
})

Hydra.userContentItem.beforeUnpublish(function(request, response){
    Logger.info("Before UGC Item Unpublish Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.BeforeUserContentItemUnpublishHit", true]];
    return {};
})

Hydra.userContentItem.afterUnpublish(function(request, response){
    Logger.info("After User Content Item Unpublish Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.AfterUserContentItemUnpublishHit", true]];
    return {};
})

Hydra.userContentItem.beforeDelete(function(request, response){
    Logger.info("Before UGC Item Delete Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        updateLogObject("data.NumTimesBeforeUserContentItemDeleteHit");
        return D.resolved({});
    return D.resolved({});
})

Hydra.userContentItem.afterDelete(function(request, response){
    Logger.info("After User Content Item Delete Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        updateLogObject("data.NumTimesAfterUserContentItemDeleteHit");
        return D.resolved({});
    return D.resolved({});
})

//------------------------------------------------------------------------------------------------------------------------------------------

//UGC Version Events

Hydra.userContentVersion.beforeCreate(function(request, response){
    Logger.info("Before UGC Version Create Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.BeforeUserContentVersionCreateHit", true]];
    return {};
})

Hydra.userContentVersion.afterCreate(function(request, response){
    Logger.info("After User Content Version Create Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.AfterUserContentVersionCreateHit", true]];
    return {};
})

Hydra.userContentVersion.beforeFileCreate(function(request, response){
    Logger.info("Before UGC Version File Create Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.BeforeUserContentVersionFileCreateHit", true]];
    return {};
})

Hydra.userContentVersion.afterFileCreate(function(request, response){
    Logger.info("After User Content Version File Create Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.AfterUserContentVersionFileCreateHit", true]];
    return {};
})

Hydra.userContentVersion.beforeFileUpdate(function(request, response){
    Logger.info("Before UGC Version File Update Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.BeforeUserContentVersionFileUpdateHit", true]];
    return {};
})

Hydra.userContentVersion.afterFileUpdate(function(request, response){
    Logger.info("After User Content Version File Update Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.AfterUserContentVersionFileUpdateHit", true]];
    return {};
})

Hydra.userContentVersion.beforeFileDelete(function(request, response){
    Logger.info("Before UGC Version File Delete Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.BeforeUserContentVersionFileDeleteHit", true]];
    return {};
})

Hydra.userContentVersion.afterFileDelete(function(request, response){
    Logger.info("After User Content Version File Delete Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.AfterUserContentVersionFileDeleteHit", true]];
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
        return D.resolved({});
    return D.resolved({});
})

Hydra.purchase.afterFinalize(function(request, response){
    Logger.info("After Purchase Finalize Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        updateLogObject("data.AfterPurchaseFinalizeHit");
        return D.resolved({});
    return D.resolved({});
})

Hydra.purchase.afterCancel(function(request, response){
    Logger.info("After Purchase Cancel Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        updateLogObject("data.AfterPurchaseCancelHit");
        return D.resolved({});
    return D.resolved({});
})

//------------------------------------------------------------------------------------------------------------------------------------------

//Inventory Events

Hydra.inventory.beforeUpdate(function(request, response){
    Logger.info("Before Inventory Update Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        updateLogObject("data.NumTimesBeforeInventoryUpdateHit");
        return D.resolved({});
    return D.resolved({});
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
        return D.resolved({});
    return D.resolved({});
})

//------------------------------------------------------------------------------------------------------------------------------------------

//Inventory Events

Hydra.gameServerInstance.beforeCreate(function(request, response){
    Logger.info("Before Clan Member Update Log");
    var myMap = new Map();
    myMap = request.userRequest.headers;
    if(myMap["query-string"] == "TestThisHook=True")
        return [["set", "data.BeforeGameServerInstanceUpdateHit", true]];
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

//Arena Instance Events

Hydra.arenaInstance.afterRunning(function(request, response){
    var serverAuth = Hydra.Client.authServer();
    var theModel = "Arena Instance After Running Model: " + JSON.stringify(request.model);

    return Hydra.Client.put("/ssc/invoke/thisEndpointWillFail_AfterRunning", {auth: serverAuth, body: theModel})
    .then(function(result) {
      return true;
    })
})

Hydra.arenaInstance.afterComplete(function(request, response){
    var serverAuth = Hydra.Client.authServer();
    var theModel = "Arena Instance After Complete Model: " + JSON.stringify(request.model);

    return Hydra.Client.put("/ssc/invoke/thisEndpointWillFail_Aftercomplete", {auth: serverAuth, body: theModel})
    .then(function(result) {
      return true;
    })
})

Hydra.arenaInstance.afterError(function(request, response){
    var serverAuth = Hydra.Client.authServer();
    var theModel = "Arena Instance After Error Model: " + JSON.stringify(request.model);

    return Hydra.Client.put("/ssc/invoke/thisEndpointWillFail_AfterError", {auth: serverAuth, body: theModel})
    .then(function(result) {
      return true;
    })
})

//------------------------------------------------------------------------------------------------------------------------------------------

//Arena Participant Events

Hydra.arenaParticipant.beforeJoin(function(request, response){
    var theModel = request.model;
    Logger.info("Arena Participant Before Join Model: " + JSON.stringify(theModel));
    return {};
})

Hydra.arenaParticipant.afterJoin(function(request, response){
    var theModel = request.model;
    Logger.info("Arena Participant After Join Model: " + JSON.stringify(theModel));
    return {};
})

Hydra.arenaParticipant.beforeUpdate(function(request, response){
    var theModel = request.model;
    Logger.info("Arena Participant Before Update Model: " + JSON.stringify(theModel));
    return {};
})

Hydra.arenaParticipant.afterUpdate(function(request, response){
    var theModel = request.model;
    Logger.info("Arena Participant After Update Model: " + JSON.stringify(theModel));
    return {};
})

//------------------------------------------------------------------------------------------------------------------------------------------

//Arena Group Events

Hydra.arenaGroup.beforeUpdate(function(request, response){
    var theModel = request.model;
    Logger.info("Arena Group Before Update Model: " + JSON.stringify(theModel));
    return {};
})

Hydra.arenaGroup.afterUpdate(function(request, response){
    var theModel = request.model;
    Logger.info("Arena Group After Update Model: " + JSON.stringify(theModel));
    return {};
})

//------------------------------------------------------------------------------------------------------------------------------------------

//Custom Endpoints

//Custom Ping/Pong endpoint
Hydra.get('custom_ping', function(request, response) {
    return D.resolved({"ret":"custom_pong"});
});

//Custom endpoint to print request properties
Hydra.post('printProperties', function(request, response) {
   Logger.info(JSON.stringify(request));
   return (request {"auth"})
});

//Use a 'catch' instead of a 'then'
Hydra.get('custom_promise_catch', function(request, response) {
    return D.rejected("error")
    .then(function(value) {
        return D.rejected("You should never end up here, as we'll always return an error.");
    })
    .catch(function(error) {
        return D.resolved("There was an error.")
    })
});

//Custom Endpoint with Query Parameter Use
Hydra.get('query_param_use', function(request) {
    var speedy_return_value = request.userRequest.queryparams.TestInput;
    return D.resolved(speedy_return_value);
});

//Custom Endpoint with User Request Body Use
Hydra.put('user_request_body_use', function(request) {
    var userRequestBody = request.userRequest.body;
    return D.resolved(userRequestBody);
});

//Custom Endpoint Testing All Logger Levels
Hydra.get('custom_test_all_logger_levels', function(request, response) {
    Logger.level = Logger.INFO;

    Logger.info("Here's the custom info message.");
    Logger.warning("Here's the custom warning message.");
    Logger.error("Here's the custom error message.");
    return D.resolved();
});

//Custom Endpoint that makes subsequent request via client access
Hydra.get('make_request_client_access', function(request, response){
    var thePromise = Hydra.Client.post("/objects/account-owned-non-unique", {});
    return thePromise.then(function(theReq){
        if(theReq.response.statusCode == 201){
            return {body:"Object Created", code:200};
        }else{
            return {body:"Object Creation Failed", code:200};
        }
    })
});

//Attempt an Impossible Update, updating 'me' with Server Access
Hydra.get('impossible_update', function(request, response){
    var serverAuth = Hydra.Client.authServer();

    var thePromise = Hydra.Client.put("/profiles/me", {auth: serverAuth, body:[["set","data.ServerMe","Impossible"]]});
    return thePromise.then(function(theReq){
        if(theReq.response.statusCode == 200) {
            return D.resolved({});
        } else {
            return D.rejected({});
        }
    })

});

//Custom Endpoint that notifies all online players
Hydra.get('notify_online', function(request, response){
    var serverAuth = Hydra.Client.authServer();

    var thePromise = Hydra.Client.put("/profiles/notify", {auth: serverAuth, body:{"target":{"presence_state":"online"}, "notification":{"template":"YoureOnline", "data":{"IntTest":42, "DoubleTest":3.14156926, "DateTimeTest":"2017-04-04T15:07:04+00:00", "StringTest":"HelloWorld"}}}});
    return thePromise.then(function(theReq) {
        if(theReq.response.statusCode == 200) {
            return D.resolved({});
        } else {
            return D.rejected({});
        }
    })
});

//Custom Endpoint that sends a notification to a specific player
Hydra.put('notify_specific', function(request, response){
    var serverAuth = Hydra.Client.authServer();

    var profileToRetrieve = "/profiles/" + request.body['account_id'];

    var thePromise = Hydra.Client.put(profileToRetrieve, {auth: serverAuth, body:{
      "operations": [["set","data.kills",23]],
      "notification": {
        "data": {"IntTest":42, "DoubleTest":3.14156926, "DateTimeTest":"2017-04-04T15:07:04+00:00", "StringTest":"HelloWorld"},
        "template": "Hello"
      },
      "_model_update": true}});
   return thePromise.then(function(theReq) {
        if(theReq.response.statusCode == 200) {
            return D.resolved({});
        } else {
            return D.rejected({});
        }
    })
});

//Create an event chain, to test a list of parent Id's in the Log Viewer
Hydra.get('chain_link_a', function(request, response){
    var serverAuth = Hydra.Client.authServer();

    var thePromise = Hydra.Client.get("/ssc/invoke/chain_link_b", {auth: serverAuth, body:[["set","data.ServerMe","Impossible"]]})
    return thePromise.then(function(theReq) {
        if(theReq.response.statusCode == 200) {
            return D.resolved({});
        } else {
            return D.rejected({});
        }
    })
});

Hydra.get('chain_link_b', function(request, response){
    var serverAuth = Hydra.Client.authServer();

    var thePromise = Hydra.Client.get("/ssc/invoke/chain_link_c", {auth: serverAuth, body:[["set","data.ServerMe","Impossible"]]});
    return thePromise.then(function(theReq) {
        if(theReq.response.statusCode == 200) {
            return D.resolved({});
        } else {
            return D.rejected({});
        }
    })
});

Hydra.get('chain_link_c', function(request, response){
    return D.resolved ({"ret":"Chain_End_Found"});
});



//Promises Custom Endpoint Test
Hydra.get('custom_promises', function(request, response) {
    return D.resolved(123);
});

//Custom Endpoint Without Headers
Hydra.get('custom_get_without_headers', function(request, response) {
    var serverAuth = Hydra.Client.authServer();

    var thePromise = Hydra.Client.get("/profiles/123", {"auth":serverAuth});
    return thePromise.then(function (reqResp){
        return {body:reqResp.response.body, code:200};
    });
});

//Custom endpoint to test Profile Response Body
Hydra.put('custom_test_profile_response_body', function(request) {
    var serverAuth = Hydra.Client.authServer();
    var profileToRetrieve = "/profiles/5d28b36aec1d742434ecbba7";
    return Hydra.Client.get(profileToRetrieve, {"auth":serverAuth})
        .then(function (profile) {
            return D.resolved(profile.response.body);
        });
});

//Custom Endpoint with Custom Header
Hydra.get('custom_get_with_headers', function(request, response) {
    var serverAuth = Hydra.Client.authServer();

    var thePromise = Hydra.Client.get("/profiles/123", {"headers": {"test_header_A": "test_A", "test_header_B": "test_B"}, "auth":serverAuth});
    return thePromise.then(function (reqResp){
        return {body:reqResp.response.body, code:200};
    });
});

//Custom Endpoint with Custom Client Header
Hydra.get('custom_get_with_custom_client_header', function(request, response) {
    var myMap = new Map();
    myMap = request.userRequest.headers;
    Logger.info(myMap["http-kristaps"]);
    return {};
});

//Make Request to 'other' environment
Hydra.get('make_request_on_other_environment', function(request, response) {
    var myMap = new Map();
    myMap = request.userRequest.headers;

    var requestOptions = {
        headers: {
            "X-Hydra-API-Key": myMap["http-otherenvironmentkey"],
            "X-Hydra-Server-Private-Key": myMap["http-otherenvironmentsecret"],
        },
        json: true
    };

    var thePromise = Hydra.Client.get(myMap["http-otherenvironmenturl"] + "/broadcast_channels/test/requestFromOtherEnvironment", requestOptions);
    return thePromise.then(function (reqResp){
        return {body:reqResp.response.body, code:200};
    });
});


//Custom Endpoint That Doesn't Return
Hydra.get('custom_no_response', function(request, response) {});

//Custom Endpoint That Returns a NaN Because We Can't Have Nice Things
Hydra.get('custom_nan', function(request, response) {
    return {
        number: 123,
        not_a_number: parseInt('NaN')
    };
});

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

//Custom Endpoint to Get All Global Data
Hydra.get('custom_global_get_all', function(request, response) {
    var allGlobalData = Global.getAll();
    return {allGlobalData};
});

//Custom Endpoint that creates a v1 UUID and a v4 UUID
Hydra.get('custom_create_uuid', function(request, response) {
   var v1UUID = UUID.v1();
   var v4UUID = UUID.v4();
   return {"v1": v1UUID, "v4": v4UUID};
});

//Custom Endpoint that returns body data
Hydra.put('send_and_receive', function(request, response) {
    var requestBodyData = request.body['data'];
    return requestBodyData;
});

//Custom Endpoint to test decompressing a string
Hydra.post('decompress_this_string', function(request, response) {
    var theCompressedData = request.body['compressed'];
    var decompressed = theCompressedData.decompressSync();

    decompressed = "Your String Decompressed: " + decompressed;
    Logger.info(decompressed);
    return {"compressed": new Hydra.Types.Compressed(decompressed)};
});

//Custom Endpoint to test decompressing a map
Hydra.post('decompress_this_map', function(request, response) {
    var theCompressedData = request.body['compressed'];
    theCompressedData.decompressSync();
    Logger.info("Decompressed Map:" + theCompressedData.data);
    return {"compressed": theCompressedData.data};
});

//Endpoint to Compress a String
Hydra.post('compress_this_string', function(request, response) {
  var theString = request.body['decompressed'];
  var theCompressedString = new Hydra.Types.Compressed(theString);
  theCompressedString.compressSync();

  Logger.info("The Compressed String: " +  JSON.stringify(theCompressedString));
  return {"decompressed": theCompressedString.decompressSync()};
});

//Endpoint to Compress a map
Hydra.post('compress_a_map', function(request, response) {
  var theMap = {"a":"hi", "b":"hello", "c":"sup"};
  var theCompressedMap = new Hydra.Types.Compressed(theMap);
  theCompressedMap.compressSync();

  Logger.info("The Compressed Map: " +  JSON.stringify(theCompressedMap));
  return {"decompressed": theCompressedMap.decompressSync()};
});

//Endpoint to Write compressed map data to a profile with a raw url
Hydra.put('update_profile_with_compressed_map', function(request, response){
    var serverAuth = Hydra.Client.authServer();

    var profileToUpdate = "/profiles/" + request.body['account_id'];

    var theString = request.body['decompressed_string'];
    var theCompressedString = new Hydra.Types.Compressed(theString);

    var theMap = {"a":"hi", "b":"hello", "c":theCompressedString};
    var theCompressedMap = new Hydra.Types.Compressed(theMap);

    var thePromise = Hydra.Client.put(profileToUpdate, {auth: serverAuth, body:
        [["set", "data.compressedMapByCustomEndpoint", theCompressedMap]]});
    return thePromise.then(function(theReq) {
        if(theReq.response.statusCode == 200) {
            return D.resolved({});
        } else {
            return D.rejected({});
        }
    })
});

//Endpoint to Write compressed data to a profile with a raw url
Hydra.put('update_profile_with_compressed', function(request, response){
    var serverAuth = Hydra.Client.authServer();

    var profileToUpdate = "/profiles/" + request.body['account_id'];
    var theData = new Hydra.Types.Compressed("Compress This Data For Me Please");
    theData.compressSync();  // shouldn't be necessary, but is pending a bugfix
    var thePromise = Hydra.Client.put(profileToUpdate, {"auth":serverAuth, body:
        [["set", "data.compressedByCustomEndpoint", theData]]});
    return thePromise.then(function(theReq) {
        if(theReq.response.statusCode == 200) {
            return D.resolved({});
        } else {
            return D.rejected({});
        }
    })
});

//Endpoint to write a large integer to a profile
Hydra.put('update_profile_with_large_number', function(request, response){
    var serverAuth = Hydra.Client.authServer();
    var profileToUpdate = "/profiles/" + request.body['account_id'];

    var thePromise = Hydra.Client.put(profileToUpdate, {auth: serverAuth, body:
        [["set", "data.largeNumber", 9007199254740992]]});
    return thePromise.then(function(theReq) {
        if(theReq.response.statusCode == 200) {
            return D.resolved(theReq.response.body);
        } else {
            return D.rejected(theReq.response.body);
        }
    })
});

//Endpoint to write a map with integers as strings as the keys
Hydra.put('update_profile_with_map_of_key_string_numbers', function(request, response){
    var serverAuth = Hydra.Client.authServer();
    var profileToUpdate = "/profiles/" + request.body['account_id'];

    var thePromise = Hydra.Client.put(profileToUpdate, {auth: serverAuth, body:
        [["set", "data.mapOfNumberKeys", {"1": "juan", "2": "due", "3": "twa", "4": "quat", "5": "cinc"}]]});
    return thePromise.then(function(theReq) {
        if(theReq.response.statusCode == 200) {
            return D.resolved(theReq.response.body);
        } else {
            return D.rejected(theReq.response.body);
        }
    })
});

// Make sure SSC can gunzip its own gzip
Hydra.put('put_and_fetch_compressed', function(request, response){
    var serverAuth = Hydra.Client.authServer();

    var profileToUpdate = "/profiles/" + request.body['account_id'];
    var theData = new Hydra.Types.Compressed("Compress This Data For Me Please");
    theData.compressSync();  // shouldn't be necessary, but is pending a bugfix

    var thePromise = Hydra.Client.put(profileToUpdate, {auth: serverAuth, body:
        [["set", "data.compressedByCustomEndpoint", theData]]});
    return thePromise.then(function(theReq, body) {
        if(theReq.response.statusCode == 200) {
            var theSecondPromise = Hydra.Client.get(profileToUpdate, {"auth": serverAuth});
            return theSecondPromise.then(function(theSecReq) {
                if(theSecReq.response.statusCode == 200) {
                    var theCompressedData = theSecReq.response.body['data']['compressedByCustomEndpoint'];
                    var decompressed = theCompressedData.decompressSync();
                    Logger.info("The Compressed String: " +  decompressed);
                    return D.resolved({'our_string': decompressed});
                } else {
                    return D.rejected({});
                }
            })
        } else {
            return D.rejected({});
        }
    })
});

//Endpoint to decompress and read a compressed field on the player profile
Hydra.put('decompress_profile_field', function(request, response){
    var serverAuth = Hydra.Client.authServer();

    var profileToRetrieve = "/profiles/" + request.body['account_id'];

    return Hydra.Client.get(profileToRetrieve, {auth: serverAuth})
    .then(function(result) {
        var theCompressedData = result.body["data"][request.body['field_to_compress']];
        var decompressed = theCompressedData.decompressSync();
        Logger.info("The Decompressed String: " + decompressed);
        return true;
    })
});

//Custom endpoint to make a request with a Server Key and Server Secret from the request
Hydra.put('use_raw_server_key_from_request', function(request, response){
    var publicKey = request.body['server_key'];
    var privateKey = request.body['server_secret'];
    var serverAuth = Hydra.Client.authServer(publicKey, privateKey);

    return Hydra.Client.get("/broadcast_channels/test/broadcast_messages", {auth: serverAuth})
    .then(function(reqResp) {
        return true;
    })
});

//Custom endpoint to make a request with a hard-coded Server Key and Server Secret
Hydra.get('use_raw_server_key', function(request, response){
    var publicKey = "insert-your-public-key-here";
    var privateKey = "insert-your-private-key-here";
    var serverAuth = Hydra.Client.authServer(publicKey, privateKey);

    return Hydra.Client.get("/broadcast_channels/thisChannelIsForTestingAndDoesntExist/broadcast_messages", {auth: serverAuth})
    .then(function(result) {
      return true;
    })
});

Hydra.get('the_current_date', function(request, response) {
    var currentDate = new Date();
    return currentDate;
});

//The largest number possible is one less than the variable saved below.
Hydra.get('return_large_number', function(request, response) {
    var largeNumber = 9007199254740992;
    return largeNumber;
});

Hydra.put('emit_external_event', function(request, response) {
    return Event.emit("{'kind': 'CAT', 'name': 'pongo'}", {'id': 'test_pet_schema'}).then(function() {
        return {"ret": "here"};
    });
});

Hydra.put('emit_external_event_huge_body', function(request, response) {
    var hugeString = "BillyFucilloHuge";
    for (var i = 0; i < 25; i++) {
        hugeString = hugeString + hugeString;
    }
    return Event.emit("{'kind': 'CAT', 'name': "+hugeString+"}", {'id': 'test_pet_schema'}).then(function() {
        return {"ret": "here"};
    });
});

Hydra.put('emit_external_event_with_invalid_string', function(request, response) {
    return Event.emit(new Buffer('DFNlcnZlchhJdGVtQ29uc3VtZWTkr6TqoFgwNTlkZmM2OGY2MTM1YWQyMTdlYmM0MjQ18gHA64PqoFgwNWE1ZmU4OTZkOWJiOWY1OWUwZDg3NTkzFGxvdC1hcmVuYTICAgAcaHlkLWxvdC1hcmVuYTI\u003d', 'base64').toString('ascii'), {'id': 'test_pet_schema', 'testThing':'汉字'}).then(function() {
        return {"ret": "here"};
    });
});

Hydra.put('emit_user_external_event', function(request, response) {
    return Event.emit({'kind': request.body['kind'], 'name': request.body['name'], 'user_id': request.body['user_id']}, {'id': 'test_pet_owner_schema'}).then(function() {
        return {"ret": "this"};
    }, function(error) {
        return {"ret": error};
    });
});

Hydra.put('emit_user_external_event_custom_account_id', function(request, response) {
    return Event.emit({'kind': request.body['kind'], 'name': request.body['name'], 'user_id': request.body['user_id']}, {'id': 'test_pet_owner_schema'}, request.body['account_id']).then(function() {
        return {"Hello": "World"};
    }, function(error) {
        return {"ret": error};
    });
});

Hydra.put('emit_user_external_event_with_null', function(request, response) {
    return Event.emit({'kind': null, 'name': request.body['name'], 'user_id': request.body['user_id']}, {'id': 'test_pet_owner_schema'}).then(function() {
        return {"ret": "this"};
    }, function(error) {
        return {"ret": error};
    });
});

Hydra.put('emit_many_external_events', function(request, response) {
    var promises = [];
    var num = parseInt(request.body['num_events']);

    for(var i=0; i < num; i++){
        promises.push(Event.emit({'kind': request.body['kind'], 'name': request.body['name'], 'user_id': request.body['user_id']}, {'id': 'test_pet_owner_schema'}));
    }

    return D.all(promises.map(function(promise){
        return promise.then(function(){/*no-op*/}, function(error){ return error; })
    }))
    .then(function(results){
        var errors = results.filter(function(x){return x != undefined;});
        if(errors.length == 0) {
            return {"events_emitted": num};
        } else {
            return {"events_emitted": num - errors.length, "errors": errors};
        }
    });
});

//------------------------------------------------------------------------------------------------------------------------------------------

//Custom Endpoint to search for profile with unicode character.
Hydra.put('unicode_search', function(request, response){
    var serverAuth = Hydra.Client.authServer();
    var theUnicodeString = request.body['unicodeString'];
    var theURL = "/profiles/search_queries/unicode-search/run?ucf=" + Util.encodeURIComponent(theUnicodeString);
    var thePromise = Hydra.Client.get(theURL, {auth: serverAuth});
    return thePromise.then(function(theReq, body) {
        if(theReq.response.statusCode == 200) {
            return D.resolved({});
        } else {
            return D.rejected({"body":body, "serverRequest":theReq});
        }
    })
});

//Custom endpoint to convert from Unicode to utf-8 encoded strings
Hydra.put('unicode_convert', function(request, response){
    var theUnicodeString = request.body['unicodeString'];
    Logger.info(Util.encodeURIComponent(theUnicodeString));
    return Util.encodeURIComponent(theUnicodeString);
});

//Custom endpoint to get info on a hard coded geoip string
Hydra.get('geoip_data', function(request, response) {
    return GeoIP.getGeoData('1.1.1.1')
    .then(function(geoData) {
        Logger.info(geoData);
        return geoData;
    }, function(error) {
        Logger.error(error);
        return {error: error};
    })
})

//Custom endpoint to test SSC deferring resolution order
Hydra.get('test_resolve_all_in_correct_order', function(request, response) {
    let deferred_one = D.defer();
    let deferred_two = D.defer();
    let deferred_three = D.defer();
    let deferred_four = D.defer();
    let deferred_five = D.defer();
    let deferred_six = D.defer();
    deferred_five.resolve('resolved FIVE');
    deferred_six.resolve('resolved SIX');
    deferred_three.resolve('resolved THREE');
    deferred_one.resolve('resolved ONE');
    deferred_four.resolve('resolved FOUR');
    deferred_two.reject('rejected TWO');
    return D.resolveAll([deferred_one.promise, deferred_two.promise, deferred_three.promise, deferred_four.promise, deferred_five.promise, deferred_six.promise]).then(function(results) {
        return results;
    });
});

Hydra.put('arbitrarily_deep_json', function(request, response) {
    let final = "hello world";
    let temp = {};
    for (let i = 0; i < +request.body['depth']; i++) {
        temp = {};
        temp[i] = final;
        final = temp;
    }
    return final;
});

//------------------------------------------------------------------------------------------------------------------------------------------

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
