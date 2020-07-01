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

import { Flex, Box, Heading, Button } from "rebass";

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
      <Button
        onClick={() => intl.changeLanguage(otherLanguageCode)}
        variant="primary"
      >
        {otherT("languageChange")}
      </Button>
    </div>
  );
}

function HeaderComponent() {
  const { t } = useTranslation();
  return (
    <Flex className="header-component">
      <Heading fontSize={[5, 6, 7]}>{t("mainHeading")}</Heading>
      <LanguagewSwitcher />
    </Flex>
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
    <Flex
      sx={{ flexDirection: "column", marginTop: "10px", marginLeft: "20px" }}
    >
      <Box>
        <HeaderComponent />
      </Box>
      <Box>
        <SugarValue {...glucoseValue.entry} />
      </Box>
      <div className="average">
        {t("average")}: {calcAverage(glucoseValues.entries).toFixed(0)}
      </div>
      <h3>{t("dayGraphTitle")}</h3>
      <DailyGraph data={glucoseValues.entries} />
      <h3>{t("inRange")}</h3>
      <DailyPie data={calcTimeInRange(glucoseValues.entries)} />
    </Flex>
  );
};

export default Main;
