import React from 'react';

function AmenityCard({ amenity }) {
  const [isHovered, setIsHovered] = React.useState(false);

  function handleClick() {
    alert(`You clicked the ${amenity.amenityName} amenity`);
    // Do something else here when a card is clicked
  }

  function handleMouseEnter() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
  }

  const cardStyle = {
    position: 'relative',
    display: 'inline-block',
    width: 'calc(50% - 100px)',
    height: '450px',
    margin: '50px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.2s ease-out',
    ...(isHovered && {
      transform: 'translateY(-5px)',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
    }),
  };

  const titleStyle = {
    fontSize: '16px',
    margin: '10px',
    fontWeight: 'bold',
    textAlign: 'center',
  };

  const imageStyle = {
    display: 'block',
    width: '100%',
    height: 'auto',
    maxHeight: '100%',
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={cardStyle}
    >
      <h2 style={titleStyle}>{amenity.amenityName}</h2>
      <img src={amenity.imageUrl} alt={amenity.amenityName} style={imageStyle} />
    </div>
  );
}

export default AmenityCard;
