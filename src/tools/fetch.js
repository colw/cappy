import glucose from "../../data/glucose.json";
import glucoseValues from "../../data/glucoseValues.json";
let debug = false;

console.log(process.env.COLIN);

export async function fetchSugar() {
  if (debug) {
    return glucose;
  }
  try {
    const response = await window.fetch("/.netlify/functions/latest");
    const data = await response.json();
    return data.glucose;
  } catch (e) {
    return { sgv: 0, direction: "NONE" };
  }
}

export async function fetchLast24() {
  if (debug) {
    return glucoseValues;
  }
  try {
    const response = await window.fetch("/.netlify/functions/last24");
    const data = await response.json();
    return data.glucoseValues;
  } catch (e) {
    return [{ sgv: 0, direction: "NONE" }];
  }
}
