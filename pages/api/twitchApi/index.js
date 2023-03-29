// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var https = require("https");

export default function handler(req, res) {
  //res.status(200).json({ name: 'John Doe' })

  if (req.method === "GET") {
    if (
      req.query["authorization"] &&
      req.query["gameId"] &&
      req.query["client-id"]
    ) {
      const authorizationValue = req.query["authorization"];
      const clientId = req.query["client-id"];
      const gameId = req.query["gameId"];

      const twitchVideosApi = `/helix/videos?game_id=${gameId}&first=5`;

      let headersList = {
        "Client-Id": clientId,
        Authorization: `Bearer ${authorizationValue}`,
      };

      try {
        // ********************************
        // use https of nodejs
        var httpsRequestResultStr = "";
        var httpRequest = https.request(
          {
            host: "api.twitch.tv",
            port: 443,
            path: twitchVideosApi,
            method: "GET",
            headers: headersList,
          },
          (response) => {
            response.setEncoding("utf8");
            response.on("data", (chunk) => {
              httpsRequestResultStr += chunk;
            });

            response.on("end", function () {
              console.log(httpsRequestResultStr);
              res.status(200).json(httpsRequestResultStr);
            });
          }
        );

        httpRequest.on("error", function (e) {
          console.log("problem with request: " + e.message);
        });

        httpRequest.end();

        // ********************************

        // let result = await fetch(twitchVideosApi, {
        //   method: "GET",
        //   headers: headersList
        // });

        //res.status(200).json(await result.text())
      } catch (e) {
        console.log(e);
        res.status(500).send("error message: " + e.message);
      }
    }
  } else {
    // example
    res.status(200).json({ name: "John Doe" });
  }
}
