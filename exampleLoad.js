 /* 
 Say a developer wants to apply a profile update to a field called myNickname, but only if the value isn't in a list of inappropriate words.  Realistically though:
- The values sent by the player would be compressed, so you'd have to decompress them and analyze them in SSC.
- You would store the inappropriate words in the 'Globals' in SSC, that would probably be set in OnLoad.  The OnLoad function would get a global config and store those values in the 'Globals'

Tests the profile.beforeUpdate hook, decompressing a string in SSC, the OnLoad function, and Globals in ssc.
*/

//set Logger Level
Logger.level = Logger.INFO;
// On load function
Hydra.onLoad(function(response) {
    //return true;
    var serverAuth = Hydra.Client.authServer();

    return Hydra.Client.get("/global_configuration_types/lists/global_configurations/noNoWords", {auth: serverAuth})
    .then(function(censorCheck) {
      Global.set("restricted", censorCheck.response.body.data.badList);
      Logger.info(Global.get('restricted'));
      return true;
    })
})