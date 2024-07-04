interface EpisodeProps {
    title: string;
    audioUrl: string;
    description: TrustedHTML;
}

export const Episode: React.FC<EpisodeProps> = ({title,audioUrl, description }) => {

    return (
        <div className="audio-player-container">
            <h3>{title}</h3>
            <div className="audio-player-description" dangerouslySetInnerHTML={{ __html: description }} />
            <audio controls>
                <source src={audioUrl} type="audio/mp3" />
                Tu navegador no soporta el elemento de audio.
            </audio>
        </div>
    );
};
