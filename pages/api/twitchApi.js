// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  if (req.method === "GET") {
    const twitchVideosApi = `https://api.twitch.tv/helix/videos?game_id=29595&first=20`;

    let headersList = {
      "Client-Id": "87taxodv5s6tl484merlchj3rufwds",
      "Authorization": "Bearer 8kmqhiiam4qfk7uf5urwdflyri5r56"
    }

    let result = await fetch(twitchVideosApi, {
      method: "GET",
      headers: headersList
    });

    res.status(200).json(await result.text())
  }

  res.status(200).json({ name: 'John Doe' })
}
