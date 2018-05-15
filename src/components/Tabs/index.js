import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { NavLink, withRouter } from "react-router-dom";
import { colors, radius } from "constants/theme";
import { buildPagePath, buildSectionPath } from "utils/UrlUtils";

import CustomPropTypes from "custom-prop-types";

export const TabsContainer = styled.nav`
  display: flex;
  justify-content: center;
  padding: 0;
  position: relative;
  bottom: -1px;
`;

const Tab = styled(NavLink)`
  font-size: 1em;
  font-weight: bold;
  color: ${colors.lightGrey};
  padding: 0.3em 2em;
  border: 1px solid #666;
  border-bottom: none;
  background-color: #666;
  text-decoration: none;
  border-radius: ${radius} ${radius} 0 0;
  margin: 0 0.25em 0 0;

  &[aria-current="true"] {
    background: ${colors.white};
    color: ${colors.secondary};
    border: 1px solid ${colors.bordersLight};
    border-bottom: none;
  }
`;

const TabsBody = styled.div`
  background: ${colors.white};
  border: 1px solid ${colors.bordersLight};
  border-radius: ${radius};
`;

<<<<<<< HEAD
const DisabledTab = Tab.withComponent("span");

export const UnwrappedTabs = ({ match, children }) => {
  const url = match.params.pageId
    ? buildPagePath(match.params)
    : buildSectionPath(match.params);
=======
// TODO: find out why route matching doesn't work automatically
// Given a route /foo/:bar/blah
// I would expect that /foo, /foo/1/blah, /foo/2/blah etc would all "match"
// But this is not the case. Unsure if bug or implementation issue
export const UnwrappedTabs = ({
  questionnaire,
  section,
  page,
  match,
  children,
  ...otherProps
}) => {
  const tabIsActive = view => () => match.url.includes(view);
>>>>>>> Integrate routing components with the GraphQL API changes.

  return (
    <div>
      <TabsContainer>
<<<<<<< HEAD
        <Tab to={url}>Builder</Tab>
        <DisabledTab>Routing</DisabledTab>
=======
        <Tab
          to={getLink(questionnaire.id, section.id, page && page.id)}
          activeClassName="selected"
          isActive={tabIsActive}
        >
          Builder
        </Tab>
        <Tab
          to={getLink(questionnaire.id, section.id, page && page.id, "routing")}
          activeClassName="selected"
          isActive={tabIsActive}
        >
          Routing
        </Tab>
>>>>>>> Integrate routing components with the GraphQL API changes.
      </TabsContainer>
      <TabsBody>{children}</TabsBody>
    </div>
  );
};

UnwrappedTabs.propTypes = {
  match: CustomPropTypes.match,
  children: PropTypes.node.isRequired
};

export default withRouter(UnwrappedTabs);
