import React, { useState } from "react";
import styled from "styled-components";

const Suggestion = (props) => {
  const {
    suggestion,
    onClick,
    searchTerm,
    category,
    isSelected,
    index,
    setSelectedSuggestion,
  } = props;

  const lowerCaseSug = suggestion.toLowerCase();
  const matchIndex = lowerCaseSug.indexOf(searchTerm.toLowerCase());
  const matchEnd = matchIndex + searchTerm.length;
  const firstHalf = suggestion.slice(0, matchEnd);
  const prediction = suggestion.slice(matchEnd);

  return (
    <Wrapper
      onMouseEnter={(event) => {
        setSelectedSuggestion(index);
      }}
      onClick={onClick}
      style={{
        background: isSelected ? "hsla(50deg, 100%, 80%, 0.25)" : "transparent",
      }}
    >
      <span>
        {firstHalf}
        <Prediction>{prediction}</Prediction>
      </span>{" "}
      <Category>in {category.name}</Category>
    </Wrapper>
  );
};
const Wrapper = styled.li`
  padding: 6px;
  cursor: pointer;
`;

const Prediction = styled.span`
  font-weight: bold;
`;

const Category = styled.span`
  color: purple;
  font-size: 0.5rem;
`;

export default Suggestion;
