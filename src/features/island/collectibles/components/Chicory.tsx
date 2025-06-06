import React from "react";

import image from "assets/sfts/chicory.webp";
import { PIXEL_SCALE } from "features/game/lib/constants";

export const Chicory: React.FC = () => {
  return (
    <>
      <img
        src={image}
        style={{
          width: `${PIXEL_SCALE * 19}px`,
          bottom: `${PIXEL_SCALE * 0}px`,
        }}
        className="absolute"
        alt="Chicory"
      />
    </>
  );
};
