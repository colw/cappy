import React, { useState } from "react";
import { useIntervalWithInitial } from "../tools/hooks";
import { fetchSugar, fetchLast24 } from "../tools/fetch";

import SugarValue from "./SugarValue";
import DailyGraph from "./DailyGraph";
import DailyPie from "./DailyPie";

import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

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

function calcAverage(newData) {
  const newAverage =
    newData.reduce((sum, current) => sum + current.sgv, 0) / newData.length;
  console.log(newAverage);
  return newAverage;
}

function calcTimeInRange(newData) {
  const lowMark = 70;
  const highMark = 180;

  const values = newData.map((d) => d.sgv);
  const low = (values.filter((v) => v < lowMark).length / values.length) * 100;
  const good =
    (values.filter((v) => v >= lowMark && v <= highMark).length /
      values.length) *
    100;
  const high =
    (values.filter((v) => v > highMark).length / values.length) * 100;

  const result = [
    { value: low, name: "low" },
    { value: good, name: "good" },
    { value: high, name: "high" },
  ];
  console.log(values, result);
  return result;
}

const Main = function () {
  const {
    loading: entryLoading,
    error: entryError,
    data: glucoseValue,
  } = useQuery(LATEST_GLUCOSE_VALUE, {
    pollInterval: 2.5 * 60 * 1000,
  });

  const {
    loading: entriesLoading,
    error: entriesError,
    data: glucoseValues,
  } = useQuery(LATEST_GLUCOSE_VALUES, {
    pollInterval: 2.5 * 60 * 1000,
  });

  if (entryLoading || entriesLoading) {
    return <div>Fetching current glucose…</div>;
  }

  return (
    <div>
      <SugarValue {...glucoseValue.entry} />
      <DailyGraph data={glucoseValues.entries} />
      <div>Average: {calcAverage(glucoseValues.entries).toFixed(0)}</div>
      <DailyPie data={calcTimeInRange(glucoseValues.entries)} />
    </div>
  );
};

export default Main;
