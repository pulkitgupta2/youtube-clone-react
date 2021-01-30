import React, { useState } from "react";
import "./styles.css";
import {
  MoreHoriz,
  PlaylistAdd,
  Reply,
  ThumbDownAlt,
  ThumbUpAlt,
} from "@material-ui/icons";
import { Avatar, Button } from "@material-ui/core";
import { VideoSmall } from "..";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { useAppContext } from "../../context/appContext";

const Watch = ({ video }) => {
  const history = useHistory();
  const handleAvatarRedirect = () => history.push("/PreviewChannel");
  const [showDesc, setShowDesc] = useState(false);

  const { videos } = useAppContext();

  const formatted = moment
    .unix(video?.timestamp?.seconds)
    .format("MMM DD, YYYY  ");
  return (
    <div className="watch">
      <div className="watch__wrap">
        <div className="watch__left">
          <video className="watch__video" autoplay controls>
            <source src={video.videoURL} type="video/mp4" />
          </video>

          <div className="watch__leftBtm">
            <h1 className="watch__title">{video.title}</h1>

            <div className="watch__videoInfo">
              <div className="watch__videoInfoLeft">
                <p className="videothumb__text">123 views • {formatted}</p>
              </div>

              <div className="watch__videoInfoRight">
                <div className="watch__likeContainer">
                  <div className="watch__likeWrap">
                    <div className="watch__likeBtnContainer color--gray">
                      <ThumbUpAlt className="watch__icon" />
                      <p>15k</p>
                    </div>

                    <div className="watch__likeBtnContainer color--gray">
                      <ThumbDownAlt className="watch__icon" />
                      <p>200</p>
                    </div>
                  </div>

                  <div className="watch__likeDislikes" />
                </div>

                <div className="watch__likeBtnContainer color--gray">
                  <Reply className="watch__icon share-icon" />
                  <p>SHARE</p>
                </div>

                <div className="watch__likeBtnContainer color--gray">
                  <PlaylistAdd className="watch__icon play-addIcon" />
                  <p>SAVE</p>
                </div>

                <div className="watch__likeBtnContainer color--gray">
                  <MoreHoriz className="watch__icon play-addIcon" />
                  <p>SAVE</p>
                </div>
              </div>
            </div>
          </div>

          <div className="watch__details">
            <div className="watch__detailsContainer">
              <div className="videothumb__details watch__avatarWrap">
                <Avatar
                  style={{ cursor: "pointer" }}
                  onClick={handleAvatarRedirect}
                />

                <div className="videothumb__channel">
                  <h1 className="videothumb__title">{video.channelName}</h1>

                  <p className="videothumb__text watch__subCount">
                    4.85M Subscribers
                  </p>
                </div>
              </div>
              <Button
                className="watch__subBtn"
                color="primary"
                variant="contained"
              >
                SUBSCRIBE
              </Button>
            </div>

            <div className="watch__description">
              <p style={{ maxHeight: showDesc && "100%" }}>
                {video.description}
              </p>
              <p
                className="watch__showMore"
                onClick={() => setShowDesc(!showDesc)}
              >
                SHOW {showDesc ? "LESS" : "MORE"}
              </p>
            </div>
          </div>
        </div>
        <div className="watch__right">
          {videos.map((item) => (
            <VideoSmall key={item.id} video={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Watch;
