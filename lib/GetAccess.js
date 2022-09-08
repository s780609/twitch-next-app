import axios from "axios";

// send users to twitch login page
async function GetAccess(clientId, redirect_uri) {
    var claims = { "id_token": { "email_verified": null } };
    const twitchUrl = `https://id.twitch.tv/oauth2/authorize?response_type=token+id_token&client_id=${clientId}&redirect_uri=${redirect_uri}&&scope=viewing_activity_read+openid&claims=${claims}`;

    // refresh Url
    await window.location.replace(twitchUrl);
}

export default GetAccess;