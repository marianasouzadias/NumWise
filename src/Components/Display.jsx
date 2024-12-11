import PropTypes from "prop-types";
import "../Styles/DisplayStyle.css";

const Display = ({ value, theme }) => {
  return (
    <div className={`display-container $ {theme}`}>
      <div className="display">
        <span className="input-number">{value}</span>
      </div>
    </div>
  );
};

Display.prototype = {
  value: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
};
export default Display;
