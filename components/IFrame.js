import React, { useEffect, useState } from 'react';
import { Card, CardColumns, Figure } from 'react-bootstrap';

function IFrame({ height, width, allowfullscreen = true, autoplay, videoId, title, description, parent }) {
    if (width == undefined) width = "400px";
    return (
        <Card border="light" style={{ maxWidth: width, width: width, display: "BLOCK", margin: "auto" }}>
            <Card.Body>
                <iframe
                    title={title}
                    src={`https://player.twitch.tv/?autoplay=${autoplay == null ? false : true}&parent=${parent}&video=${videoId}`}
                    height={height == null ? 300 : height}
                    width={width == null ? 400 : width}
                    allowFullScreen={allowfullscreen == null ? true : allowfullscreen}
                ></iframe>
                <p style={{ maxWidth: width, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                    {title}
                </p>
            </Card.Body>
        </Card>
    );
}

// .wrapper {
//     padding: 20px;
//     background: #eaeaea;
//     max-width: 400px;
//     margin: 50px auto;
//   }

// .demo-2 {
//     overflow: hidden;
//     white-space: nowrap;
//     text-overflow: ellipsis;
//     max-width: 150px;
//   }

export default IFrame;