import { useLoading } from "../context/loading-context";
import { PodcastEntry, PodcastResponse } from "../models/podcast";
import { PodcastDetailsRequest, PodcastEpisode, PodcastInfo } from "../models/podcast-details";

export interface PodcastDetailsCacheData {
  [key: number]: [PodcastInfo, ...PodcastEpisode[]];
}

export const usePodcastApi = () => {
  const { loading, setLoading } = useLoading();

  // Función que maneja el estado de carga, aplicando un retraso de 1 segundo (por decisión de diseño).
  const setLoadingWithDelay = (isLoading: boolean) => {
    if (!isLoading) {
      setTimeout(() => {
        setLoading(isLoading);
      }, 1000);
    } else {
      setLoading(isLoading);
    }
  };

  const getPodcastList = async (limit: number = 100): Promise<PodcastEntry[]> => {
    const storedPodcastList = localStorage.getItem("podcastList");
    const podcastList: PodcastEntry[] = storedPodcastList ? JSON.parse(storedPodcastList) : [];

    const storedTimer = localStorage.getItem("podcastListTimer");
    const timer: number = storedTimer ? JSON.parse(storedTimer) : 0;

    const currentTime = Date.now();
    const isCacheExpired = currentTime - timer > 24 * 60 * 60 * 1000;

    // Si la lista de podcasts está vacía o han pasado más de 24 horas, se vuelve a lanzar la petición y se guardan los datos relevantes en el localStorage.
    if (podcastList.length === 0 || isCacheExpired) {
      setLoadingWithDelay(true);
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
      } finally {
        setLoadingWithDelay(false);
      }
    }

    setLoadingWithDelay(false);
    return podcastList;
  };

  const getPodcastDetails = async (id: number, limit: number = 20): Promise<[PodcastInfo, ...PodcastEpisode[]]> => {
    const storedPodcastDetails = localStorage.getItem("podcastDetails");
    const podcastList: PodcastDetailsCacheData = storedPodcastDetails ? JSON.parse(storedPodcastDetails) : [];

    const storedTimer = localStorage.getItem("podcastDetailsTimer");
    const timer: number = storedTimer ? JSON.parse(storedTimer) : 0;

    const currentTime = Date.now();
    const isCacheExpired = currentTime - timer > 24 * 60 * 60 * 1000;

    // Si no se encuentra el podcast o han pasado más de 24 horas, se vuelve a lanzar la petición y se guardan los datos relevantes en el localStorage.
    if (!podcastList[id] || isCacheExpired) {
      setLoadingWithDelay(true);
      try {
        const response = import.meta.env.MODE === "production" ?
          await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=${limit}`)}`) :
          await fetch(`https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=${limit}`);

        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }

        let data: PodcastDetailsRequest;

        // En modo de producción, se aplica una lógica diferente para procesar los datos recibidos.
        if (import.meta.env.MODE === "production") {
          const allOriginsData = await response.json();
          data = JSON.parse(allOriginsData.contents);
        } else {
          data = await response.json();
        }
        let newPodcastList: PodcastDetailsCacheData;

        // Si la caché ha expirado, se limpia la lista anterior y se guarda la nueva información.
        if (isCacheExpired) {
          newPodcastList = {
            [id]: [...data.results]
          };
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
      } finally {
        setLoadingWithDelay(false);
      }
    }

    setLoadingWithDelay(false);
    return podcastList[id];
  };

  return {
    getPodcastList,
    getPodcastDetails,
    loading
  };
};
