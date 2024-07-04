export interface PodcastDetailsRequest {
    resultCount: number;
    results: [PodcastInfo, ...PodcastEpisode[]];
}

export interface PodcastInfo {
    wrapperType: string;
    kind: string;
    artistId: number;
    collectionId: number;
    trackId: number;
    artistName: string;
    collectionName: string;
    trackName: string;
    collectionCensoredName: string;
    trackCensoredName: string;
    artistViewUrl: string;
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
    trackTimeMillis: number;
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
    artworkUrl160: string;
    episodeContentType: string;
    episodeFileExtension: string;
    episodeUrl: string;
    feedUrl: string;
    artworkUrl600: string;
    closedCaptioning: string;
    collectionId: number;
    collectionName: string;
    contentAdvisoryRating: string;
    trackViewUrl: string;
    collectionViewUrl: string;
    trackTimeMillis: number;
    genres: Genre[];
    episodeGuid: string;
    description: string;
    releaseDate: string;
    previewUrl: string;
    trackId: number;
    trackName: string;
    artistIds: number[];
    shortDescription: string;
    artworkUrl60: string;
    artistViewUrl: string;
    kind: string;
    wrapperType: string;
}

export interface Genre {
    name: string;
    id: string;
}
