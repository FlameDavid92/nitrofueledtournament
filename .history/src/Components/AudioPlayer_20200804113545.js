import React from 'react'

export default function AudioPlayer() {
    return (
        <div>
            <audio ref="audio_tag" src="./audio/theme.mp3" controls autoPlay />
        </div>
    );
}

export default AudioPlayer;