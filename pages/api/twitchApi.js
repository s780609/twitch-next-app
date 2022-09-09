// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var https = require("https");

export default async function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })

  // if (req.method === "GET") {
  //   const twitchVideosApi = `https://api.twitch.tv/helix/videos?game_id=29595&first=20`;

  //   let headersList = {
  //     "Client-Id": "87taxodv5s6tl484merlchj3rufwds",
  //     "Authorization": "Bearer 8kmqhiiam4qfk7uf5urwdflyri5r56"
  //   }

  //   try {
  //     // ********************************
  //     // use https of nodejs
  //     var httpsRequestResultStr = "";
  //     var httpRequest = https.request({
  //       host: 'api.twitch.tv',
  //       port: 443,
  //       path: '/helix/videos?game_id=29595&first=20',
  //       method: "GET",
  //       headers: headersList
  //     }, (response) => {
  //       response.setEncoding('utf8');
  //       response.on("data", (chunk) => {
  //         httpsRequestResultStr += chunk;
  //       });

  //       response.on('end', function () {
  //         console.log(httpsRequestResultStr);
  //         res.status(200).json(httpsRequestResultStr)
  //       });
  //     });

  //     httpRequest.on('error', function (e) {
  //       console.log('problem with request: ' + e.message);
  //     });

  //     httpRequest.end();

  //     // ********************************

  //     // let result = await fetch(twitchVideosApi, {
  //     //   method: "GET",
  //     //   headers: headersList
  //     // });

  //     //res.status(200).json(await result.text())
  //   } catch (e) {
  //     console.log(e);
  //     res.status(500).send("error message: " + e.message)
  //   }
  // }
  // else {
  //   // example 
  //   res.status(200).json({ name: 'John Doe' })
  // }
}
