var got = require("got");
require("dotenv").config();

export async function fetchSugar() {
  const now = new Date();
  const uri = process.env.NS_URI;
  const path = "/entries";
  const options = [
    "now=" + now.getTime(),
    "token=" + process.env.NS_TOKEN,
    "fields=sgv,direction,dateString",
    "sort$desc=dateString",
    "limit=1",
  ].join("&");

  const uriString = uri + path + "?" + options;
  const response = await got.get(uriString);
  return JSON.parse(response.body)[0];
}

exports.handler = async function (event, context) {
  const result = await fetchSugar();
  return {
    statusCode: 200,
    body: JSON.stringify({ glucose: result }),
  };
};
