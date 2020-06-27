import axios from "axios";

let host = "";
if (process.env.NODE_ENV === "development") {
  host = process.env.DEV_API_HOST;
  console.log(`dev mode, changed host to ${host}`);
}

export async function fetchSugar() {
  try {
    const response = await window.fetch(`${host}/.netlify/functions/latest`);
    const data = await response.json();
    return data.glucose;
  } catch (e) {
    return { sgv: 0, direction: "NONE" };
  }
}

export async function fetchLast24() {
  try {
    const response = await window.fetch(`${host}/.netlify/functions/last24`);
    const data = await response.json();
    return data.glucoseValues;
  } catch (e) {
    return [{ sgv: 0, direction: "NONE" }];
  }
}
