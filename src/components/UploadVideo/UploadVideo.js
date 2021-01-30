import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAppContext } from "../../context/appContext";
import { db, storage } from "../../lib/firebase";
import firebase from "firebase";

const UploadVideo = ({ video, setVideo, handleClose }) => {
  const [progress, setProgress] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [thumbanilProgress, setThumbanilProgress] = useState(0);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [thumbnail, setThumbnail] = useState(null);

  const [thumbanilURL, setThumbanilURL] = useState(null);
  const [videoURL, setVideoURL] = useState(null);

  const [id, setID] = useState(uuidv4());

  const [thumbnailUploaded, setThumbnailUploaded] = useState(false);
  const [videoUploaded, setVideoUploaded] = useState(false);

  const { currentUser } = useAppContext();

  const createID = () => setID(uuidv4());

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setThumbnail(e.target.files[0]);
    }
  };

  const handleThumbanilUpload = () => {
    const uploadThumbnail = storage
      .ref(`thumbnails/${thumbnail.name}`)
      .put(thumbnail);

    uploadThumbnail.on(
      "state_changed",
      (snapshot) => {
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setThumbanilProgress(progressPercent);
      },
      (err) => {
        console.log(err);
      },
      () => {
        storage
          .ref("thumbnails")
          .child(thumbnail.name)
          .getDownloadURL()
          .then((url) => {
            setThumbanilURL(url);
            setThumbnailUploaded(true);
          });
      }
    );
  };

  const handleVideoUpload = () => {
    const uploadVideo = storage.ref(`videos/${video.name}`).put(video);

    uploadVideo.on(
      "state_changed",
      (snapshot) => {
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressPercent);
      },
      (err) => {
        console.log(err);
      },
      () => {
        storage
          .ref("videos")
          .child(video.name)
          .getDownloadURL()
          .then((url) => {
            setVideoURL(url);
            setVideoUploaded(true);
          })
          .catch((err) => console.log(err));
      }
    );
  };

  const handleSubmit = () => {
    createID();
    handleVideoUpload();
    handleThumbanilUpload();
  };

  useEffect(() => {
    if (thumbnailUploaded && videoUploaded) {
      db.collection("Videos")
        .add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          id: id,
          videoURL: videoURL,
          thumbnailURL: thumbanilURL,
          title: title,
          description: description,
          channelName: currentUser.displayName,
          email: currentUser.email,
        })
        .then(() => {
          setProgress(0);
          setVideo(null);
          setTitle("");
          setThumbnail("");
          setThumbanilURL("");
          setVideoURL("");
          setDescription("");
          handleClose();
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thumbnailUploaded, videoUploaded]);

  return (
    <div>
      <div className="SelectVideo__header">
        <DialogTitle>Upload Videos</DialogTitle>
        <Close className="selectvideo__closeIcon" onClick={handleClose} />
      </div>

      <Divider />

      <DialogContent>
        <DialogTitle>Details</DialogTitle>

        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Description"
          multiline
          rows={10}
          variant="outlined"
          fullWidth
          placeHolder="Tell viewers about your video"
          style={{ marginTop: "30px" }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className="custom-file-input add-thumbanil"
          type="file"
          onChange={handleChange}
        />

        <progress value={progress} max="100" />

        <DialogActions>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Upload
          </Button>
        </DialogActions>
      </DialogContent>
    </div>
  );
};

export default UploadVideo;
