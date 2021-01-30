import React from "react";
import {
  Header,
  Sidebar,
  Main,
  Watch,
  PreviewChannel,
  Login,
  SelectVideo,
} from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useAppContext } from "./context/appContext";

function App() {
  const { appState, showUploadVideo, videos } = useAppContext();

  return (
    <Router>
      <Switch>
        {appState === "home" && (
          <div className="home">
            {videos.map((item) => (
              <Route path={`/watch/${item.id}`} key={item.id}>
                <Header />
                <Watch video={item} />
              </Route>
            ))}

            <Route path="/PreviewChannel">
              <Header />
              <div className="app">
                <Sidebar changeWidth />
                <PreviewChannel />
              </div>
            </Route>

            <Route exact path="/">
              <Header />
              <div className="app">
                <Sidebar />
                <Main />
                {showUploadVideo && <SelectVideo />}
              </div>
            </Route>
          </div>
        )}

        {appState === "login" && <Login />}
      </Switch>
    </Router>
  );
}

export default App;
