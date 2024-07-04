import { useEffect, useState } from "react"
import { usePodcastApi } from "../api/usePodcast";
import { useParams } from "react-router-dom";
import { PodcastEpisode, PodcastInfo } from "../models/podcast-details";
import { PodcastEntry } from "../models/podcast";
import { DetailsCard } from "../components/details-card/details-card";
import { Col, Row } from "react-bootstrap";

export const PodcastDetails = () => {
  let { podcastId } = useParams();

  const { getPodcastDetails } = usePodcastApi();
  const [podcastDetails, setPodcastDetails] = useState<[PodcastInfo, ...PodcastEpisode[]]>();

  const storedPodcastList: PodcastEntry[] = localStorage.getItem("podcastList") ? JSON.parse(localStorage.getItem("podcastList") as string) : [];
  const podcast: PodcastEntry | undefined = podcastId ? storedPodcastList.filter(podcast => podcast.id.attributes["im:id"] === podcastId)[0] : undefined;

  useEffect(() => {
    if (podcastId) getPodcastDetails(+podcastId).then(data => setPodcastDetails(data));
  }, [])

  if (!podcast) return null;

  return (
    <Row className="m-0 mt-5">
      <Col>
        <DetailsCard
          title={podcast["im:name"].label}
          author={podcast["im:artist"].label}
          imageSrc={podcast["im:image"][0].label}
          description={podcast.summary.label}
        />
      </Col>
      <Col>
        <div>EPISODES 66</div>
        <div>TABLE</div>
      </Col>
    </Row>
  )
}
