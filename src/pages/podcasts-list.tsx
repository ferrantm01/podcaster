import { useEffect, useState } from "react";
import { PodcastEntry } from "../models/podcast";
import { usePodcast } from "../context/podcastContext";

export const PodcastsList = () => {
  const [podcastList, setPodcastList] = useState<PodcastEntry[]>([]);
  const [filter, setFilter] = useState("");
  const { getPodcastCacheList } = usePodcast();
  
  useEffect(() => {
    getPodcastCacheList().then(list => setPodcastList(list));
  }, [getPodcastCacheList]);
  
  const filteredPodcastList = podcastList.filter(podcast =>
    podcast["im:name"].label.toLowerCase().includes(filter.toLowerCase()) ||
    podcast["im:artist"].label.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filtrar podcasts..."
      />
      {
       filteredPodcastList.map((podcast) => {
          return <div key={podcast.id.label}>{podcast["im:name"].label} ------- {podcast["im:artist"].label}</div>
        })
      }
      
    </>
  );
};
