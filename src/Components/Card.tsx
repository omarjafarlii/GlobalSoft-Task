import React from 'react';

interface CardProps {
  destination: string;
  flag: string;
  imageUrl: string;
  onClick: (destination: string) => void;
}

const Card: React.FC<CardProps> = ({ destination, flag, imageUrl, onClick }) => {
  return (
    <div
      onClick={() => onClick(destination)}
      className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer hover:shadow-2xl transition duration-300 transform hover:scale-[1.02] h-[250px]"
    >
      <img
        src={imageUrl}
        alt={`Image of ${destination}`}
        className="w-full h-full object-cover"
      />
      
      <div className="absolute inset-0 bg-opacity-30 flex items-end p-4">
        <h3 className="text-2xl font-bold text-white leading-tight">
          {destination} {flag}
        </h3>
      </div>
    </div>
  );
};

export default Card;