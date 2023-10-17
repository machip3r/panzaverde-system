export function parseTimestamp(timestamp) {
  if (timestamp === undefined) return undefined;

  timestamp = timestamp.substring(0, 10).split("-");
  return timestamp[2] + "/" + timestamp[1] + "/" + timestamp[0];
}
