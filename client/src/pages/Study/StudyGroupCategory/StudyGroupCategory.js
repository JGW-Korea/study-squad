import React from "react";
import { Link } from "react-router-dom";

import { TYPE } from "../../../constants/StudyCategoryType/TYPE";

function StudyGroupCategory() {
  return (
    <div>
      {TYPE.map((type, idx) => (
        <div key={idx}>
          <Link to={`/study-create/${type.url}`}>{type.name}</Link>
        </div>
      ))}
    </div>
  );
}

export default StudyGroupCategory;
