import "../Stayles/displayStayle.css";

const Display = ({ value }) => {
  return (
    <div className="display-container">
      <h1 className="title">NumWise</h1>
      <div className="display">
        <span className="equals">=</span>
        <span className="input-number">{value}</span>
      </div>
    </div>
  );
};
export default Display;
