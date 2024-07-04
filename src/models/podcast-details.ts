export interface PodcastDetailsRequest {
    resultCount: number;
    results: [PodcastInfo, ...PodcastEpisode[]];
}

export interface PodcastInfo {
    wrapperType: string;
    kind: string;
    collectionId: number;
    trackId: number;
    artistName: string;
    collectionName: string;
    trackName: string;
    collectionCensoredName: string;
    trackCensoredName: string;
    collectionViewUrl: string;
    feedUrl: string;
    trackViewUrl: string;
    artworkUrl30: string;
    artworkUrl60: string;
    artworkUrl100: string;
    collectionPrice: number;
    trackPrice: number;
    collectionHdPrice: number;
    releaseDate: string;
    collectionExplicitness: string;
    trackExplicitness: string;
    trackCount: number;
    country: string;
    currency: string;
    primaryGenreName: string;
    contentAdvisoryRating: string;
    artworkUrl600: string;
    genreIds: string[];
    genres: string[];
}

export interface PodcastEpisode {
    country: string;
    episodeFileExtension: string;
    artworkUrl160: string;
    collectionViewUrl: string;
    episodeContentType: string;
    feedUrl: string;
    closedCaptioning: string;
    collectionId: number;
    collectionName: string;
    previewUrl: string;
    artworkUrl600: string;
    genres: Genre[];
    episodeGuid: string;
    description: string;
    artistIds: any[];
    trackId: number;
    trackName: string;
    shortDescription: string;
    episodeUrl: string;
    artworkUrl60: string;
    contentAdvisoryRating: string;
    trackViewUrl: string;
    releaseDate: string;
    kind: string;
    wrapperType: string;
}

export interface Genre {
    name: string;
    id: string;
}
