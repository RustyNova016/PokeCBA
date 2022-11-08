export function ColorHealthBar(value) {
  if (value > 0.75) {
    return "green";
  } else if (value <= 0.25) {
    return "red";
  } else if (value <= 0.5) {
    return "orange";
  } else if (value <= 0.75) {
    return "yellow";
  }
}
