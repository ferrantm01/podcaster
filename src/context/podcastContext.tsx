import React, { createContext, useContext, useState } from "react";
import { PodcastEntry } from "../models/podcast";
import { usePodcastApi } from "../api/usePodcast";

interface PodcastContextType {
    getPodcastCacheList: () => Promise<PodcastEntry[]>;
}

export interface PodcastListCache {
    data: PodcastEntry[];
    timer: number;
}

const PodcastContext = createContext<PodcastContextType>({
    getPodcastCacheList: async () => [],
});


export const PodcastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [podcastListCache, setPodcastListCache] = useState<PodcastListCache>({ data: [], timer: 0 });

    const { getPodcastList } = usePodcastApi();

    const getPodcastCacheList = async (): Promise<PodcastEntry[]> => {

        const currentTime = Date.now();
        const isCacheExpired = currentTime - podcastListCache.timer > 24 * 60 * 60 * 1000;

        if (podcastListCache.data.length === 0 || isCacheExpired) {
            const data = await getPodcastList();
            setPodcastListCache({ data, timer: currentTime });
        }

        return podcastListCache.data;
    }

    return (
        <PodcastContext.Provider value={{ getPodcastCacheList }}>
            {children}
        </PodcastContext.Provider>
    );
};

export const usePodcast = () => {
    const context = useContext(PodcastContext);
    return context;
};
