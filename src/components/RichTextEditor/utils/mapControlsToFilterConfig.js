import { mapKeys } from "lodash";

const mapper = {
  bold: { format: "BOLD", type: "styles" },
  emphasis: { format: "ITALIC", type: "styles" },
  list: { format: "unordered-list-item", type: "blocks" },
  heading: { format: "header-two", type: "blocks" }
};

export function mapControlsToFilterConfig(controls) {
  const filterConfiguration = {
    blocks: [],
    styles: [],
    entities: [],
    maxNesting: 0,
    whitespacedCharacters: []
  };

  mapKeys(controls, (value, key) => {
    if (mapper[key]) {
      filterConfiguration[mapper[key].type].push(mapper[key].format);
    }
  });
  return filterConfiguration;
}
