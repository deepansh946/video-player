import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({data, url, onComplete}) => {
  return (
    <ReactPlayer
      url={url}
      playing
      controls
      muted
      style={{
        margin: '0 auto',
      }}
      width="80%"
      height="500px"
      onEnded={() => {
        const updatedList = data.filter(item => item !== url);
        onComplete(updatedList);
      }}
    />
  );
};

export default VideoPlayer;
