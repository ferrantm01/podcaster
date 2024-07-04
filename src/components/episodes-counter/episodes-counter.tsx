interface EpisodesCounter {
    count: number;
}

export const EpisodesCounter: React.FC<EpisodesCounter> = ({ count }) => {
    return (
        <div className="episodes-counter-container">
            <div>Episodes: {count}</div>
        </div>
    )
}
