// https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json
// https://itunes.apple.com/lookup?id=934552872&media=podcast&entity=podcastEpisode&limit=20

import { PodcastEntry, PodcastResponse } from "../models/podcast";
import { PodcastDetailsRequest, PodcastEpisode, PodcastInfo } from "../models/podcast-details";

export interface PodcastDetailsCacheData {
  [key: number]: [PodcastInfo, ...PodcastEpisode[]];
}

export const usePodcastApi = () => {

  const getPodcastList = async (limit: number = 100): Promise<PodcastEntry[]> => {

    const storedPodcastList = localStorage.getItem("podcastList");
    const podcastList: PodcastEntry[] = storedPodcastList ? JSON.parse(storedPodcastList) : [];

    const storedTimer = localStorage.getItem("podcastListTimer");
    const timer: number = storedTimer ? JSON.parse(storedTimer) : 0;

    const currentTime = Date.now();
    const isCacheExpired = currentTime - timer > 24 * 60 * 60 * 1000;

    if (podcastList.length === 0 || isCacheExpired) {
      try {
        const response = await fetch(`https://itunes.apple.com/us/rss/toppodcasts/limit=${limit}/genre=1310/json`);
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        const data: PodcastResponse = await response.json();
        
        localStorage.setItem("podcastList", JSON.stringify(data.feed.entry));
        localStorage.setItem("podcastListTimer", JSON.stringify(currentTime));

        return data.feed.entry;
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
        throw error;
      }
    }

    return podcastList;
  };

  const getPodcastDetails = async (id: number, limit: number = 20): Promise<[PodcastInfo, ...PodcastEpisode[]]> => {

    const storedPodcastDetails = localStorage.getItem("podcastDetails");
    const podcastList: PodcastDetailsCacheData = storedPodcastDetails ? JSON.parse(storedPodcastDetails) : [];

    const storedTimer = localStorage.getItem("podcastDetailsTimer");
    const timer: number = storedTimer ? JSON.parse(storedTimer) : 0;

    const currentTime = Date.now();
    const isCacheExpired = currentTime - timer > 24 * 60 * 60 * 1000;

    if (!podcastList[id] || isCacheExpired) {
      try {
        const response = await fetch(`https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=${limit}`);
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }

        const data: PodcastDetailsRequest = await response.json();
        let newPodcastList: PodcastDetailsCacheData;

        if (isCacheExpired) {
          newPodcastList = {
            [id]: [...data.results]
          }
          localStorage.setItem("podcastDetailsTimer", JSON.stringify(currentTime));
        } else {
          newPodcastList = {
            ...podcastList,
            [id]: [...data.results]
          };
        }

        localStorage.setItem("podcastDetails", JSON.stringify(newPodcastList));

        return newPodcastList[id];
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
        throw error;
      }
    }

    return podcastList[id];
  }

  return {
    getPodcastList,
    getPodcastDetails
  };
};
