import React, { useEffect, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import GetToken from "../lib/GetToken";
import GetAccess from "../lib/GetAccess";
import GenerateIFrame from "../components/GenerateIFrame";
import { Card, Button, Alert, Container } from "react-bootstrap";
import { loader } from "../lib/Loader";
import IFrame from "../components/IFrame";

function GenerateVideoCard({ gameName }) {
  const twitchApiUrl = process.env.NEXT_PUBLIC_TWITCH_API;
  const twitchApiRouteGetFollowedStreams =
    process.env.NEXT_PUBLIC_TWITCH_API_ROUTE_Get_Followed_Streams;
  const twitchApiRouteGetUsers =
    process.env.NEXT_PUBLIC_TWITCH_API_ROUTE_Get_Users;

  const [accessToken, setAccessToken] = useState("");
  const [twitchGameData, setTwitchGameData] = useState([]);
  const [followedStreams, setFollowedStreams] = useState([]);

  const clientId = "87taxodv5s6tl484merlchj3rufwds";

  //"https://hsutinghuan.ddns.net/Web1";
  //`https://s780609.github.io/twitch-app`;
  //`https://twitch-next-app-beta.vercel.app`;
  //`http://localhost:3000`;

  const redirect_uri = process.env.NEXT_PUBLIC_TWITCH_API_redirect_uri;
  console.log(process.env.NEXT_PUBLIC_TWITCH_API_redirect_uri);

  const port = new URL(redirect_uri).port
    ? ":" + new URL(redirect_uri).port
    : "";
  const pathname =
    new URL(redirect_uri).pathname == "/" ? "" : new URL(redirect_uri).pathname;
  const parentDomain = new URL(redirect_uri).hostname; // + pathname; //+ port //+ new URL(redirect_uri).pathname;

  async function fetchApi(gameId) {
    const response = await axios.get(
      `/api/twitchApi` +
        `/?authorization=${accessToken}&client-id=${clientId}&gameId=${gameId}`
    );
    return response;
  }

  useEffect(() => {
    OIDCImplicitCodeFlow();
  }, []);

  async function checkAccessTokenExist() {
    const accessToken = await GetToken();

    if (accessToken !== "") {
      return true;
    } else {
      return false;
    }
  }

  async function OIDCImplicitCodeFlow() {
    // On your server, get an access token and ID token by making this request:
    // json POST https://id.twitch.tv/oauth2/token ?client_id=<your client ID> &client_secret=<your client secret> &code=<authorization code received above> &grant_type=authorization_code &redirect_uri=<your registered redirect URI>
    const flagString = document.location.hash.substr(1);

    if (flagString == "") {
      await GetAccess(clientId, redirect_uri);
    } else {
      const access_Token = await GetToken(flagString);
      setAccessToken(access_Token);
    }
  }

  // get data of game id and data
  useEffect(() => {
    if (!accessToken) {
      return;
    }

    const getGameIdAndData = async () => {
      loader.show("#255AC4", 1.5, "Loading...");
      if (!(await checkAccessTokenExist())) {
        return;
      }

      if (!gameName) {
        const responseData = await getTopGames();
        console.log(responseData);
        for (let i = 0; i < responseData.length; i++) {
          if (responseData[i].name === "Just Chatting") {
            continue;
          }

          let gameId = responseData[i].id;

          try {
            const data = await getGameData(gameId);

            if (data != null && data.length != 0) {
              setTwitchGameData(data);
              loader.close();
              return;
            }
          } catch (e) {
            console.error(e);
          }
        }

        const data = await getDevelopeVideo();
        setTwitchGameData(data);
      } else {
        // use the search categories api can query game id by fuzzy search
        const responseData = await getGameIds();

        if (responseData != undefined && responseData.length != 0) {
          for (let i = 0; i < responseData.length; i++) {
            let gameId = responseData[i].id;

            const data = await getGameData(gameId);

            if (data != null && data.length != 0) {
              setTwitchGameData(data);
              loader.close();
              return;
            }
          }
        }

        const data = await getDevelopeVideo();
        setTwitchGameData(data);
      }

      loader.close();
    };

    getGameIdAndData();

    //getLoginUserId();
    getFollowedStream();
  }, [accessToken, gameName]);

  const getGameIds = async () => {
    const searchUrl =
      //`https://api.twitch.tv/helix/search/categories?query=${gameName}`;
      `https://api.twitch.tv/helix/games?name=${gameName}`;

    // use the search categories api can query game id by fuzzy search
    const response = await axios.get(searchUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Client-Id": `${clientId}`,
      },
    });

    if (
      response.status == 200 &&
      response.data != null &&
      response.data.data.length != 0
    ) {
      return response.data.data;
    }
  };

  // get videos by gameId
  const getGameData = async (gameId) => {
    if (!gameId) {
      return;
    }

    try {
      const responseGameVideo =
        // Next.js API
        //await fetchApi(gameId);

        // normal way: twitch api
        await axios.get(
          `https://api.twitch.tv/helix/videos?game_id=${gameId}&first=5`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Client-Id": `${clientId}`,
              "accept-language": "",
            },
          }
        );

      if (responseGameVideo.status === 200) {
        if (typeof responseGameVideo.data === "string") {
          const data = JSON.parse(responseGameVideo.data);
          return data.data;
        }

        const data = responseGameVideo.data.data;
        return data;
      } else {
        throw new Error("status !== 200");
      }
    } catch (e) {
      console.error(e);
    }
  };

  // get developer video
  const getDevelopeVideo = async () => {
    try {
      const response = await axios.get(
        `https://api.twitch.tv/helix/videos?id=335921245`,
        //`https://api.twitch.tv/helix/videos?id=1584246451`
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Client-Id": `${clientId}`,
          },
        }
      );

      return response.data.data;
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const getTopGames = async () => {
    const response = await axios.get(`https://api.twitch.tv/helix/games/top`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Client-Id": `${clientId}`,
      },
    });

    return response.data.data;
  };

  const getLoginUserId = async () => {
    const response = await axios.get(
      `${twitchApiUrl}/${twitchApiRouteGetUsers}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Client-Id": `${clientId}`,
        },
      }
    );

    if (response && response.status === 200) {
      const data = response.data;

      if (data) {
        const userId = data.data[0].id;
        return userId;
      }
    }
  };

  /**
   * @dependency getLoginUserId()
   */
  const getFollowedStream = async () => {
    const userId = await getLoginUserId();

    const response = await axios.get(
      `${twitchApiUrl}/${twitchApiRouteGetFollowedStreams}?user_id=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Client-Id": `${clientId}`,
        },
      }
    );

    if (response && response.status === 200) {
      if (response.data && response.data.data) {
        const data = response.data.data;
        setFollowedStreams(data);
      }
    }
  };

  const openLiveStream = (e) => {
    console.log(e.currentTarget);
  };

  return (
    <>
      {/* dev video */}
      <div style={{ textAlign: "center", margin: "auto" }}>
        ************ <br></br>
        twitch developer video
      </div>
      <IFrame
        key={"dev"}
        videoId={335921245}
        title={"dev"}
        description={"developer video"}
        parent={parentDomain}
      ></IFrame>
      <hr></hr>
      <div style={{ textAlign: "center", margin: "auto" }}>
        ************ <br></br>
        Search videos
      </div>
      <Container fluid style={{ display: "flex", flexWrap: "wrap" }}>
        {twitchGameData == null || twitchGameData.length == 0 ? (
          <Alert show={true} variant="info">
            沒有影片
          </Alert>
        ) : (
          <></>
        )}
        <GenerateIFrame
          twitchGameData={twitchGameData}
          parentDomain={parentDomain}
        ></GenerateIFrame>
      </Container>
      <hr></hr>
      <div style={{ textAlign: "center", margin: "auto" }}>
        ************ <br></br>
        Your Followed Stream Live
      </div>
      <Container fluid style={{ display: "flex", flexWrap: "wrap" }}>
        {followedStreams.map((stream) => {
          const imgUrl = stream.thumbnail_url
            .replace("{width}", "500")
            .replace("{height}", "281");
          return (
            <>
              <Button
                style={{
                  padding: "0",
                  backgroundColor: "transparent",
                  border: "solid black",
                  color: "black",
                  zIndex: "100",
                }}
                id={stream.id}
                onClick={openLiveStream}
              >
                <Card style={{ width: "24rem" }}>
                  <Card.Img src={imgUrl}></Card.Img>
                  <Card.Title>{stream.title}</Card.Title>
                </Card>
              </Button>
            </>
          );
        })}
      </Container>
    </>
  );
}

export default GenerateVideoCard;
