import React, { useState } from "react";
import data from "../data";
import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";
import Suggestion from "./Suggestion";

const Typeahead = (props) => {
  const [term, setTerm] = useState("");
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);

  const { suggestions, handleSelect, categories } = props;

  const matches = suggestions.filter((suggestion) => {
    const lowerCasedTitle = suggestion.title.toLowerCase();
    const lowerCasedTerm = term.toLowerCase();
    const isIncluded = lowerCasedTitle.includes(lowerCasedTerm);
    const MoreThanTwo = term.length >= 2;
    return isIncluded && MoreThanTwo;
  });

  return (
    <Wrapper>
      <Row>
        <Input
          type="text"
          placeholder="search here"
          term={term}
          onChange={(ev) => setTerm(ev.target.value)}
          onKeyDown={(ev) => {
            switch (ev.key) {
              case "Enter": {
                handleSelect(matches[selectedSuggestion].title);

                return;
              }
              case "ArrowUp": {
                if (selectedSuggestion <= 0) {
                  return;
                }
                setSelectedSuggestion(selectedSuggestion - 1);
                return;
              }
              case "ArrowDown": {
                if (selectedSuggestion >= matches.length - 1) {
                  return;
                }
                setSelectedSuggestion(selectedSuggestion + 1);
                return;
              }
            }
          }}
        ></Input>
        <ClearBtn onClick={() => setTerm("")}>Clear</ClearBtn>
      </Row>
      {term.length >= 2 && (
        <Suggestions>
          {matches.map((match, index) => {
            const category = categories[match.categoryId];
            const isSelected = index === selectedSuggestion;

            return (
              <Suggestion
                key={match.id}
                onClick={() => {
                  handleSelect(match.title);
                }}
                suggestion={match.title}
                searchTerm={term}
                category={category}
                isSelected={isSelected}
                setSelectedSuggestion={setSelectedSuggestion}
                index={index}
              />
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
  width: auto;
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

const Row = styled.div`
  width: auto;
`;

const Suggestions = styled.ul`
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  width: auto;
  padding: 10px;
`;

export default Typeahead;
