import React from "react";
import withSeamlessness from "../EditorSurface/withSeamlessness";
import withChangeHandler from "components/Forms/withChangeHandler";
import { flow } from "lodash";

const Input = props => <input type="text" {...props} />;

export default flow(withChangeHandler, withSeamlessness)(Input);
