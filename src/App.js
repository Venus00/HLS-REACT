import { useRef } from 'react'
import './App.css'
import VideoPlayer from './VideoPlayer';
import videojs from 'video.js';

function App() {
  var videoSrc = 'http://localhost:3000/public/videos/2d7b06b6-4913-4f75-907f-9c8c738a3395/output.m3u8';

  const playerRef = useRef(null);


  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };


  return (
    <>
      <div>
        <VideoPlayer onReady={handlePlayerReady} />
        {/* <Player/> */}
      </div>
    </>
  )
}


export default App