import React from "react";
import { storiesOf } from "@storybook/react";
import TextAreaAnswer from "components/Answers/TextAreaAnswer";
import styled from "styled-components";
import { action } from "@storybook/addon-actions";

const Background = styled.div`
  padding: 1em;
  display: block;
  max-width: 20em;
`;

const answer = {
  label: "Lorem ipsum",
  description: "Nullam id dolor id nibh ultricies."
};

storiesOf("AnswerTypes/TextAreaAnswer", module)
  .addDecorator(story =>
    <Background>
      {story()}
    </Background>
  )
  .add("Empty", () =>
    <TextAreaAnswer answer={{}} onChange={action("changed")} />
  )
  .add("Prefilled", () =>
    <TextAreaAnswer answer={answer} onChange={action("changed")} />
  );