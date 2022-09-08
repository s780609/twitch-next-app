const tokenHandler = {};

// get token 
tokenHandler.getToken = (twitchToken) => {
    sessionStorage.getItem(twitchToken);
}

// set Token
tokenHandler.setToken = (twitchToken) => {
    sessionStorage.setItem('twitchToken', JSON.stringify(twitchToken));
    return twitchToken;
}