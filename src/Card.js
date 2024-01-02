import React from "react";

const Card = ({ image, zIndex }) => {
  const styles = {
    position: "absolute",
    zIndex: zIndex,
    transform: `rotate(${Math.random() * 45}deg)`,
  };
  return <img src={image} style={styles} alt={`Playing Card`}></img>;
};

export default Card;
