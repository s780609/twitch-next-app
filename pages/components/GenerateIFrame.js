import React, { useEffect, useState } from 'react';
import IFrame from "./IFrame";
import { CardGroup, Container, CardDeck, CardColumns } from 'react-bootstrap';

function GenerateIFrame(props) {
    var twitchGameData = props.twitchGameData;
    var parentDomain = props.parentDomain;

    if (twitchGameData == null || twitchGameData.length == 0) {
        return (<></>);
    }

    return (<>
        {
            twitchGameData.map(element => {
                return <IFrame key={element.id} videoId={element.id} title={element.title} description={element.description} parent={parentDomain}></IFrame>
            })
        }
    </>);
}

export default GenerateIFrame;