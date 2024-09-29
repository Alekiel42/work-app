import React, { ReactNode } from 'react';
import './Card.scss';

type CardProps = {
    children: ReactNode;
};

const Card: React.FC<CardProps> = ({ children}) => {
    return (
        <div className={"card"}>
            {children}
        </div>
    );
};

export default Card;
