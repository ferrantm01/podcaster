import { Link } from "react-router-dom";

interface DetailsCardProps {
    imageSrc: string;
    title: string;
    author: string;
    description: string;
    to: string;
}

export const DetailsCard: React.FC<DetailsCardProps> = ({ author, description, imageSrc, title, to }) => {

    // Obtiene una porción de la descripción, desde el inicio hasta el primer punto encontrado, incluyendo el punto.
    const slicedDescription = description?.substring(0, description.indexOf('.') + 1);

    return (
        <div className="details-card-container">
            <div className="details-card-image-container">
                <Link to={to} className="details-card-link">
                    <img src={imageSrc} alt={title} className="details-card-image" />
                </Link>
            </div>
            <div className="podcast-info-container">
                <Link to={to} className="details-card-link">
                    <div className="podcast-title">{title}</div>
                    <div className="podcast-author">by {author}</div>
                </Link>
            </div>
            <div className="podcast-description-container">
                <div className="podcast-description-text">Description: </div>
                <div className="podcast-description">{slicedDescription}</div>
            </div>
        </div>
    )
}
