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









