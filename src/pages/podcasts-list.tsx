import { useEffect, useState } from "react";
import { PodcastEntry } from "../models/podcast";
import Card from "../components/card/card";
import { Col, Row } from "react-bootstrap";
import { Filter } from "../components/filter/filter";
import { usePodcastApi } from "../api/usePodcast";

export const PodcastsList = () => {
  const [podcastList, setPodcastList] = useState<PodcastEntry[]>([]);
  const [filter, setFilter] = useState("");
  const { getPodcastList } = usePodcastApi();

  useEffect(() => {
    getPodcastList().then(list => setPodcastList(list));
  }, [])

  const filteredPodcastList = podcastList.filter(podcast =>
    podcast["im:name"].label.toLowerCase().includes(filter.toLowerCase()) ||
    podcast["im:artist"].label.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <Row className="m-0 mt-5">
        <Col sm={12} md={{ offset: 8, span: 4 }} xl={{ offset: 9, span: 3 }} xxl={{ offset: 10, span: 2 }}>
          <Filter filter={filter} setFilter={setFilter} />
        </Col>
      </Row>
      <Row className="m-0">
        {
          filteredPodcastList.map((podcast) => {
            return (
              <Col xs={12} sm={6} md={3} xl={2} className="card-column" key={+podcast.id.attributes["im:id"]}>
                <Card
                  to={`/podcast/${podcast.id.attributes["im:id"]}`}
                  title={podcast["im:name"].label}
                  author={podcast["im:artist"].label}
                  imageSrc={podcast["im:image"][0].label} />
              </Col>
            )
          })
        }
      </Row>
    </>
  );
};
