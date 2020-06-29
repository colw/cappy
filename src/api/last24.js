var got = require("got");
require("dotenv").config();

export async function fetchSugars() {
  const now = new Date();
  const uri = process.env.NS_URI;
  const path = "/entries";
  const options = [
    "now=" + now.getTime(),
    "token=" + process.env.NS_TOKEN,
    "fields=sgv,dateString",
    "sort$desc=dateString",
    "limit=288",
  ].join("&");

  const uriString = uri + path + "?" + options;
  const response = await got.get(uriString);
  return JSON.parse(response.body);
}

exports.handler = async function (event, context) {
  const result = await fetchSugars();
  return {
    statusCode: 200,
    body: JSON.stringify({ glucoseValues: result }),
  };
};
