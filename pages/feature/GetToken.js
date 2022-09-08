async function GetToken(flagString) {
    if (flagString == null || flagString.length == 0) {
        return;
    }

    var result = flagString.split('&').reduce(function (res, item) {
        var parts = item.split('=');
        res[parts[0]] = parts[1];
        return res;
    }, {});

    // return Token
    return result.access_token;
}

export default GetToken;