import React, { useState } from "react";
import data from "../data";
import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";

const Typeahead = ({ suggestions, handleSelect }) => {
  const [term, setTerm] = useState("");

  const matches = suggestions.filter((suggestion) => {
    const lowerCasedTitle = suggestion.title.toLowerCase();
    const lowerCasedTerm = term.toLowerCase();
    const isIncluded = lowerCasedTitle.includes(lowerCasedTerm);
    const MoreThanTwo = term.length >= 2;
    return isIncluded && MoreThanTwo;
  });

  console.log(matches);

  return (
    <Wrapper>
      <Row>
        <Input
          type="text"
          placeholder="search here"
          term={term}
          onChange={(ev) => setTerm(ev.target.value)}
          onKeyDown={(ev) => {
            if (ev.key === "Enter") {
              handleSelect(term);
            }
          }}
        ></Input>
        <ClearBtn onClick={() => setTerm("")}>Clear</ClearBtn>
      </Row>
      {term.length >= 2 && (
        <Suggestions>
          {matches.map((match) => {
            return (
              <Suggestion
                onClick={() => {
                  handleSelect(match.title);
                }}
              >
                {match.title}
              </Suggestion>
            );
          })}
        </Suggestions>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 3em;
  text-align: center;
`;

const Input = styled.input`
  border: solid 1px grey;
  padding: 2px;
  width: 20rem;
  height: 2em;
  border-radius: 4px;
`;

const ClearBtn = styled.button`
  background-color: purple;
  margin-left: 4px;
  border: none;
  color: white;
  width: 4em;
  height: 2em;
  border-radius: 4px;
`;

const Row = styled.div``;

const Suggestions = styled.ul`
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: absolute;
  width: auto;
  left: 230px;
  width: 20em;
  padding: 10px;
`;

const Suggestion = styled.li`
  padding: 6px;

  &:hover {
    background-color: #fffbe6;
  }
  cursor: pointer;
`;

export default Typeahead;
