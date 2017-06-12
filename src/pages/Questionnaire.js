import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Button from "components/Button";
import ButtonGroup from "components/ButtonGroup";
import LinkButton from "components/LinkButton";
import FileUpload from "components/FileUpload";

import Title from "components/Title";

import { colors, radius } from "constants/theme";

const Centered = styled.div`
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PanelWithTitle = styled.div`
  text-align: center;
  position: relative;
  top: -4em;
`;

const Panel = styled.div`
  border-radius: ${radius};
  padding: 3em 3em;
  background-color: #FFF;
  display: flex;
  flex: 1 1 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid ${colors.borders};
`;

const PanelTitle = styled(Title)`
  margin-bottom: 1em;
`;

const QuestionnairePage = ({ onFileSelected }) =>
  <Centered>
    <PanelWithTitle>
      <PanelTitle>Select to begin</PanelTitle>
      <Panel>
        <ButtonGroup vertical>
          <LinkButton to="/create" id="btn-create-questionnaire" primary>
            Create questionnaire
          </LinkButton>
          <FileUpload onFileSelected={onFileSelected} accept=".json">
            <Button id="btn-load-questionnaire" secondary>
              Load questionnaire
            </Button>
          </FileUpload>
        </ButtonGroup>
      </Panel>
    </PanelWithTitle>
  </Centered>;

QuestionnairePage.propTypes = {
  onFileSelected: PropTypes.func.isRequired
};

export default QuestionnairePage;