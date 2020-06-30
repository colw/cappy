import { gql } from "apollo-boost";

const LATEST_GLUCOSE_VALUE = gql`
  {
    entry {
      sgv
      dateString
      direction
    }
  }
`;

const LATEST_GLUCOSE_VALUES = gql`
  {
    entries {
      sgv
      dateString
      direction
    }
  }
`;

export default {
  LATEST_GLUCOSE_VALUE,
  LATEST_GLUCOSE_VALUES,
};
