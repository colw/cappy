export function calcAverage(newData) {
  return (
    newData.reduce((sum, current) => sum + current.sgv, 0) / newData.length
  );
}
export function calcTimeInRange(newData) {
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
  return result;
}
