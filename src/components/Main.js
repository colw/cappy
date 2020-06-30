import React, { useState } from "react";
import { useIntervalWithInitial } from "../tools/hooks";
import { fetchSugar, fetchLast24 } from "../tools/fetch";
import { useQuery } from "@apollo/react-hooks";
import { useTranslation } from "react-i18next";

import SugarValue from "./SugarValue";
import DailyGraph from "./DailyGraph";
import DailyPie from "./DailyPie";

import queries from "../graphql/queries";
import { calcAverage, calcTimeInRange } from "../tools/calculations";

import "./Main.css";

function LanguagewSwitcher() {
  const [, intl] = useTranslation();

  let otherLanguageCode = "en";
  if (intl.language === "en") {
    otherLanguageCode = "de";
  }

  const otherT = intl.getFixedT(otherLanguageCode);

  return (
    <div className="language-switcher">
      <button onClick={() => intl.changeLanguage(otherLanguageCode)}>
        {otherT("languageChange")}
      </button>
    </div>
  );
}

function HeaderComponent() {
  const { t } = useTranslation();
  return (
    <div className="header-component">
      <h1>{t("mainHeading")}</h1>
      <LanguagewSwitcher />
    </div>
  );
}

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

  const { t } = useTranslation();

  if (entryLoading || entriesLoading) {
    return <div>Fetching current glucose…</div>;
  }

  return (
    <div>
      <HeaderComponent />
      <SugarValue {...glucoseValue.entry} />
      <DailyGraph data={glucoseValues.entries} />
      <div>
        {t("average")}: {calcAverage(glucoseValues.entries).toFixed(0)}
      </div>
      <DailyPie data={calcTimeInRange(glucoseValues.entries)} />
    </div>
  );
};

export default Main;
