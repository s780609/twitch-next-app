import React, { useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import GetToken from '../lib/GetToken';
import GetAccess from "../lib/GetAccess";
import GenerateIFrame from "../components/GenerateIFrame";
import { Card, CardColumns, Alert, Container } from 'react-bootstrap';
import { loader } from '../lib/Loader';

function GenerateVideoCard({ gameName }) {
    const [twitchGameData, setTwitchGameData] = useState([]);

    const [accessToken, setAccessToken] = useState("");

    const clientId = "87taxodv5s6tl484merlchj3rufwds";
    const redirect_uri =
        //"https://hsutinghuan.ddns.net/Web1";
        //`https://s780609.github.io/twitch-app`;
        //`https://twitch-next-32abd6qzw-s780609.vercel.app`;
        `http://localhost:3000`;

    const port = new URL(redirect_uri).port ? ":" + new URL(redirect_uri).port : "";
    const pathname = new URL(redirect_uri).pathname == "/" ? "" : new URL(redirect_uri).pathname;
    const parentDomain = new URL(redirect_uri).hostname // + pathname; //+ port //+ new URL(redirect_uri).pathname;

    const fetchApi = useCallback(() => {
        async function fetchApi(gameId) {
            return await fetch(`/api/twitchApi`);
        }

        return fetchApi();
    }, [])

    useEffect(() => {
        OIDCImplicitCodeFlow();
    }, []);

    async function checkAccessTokenExist() {
        const accessToken = await GetToken()

        if (accessToken !== "") {
            return true
        }
        else {
            return false;
        }
    }

    async function OIDCImplicitCodeFlow() {
        // On your server, get an access token and ID token by making this request:
        // json POST https://id.twitch.tv/oauth2/token ?client_id=<your client ID> &client_secret=<your client secret> &code=<authorization code received above> &grant_type=authorization_code &redirect_uri=<your registered redirect URI>
        const flagString = document.location.hash.substr(1);

        if (flagString == "") {
            await GetAccess(clientId, redirect_uri);
        }
        else {
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

            if (gameName == "") {
                const responseData = await getTopGames();

                for (let i = 0; i < responseData.length; i++) {
                    let gameId = responseData[i].id;

                    try {
                        const data = await getGameData(gameId);

                        if (data != null && data.length != 0) {
                            setTwitchGameData(data);
                            loader.close();
                            return;
                        }
                    }
                    catch (e) {
                        console.error(e);
                    }
                }

                const data = await getDevelopeVideo();
                setTwitchGameData(data);
            }
            else {
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
        }

        getGameIdAndData();
    }, [accessToken, gameName]);

    const getGameIds = async () => {
        const searchUrl = //`https://api.twitch.tv/helix/search/categories?query=${gameName}`;
            `https://api.twitch.tv/helix/games?name=${gameName}`;

        // use the search categories api can query game id by fuzzy search
        const response = await axios.get(searchUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Client-Id": `${clientId}`
            }
        });

        if (response.status == 200 && response.data != null && response.data.data.length != 0) {
            return response.data.data;
        }
    }

    // get videos by gameId
    const getGameData = async (gameId) => {
        if (!gameId) {
            return;
        }

        const responseGameVideo = await fetchApi(gameId);
        console.log(responseGameVideo);

        if (responseGameVideo.status === 200) {
            const json = await responseGameVideo.json()
            const temp = JSON.parse(json)
            const data = temp.data;
            return data;
        }
        else {
            throw new Error()
        }
    }

    // get developer video
    const getDevelopeVideo = async () => {
        try {
            const response = await axios.get(
                `https://api.twitch.tv/helix/videos?id=335921245`
                //`https://api.twitch.tv/helix/videos?id=1584246451`
                , {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Client-Id": `${clientId}`
                    }
                });

            return response.data.data;
        }
        catch (err) {
            console.error(err);
            alert(err.message);
        }
    }

    const getTopGames = async () => {
        const response = await axios.get(
            `https://api.twitch.tv/helix/games/top`
            , {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Client-Id": `${clientId}`
                }
            });

        return response.data.data;
    }

    return (<Container fluid style={{ display: "flex", flexWrap: "wrap" }}>
        {(twitchGameData == null || twitchGameData.length == 0) ? <Alert show={true} variant="info">沒有影片</Alert> : <></>}
        <GenerateIFrame twitchGameData={twitchGameData} parentDomain={parentDomain}></GenerateIFrame>
    </Container >);
}

export default GenerateVideoCard;