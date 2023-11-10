export function parseTimestamp(timestamp) {
  if (timestamp === undefined) return undefined;

  timestamp = timestamp.substring(0, 10).split("-");
  return timestamp[2] + "/" + timestamp[1] + "/" + timestamp[0];
}

export function getTotal(products) {
  return products.reduce(
    (accum, currVal) =>
      accum + parseFloat(currVal.p_price) * parseFloat(currVal.op_quantity),
    0
  );
}

export function getScrollHeight(percentage = 50) {
  const windowHeight = window.innerHeight;
  const size = (percentage * windowHeight) / 100;

  console.log("size: ", size);

  return size;
}
