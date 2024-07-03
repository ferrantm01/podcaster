import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/main.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PodcastsList } from "./pages/podcasts-list.tsx";
import { PodcastDetails } from "./pages/podcast-details.tsx";
import { EpisodeDetails } from "./pages/episode-details.tsx";
import { PodcastProvider } from "./context/podcastContext.tsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <PodcastsList />,
      },
      {
        path: "/podcast/:podcastId",
        element: <PodcastDetails />,
      },
      {
        path: "/podcast/:podcastId/episode/:episodeId",
        element: <EpisodeDetails />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PodcastProvider>
      <RouterProvider router={router} />
    </PodcastProvider>
  </React.StrictMode>
);
