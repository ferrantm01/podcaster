export interface Author {
    name: {
        label: string;
    };
    uri: {
        label: string;
    };
}

export interface Image {
    label: string;
    attributes: {
        height: string;
    };
}

export interface Price {
    label: string;
    attributes: {
        amount: string;
        currency: string;
    };
}

export interface Link {
    attributes: {
        rel: string;
        type?: string;
        href: string;
    };
}

export interface ID {
    label: string;
    attributes: {
        "im:id": string;
    };
}

export interface ContentType {
    attributes: {
        term: string;
        label: string;
    };
}

export interface Category {
    attributes: {
        "im:id": string;
        term: string;
        scheme: string;
        label: string;
    };
}

export interface ReleaseDate {
    label: string;
    attributes: {
        label: string;
    };
}

export interface PodcastEntry {
    "im:name": {
        label: string;
    };
    "im:price": Price;
    "im:image": Image[];
    summary: {
        label: string;
    };
    "im:artist": {
        label: string;
        attributes?: {
            href: string;
        };
    };
    title: {
        label: string;
    };
    link: Link;
    id: ID;
    "im:contentType": ContentType;
    category: Category;
    "im:releaseDate": ReleaseDate;
    rights?: {
        label: string;
    };
}

export interface Feed {
    author: Author;
    entry: PodcastEntry[];
    updated: {
        label: string;
    };
    rights: {
        label: string;
    };
    title: {
        label: string;
    };
    icon: {
        label: string;
    };
    link: Link[];
    id: {
        label: string;
    };
}

export interface PodcastResponse {
    feed: Feed;
}
