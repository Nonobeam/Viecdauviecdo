import { useEffect } from "react";
import PropTypes from "prop-types";

const ViecdauviecdoLogo = ({ className = "" }) => {
  useEffect(() => {
    const font = new FontFace(
      "42dot Sans",
      "url(https://fonts.gstatic.com/s/42dotsans/v1/BXR7vFK-2v7FnQ1xTYUJy2T9rRBKbpqjqRjZYkNScXgiTCI-.ttf)"
    );
    font.load().then((loadedFont) => {
      document.fonts.add(loadedFont);
    });
  }, []);

  return (
    <span className={`font-42dot text-3xl font-bold ${className}`} style={{ fontFamily: '42dot Sans', color: '#013DC4'}}>
      Viecdauviecdo
    </span>
  );
};

ViecdauviecdoLogo.propTypes = {
  className: PropTypes.string,
};

export default ViecdauviecdoLogo;