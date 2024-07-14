import React, { useRef, useEffect,useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export const VideoPlayer = (props) => {
    
    const options = {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{
          src: "https://stream-akamai.castr.com/5b9352dbda7b8c769937e459/live_2361c920455111ea85db6911fe397b9e/index.fmp4.m3u8",
          //type: 'application/x-mpegURL'
        }],
      };
    
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const { onReady } = props;

    useEffect(() => {

        // Make sure Video.js player is only initialized once
        if (!playerRef.current) {
            // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode. 
            const videoElement = document.createElement("video-js");

            videoElement.classList.add('vjs-big-play-centered');
            videoRef.current.appendChild(videoElement);

            const player = playerRef.current = videojs(videoElement, options, () => {
                videojs.log('player is ready');
                onReady && onReady(player);
            });

            player.on('error', () => {
                console.log("test",player.error()); //Gives MEDIA_ERR_SRC_NOT_SUPPORTED error
                //player.src(urls[0]);
            })
            // You could update an existing player in the `else` block here
            // on prop change, for example:
        } else {
            const player = playerRef.current;
            player.src("https://stream-akamai.castr.com/5b9352dbda7b8c769937e459/live_2361c920455111ea85db6911fe397b9e/index.fmp4.m3u8");

            player.autoplay(options.autoplay);
        }
    }, [options, videoRef]);

    // Dispose the Video.js player when the functional component unmounts
    useEffect(() => {
        const player = playerRef.current;

        return () => {
            if (player && !player.isDisposed()) {
                player.dispose();
                playerRef.current = null;
            }
        };
    }, [playerRef]);

    return (
        <div data-vjs-player style={{ width: "600px" }}>
            <div ref={videoRef} />
        </div>
    );
}

export default VideoPlayer;