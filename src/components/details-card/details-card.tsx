interface DetailsCardProps {
    imageSrc: string;
    title: string;
    author: string;
    description: string;
}

export const DetailsCard: React.FC<DetailsCardProps> = ({ author, description, imageSrc, title }) => {
    return (
        <div className="details-card-container">
            <div className="details-card-image-container">
                <img src={imageSrc} alt={title} className="details-card-image" />
            </div>
            <div>
                <div>{title}</div>
                <div>{author}</div>
            </div>
            <div>
                <div>Description: </div>
                <div>{description}</div>
            </div>
        </div>
    )
}
