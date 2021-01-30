import moment from "moment";
import React from "react";
import { useHistory } from "react-router-dom";
import "./styles.css";

const VideoSmall = ({ channelView = false, video }) => {
  const history = useHistory();

  const formatted = moment
    .unix(video?.timestamp?.seconds)
    .format("YYYYMMDD,HH:mm:ss");
  const timenew = moment(formatted, "YYYYMMDD,HH:mm:ss").fromNow();

  const handleClickRedirect = () => history.push(`/watch/${video.id}`);
  return (
    <div
      onClick={handleClickRedirect}
      className={`videoSmall ${channelView && "videoSmall__channelView"}`}
    >
      <div className="videoSmall__left">
        <img
          src={video.thumbnailURL}
          alt="thumbnail"
          className={`videoSmall__thumbmail ${
            channelView && "videoSmall__channelView__img"
          }`}
        />
      </div>

      <div className="videoSmall__right">
        <p className="videoSmall__title">{video.title}</p>

        <div className="videoSmall__texts videothumb__texts">
          {!channelView && (
            <p className="videothumb__text">{video.channelName} </p>
          )}

          <p className="videothumb__text">110k views • {timenew}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoSmall;
