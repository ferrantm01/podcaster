import React from "react";
import { Link } from "react-router-dom";

interface CardProps {
    to: string;
    imageSrc: string;
    title: string;
    author: string;
}

const Card: React.FC<CardProps> = ({ to, imageSrc, title, author }) => {
    return (
        <div className="card-container">
            <Link to={to} className="card-link">
                <img src={imageSrc} alt={title} className="card-image" />
                <div className="card-details">
                    <div className="card-title">{title}</div>
                    <div className="card-author">Author: {author}</div>
                </div>
            </Link>
        </div>
    );
};

export default Card;
