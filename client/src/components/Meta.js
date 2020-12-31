import React from "react";
import MetaTags from "react-meta-tags";

const Meta = ({ description, content, title }) => {
  return (
    <div>
      <MetaTags>
        <title>{title}</title>
        <meta name={description} content={content} />
      </MetaTags>
    </div>
  );
};

export default Meta;
