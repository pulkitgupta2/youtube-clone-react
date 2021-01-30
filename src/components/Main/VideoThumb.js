import { Avatar } from "@material-ui/core";
import moment from "moment";
import React from "react";
import { useHistory } from "react-router-dom";

const VideoThumb = ({ video }) => {
  const history = useHistory();

  const handleThumbClick = () => history.push(`/watch/${video.id}`);
  const handleAvatarClick = () =>
    history.push(`/PreviewChannel?name=${video.email}`);

  const formattedDate = moment
    .unix(video?.timestamp?.seconds)
    .format("YYYYMMDD, HH:mm:ss");

  console.log(formattedDate);
  const uplodedTime = moment(formattedDate, "YYYYMMDD, HH:mm:ss").fromNow();

  return (
    <div className="videothumb">
      <img
        onClick={handleThumbClick}
        className="videothumb__thumbnail"
        src={video.thumbnailURL}
        alt="Thumbnail"
      />

      <div className="videothumb__details">
        <Avatar onClick={handleAvatarClick} />

        <div className="videothumb__channel">
          <h1 className="videothumb__title">{video.title}</h1>

          <div className="videothumb__texts">
            <p className="videothumb__text">{video.channelName}</p>
            <p className="videothumb__text">123 views • {uplodedTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoThumb;
