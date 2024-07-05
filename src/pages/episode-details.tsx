import { DetailsCard } from "../components/details-card/details-card";
import { useParams } from "react-router-dom";
import { PodcastEntry } from "../models/podcast";
import { Col, Row } from "react-bootstrap";
import { usePodcastApi } from "../api/usePodcast";
import { PodcastEpisode, PodcastInfo } from "../models/podcast-details";
import { useEffect, useState } from "react";
import { Episode } from "../components/audio-player/audio-player";

export const EpisodeDetails = () => {
  let { podcastId, episodeId } = useParams();
  const { getPodcastDetails } = usePodcastApi();
  const [podcastDetails, setPodcastDetails] = useState<[PodcastInfo, ...PodcastEpisode[]] | undefined>();
  const [episodeDetails, setEpisodeDetails] = useState<PodcastEpisode | undefined>();
  const storedPodcastList: PodcastEntry[] = localStorage.getItem("podcastList") ? JSON.parse(localStorage.getItem("podcastList") as string) : [];
  const podcast = podcastId ? storedPodcastList.find(podcast => podcast.id.attributes["im:id"] === podcastId) : undefined;

  // Llamamos a la API para obtener los detalles del podcast si hay un podcastId válido.
  useEffect(() => {
    if (podcastId) {
      getPodcastDetails(+podcastId).then(data => setPodcastDetails(data));
    }
  }, [podcastId]);

  // Establecemos los detalles del episodio cuando cambian los detalles del podcast.
  useEffect(() => {
    if (podcastDetails && episodeId) {
      const foundEpisode = podcastDetails.find(episode => episode.trackId === +episodeId);
      if (foundEpisode) {
        setEpisodeDetails(foundEpisode as PodcastEpisode);
      }
    }
  }, [podcastDetails, episodeId]);

  if (!podcast) return null;

  return (
    <Row className="m-0 mt-3">
      <Col md={3} xl={3} xxl={3} className="mb-3">
        <DetailsCard
          title={podcast["im:name"].label}
          author={podcast["im:artist"].label}
          imageSrc={episodeDetails?.artworkUrl600 as string}
          description={podcast.summary.label}
          to={`/podcast/${podcast.id.attributes["im:id"]}`}
        />
      </Col>
      <Col>
        {episodeDetails && (
          <Episode
            title={episodeDetails.trackName}
            audioUrl={episodeDetails.episodeUrl}
            description={episodeDetails.description}
          />
        )}
      </Col>
    </Row>
  );
};
