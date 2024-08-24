import React from "react";

const Loader = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <div className={`${className}`}>
      <span className="bar"></span>
      <span className="bar"></span>
      <span className="bar"></span>
    </div>
  );
};

export default Loader;
