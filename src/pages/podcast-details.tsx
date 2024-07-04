import { useEffect, useState } from "react"
import { usePodcastApi } from "../api/usePodcast";
import { useParams } from "react-router-dom";
import { PodcastEpisode, PodcastInfo } from "../models/podcast-details";
import { PodcastEntry } from "../models/podcast";
import { DetailsCard } from "../components/details-card/details-card";
import { Col, Row } from "react-bootstrap";
import { EpisodesCounter } from "../components/episodes-counter/episodes-counter";
import { CustomTable } from "../components/custom-table/custom-table";
import { formatReleaseDate, formatTrackTime } from "../utilities/utilities";

export const PodcastDetails = () => {
  let { podcastId } = useParams();

  const { getPodcastDetails } = usePodcastApi();
  const [podcastDetails, setPodcastDetails] = useState<[PodcastInfo, ...PodcastEpisode[]]>();

  const storedPodcastList: PodcastEntry[] = localStorage.getItem("podcastList") ? JSON.parse(localStorage.getItem("podcastList") as string) : [];
  const podcast: PodcastEntry | undefined = podcastId ? storedPodcastList.filter(podcast => podcast.id.attributes["im:id"] === podcastId)[0] : undefined;
  const episodeCounter = podcastDetails ? podcastDetails.length - 1 : 0;

  useEffect(() => {
    if (podcastId) getPodcastDetails(+podcastId).then(data => setPodcastDetails(data));
  }, [])

  const columns = [
    { key: 'title', header: 'Title', render: (item: any) => item.title },
    { key: 'date', header: 'Date', render: (item: any) => item.date },
    { key: 'duration', header: 'Duration', render: (item: any) => item.duration },
  ];

  const data = podcastDetails ?
    podcastDetails.slice(1).map(({ trackName, trackId, releaseDate, trackTimeMillis }) => ({
      title: trackName,
      date: formatReleaseDate(releaseDate),
      duration: formatTrackTime(trackTimeMillis),
      to: `/podcast/${podcast?.id.attributes["im:id"]}/episode/${trackId}`,
    }))
    : [];

  if (!podcast) return null;

  return (
    <Row className="m-0 mt-3">
      <Col md={3} xl={3} xxl={3}>
        <DetailsCard
          title={podcast["im:name"].label}
          author={podcast["im:artist"].label}
          imageSrc={podcast["im:image"][2].label}
          description={podcast.summary.label}
          to={`/podcast/${podcast.id.attributes["im:id"]}`}
        />
      </Col>
      <Col md={9} xl={{ offset: 1, span: 8 }} xxl={{ offset: 1, span: 8 }}>
        <EpisodesCounter count={episodeCounter} />
        <div className="mt-3">
          <CustomTable columns={columns} data={data} />
        </div>
      </Col>
    </Row>
  )
}
