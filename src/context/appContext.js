import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../lib/firebase";

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [appState, setAppState] = useState("empty");
  const [showUploadVideo, setShowUploadVideo] = useState(false);

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setAppState("home");
        setCurrentUser(user);
        console.log(user);
      } else {
        setCurrentUser(null);
        setAppState("login");
      }
    });
  }, []);

  useEffect(() => {
    db.collection("Videos").onSnapshot((snapshot) => {
      setVideos(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  console.log(videos);
  const value = {
    videos,
    appState,
    currentUser,
    showUploadVideo,
    setShowUploadVideo,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
