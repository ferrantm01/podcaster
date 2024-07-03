// https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json
// https://itunes.apple.com/lookup?id=934552872&media=podcast&entity=podcastEpisode&limit=20

import { PodcastEntry, PodcastResponse } from "../models/podcast";

export const usePodcastApi = () => {

  const getPodcastList = async (limit: number = 100): Promise<PodcastEntry[]> => {
    try {
      const response = await fetch(`https://itunes.apple.com/us/rss/toppodcasts/limit=${limit}/genre=1310/json`);
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      const data: PodcastResponse = await response.json();
      return data.feed.entry;
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
      throw error;
    }
  };

  return {
    getPodcastList,
  };
};
