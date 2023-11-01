import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ videoUrl }) => {
    return <ReactPlayer url={videoUrl} width="100%" height="500px" controls />;
};

export default VideoPlayer;
