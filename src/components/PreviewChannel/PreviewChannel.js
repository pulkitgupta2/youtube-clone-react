import { Avatar, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import img from "../../assets/channelArt.jpg";
import { VideoSmall } from "..";
import "./styles.css";
import { useLocation } from "react-router-dom";
import { useAppContext } from "../../context/appContext";

const PreviewChannel = () => {
  const location = useLocation();

  const channel = new URLSearchParams(location.search).get("name");

  console.log(channel);

  const [currentChannel, setCurrentChannel] = useState([]);
  const { videos } = useAppContext();

  useEffect(() => {
    setCurrentChannel(videos.filter((video) => video.email === channel));
  }, [channel, videos]);

  return (
    <div className="channel">
      <img className="channel__art" src={img} alt="Channel Art" />

      <div className="channel__details">
        <div className="channel__detailsWrap">
          <div className="channel__avatarWrap">
            <Avatar className="channel__avatar" />

            <div className="videothumb__channel">
              <h1 className="channel__title">{channel}</h1>

              <p className="videothumb__text watch__subCount">
                4.85M Subscribers
              </p>
            </div>
          </div>
          <Button
            className="watch__subBtn channel__subBtn"
            color="primary"
            variant="contained"
          >
            SUBSCRIBE
          </Button>
        </div>
        <div className="channel__links">
          <div className="channel__link">
            <p>HOME</p>
          </div>
          <div className="channel__link channel__link--active">
            <p>VIDEOS</p>
            <div className="channel__link__border"></div>
          </div>
          <div className="channel__link">
            <p>COMMUNITY</p>
          </div>
          <div className="channel__link">
            <p>PLAYLISTS</p>
          </div>
          <div className="channel__link">
            <p>CHANNELS</p>
          </div>
          <div className="channel__link">
            <p>ABOUT</p>
          </div>
        </div>
      </div>
      <div className="channel__content">
        <div className="channel__contentWrapper">
          {currentChannel.map((video) => (
            <VideoSmall video={video} key={video.id} channelView />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviewChannel;
