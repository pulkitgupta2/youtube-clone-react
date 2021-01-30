import React from "react";
import VideoThumb from "./VideoThumb";
import "./styles.css";
import { useAppContext } from "../../context/appContext";

const Main = () => {
  const { videos } = useAppContext();
  return (
    <div className="main">
      {videos.map((video) => (
        <VideoThumb video={video} />
      ))}
    </div>
  );
};

export default Main;
