'use client';
import HLSVideoElement from 'hls-video-element';
import {
  MediaController,
  MediaControlBar,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaLoadingIndicator,
  MediaVolumeRange,
  MediaPlaybackRateButton,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaMuteButton,
  MediaCaptionsButton,
  MediaAirplayButton,
  MediaPipButton,
  MediaFullscreenButton,
  MediaPosterImage,
} from 'media-chrome/react';
import { useState } from 'react';


const chromeStyles = {
  '--media-primary-color': 'white',
};

const toggleBool = (prev) => !prev;

export const Player = () => {
  const [mounted, setMounted] = useState(true);
  const [noDefaultStore, setNoDefaultStore] = useState(false);
  return (
    <>
      <div>
        <button id="mount-btn" onClick={() => setMounted(toggleBool)}>
          {mounted ? 'Unmount' : 'Mount'}
        </button>
        <span style={{ padding: '10px' }}>
          <label htmlFor="toggleNoDefaultStore">
            <code>noDefaultStore</code> (applies only on (re)creation)
          </label>
          <input
            id="toggleNoDefaultStore"
            type="checkbox"
            onChange={() => setNoDefaultStore(toggleBool)}
          ></input>
        </span>
      </div>
      <br />
      {mounted && (
        <MediaController>
        <HLSVideoElement
            src="https://stream-akamai.castr.com/5b9352dbda7b8c769937e459/live_2361c920455111ea85db6911fe397b9e/index.fmp4.m3u8"
            slot="media"
            crossorigin
            muted
        ></HLSVideoElement>
            <MediaLoadingIndicator slot="centered-chrome" noautohide></MediaLoadingIndicator>
            <MediaControlBar>
                <MediaPlayButton></MediaPlayButton>
                <MediaSeekBackwardButton></MediaSeekBackwardButton>
                <MediaSeekForwardButton ></MediaSeekForwardButton>
                <MediaMuteButton></MediaMuteButton>
                <MediaVolumeRange></MediaVolumeRange>
                <MediaTimeRange></MediaTimeRange>
                <MediaTimeDisplay showduration remaining></MediaTimeDisplay>
                <MediaPlaybackRateButton></MediaPlaybackRateButton>
                <MediaFullscreenButton></MediaFullscreenButton>
            </MediaControlBar>
        </MediaController>
    
    )}
    </>
  );
};