import React, { useState } from "react";
import { useIntervalWithInitial } from "../tools/hooks";
import { fetchSugar, fetchLast24 } from "../tools/fetch";

import SugarValue from "./SugarValue";
import DailyGraph from "./DailyGraph";
import DailyPie from "./DailyPie";

import { useQuery } from "@apollo/react-hooks";
import queries from "../graphql/queries";
import { calcAverage, calcTimeInRange } from "../tools/calculations";

const Main = function () {
  const {
    loading: entryLoading,
    error: entryError,
    data: glucoseValue,
  } = useQuery(queries.LATEST_GLUCOSE_VALUE, {
    pollInterval: 2.5 * 60 * 1000,
  });

  const {
    loading: entriesLoading,
    error: entriesError,
    data: glucoseValues,
  } = useQuery(queries.LATEST_GLUCOSE_VALUES, {
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
