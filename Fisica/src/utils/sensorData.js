export function toFiniteNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

export function normalizeSensorData(data) {
  const source = data && typeof data === 'object' ? data : {};

  return {
    ...source,
    x: toFiniteNumber(source.x),
    y: toFiniteNumber(source.y),
    z: toFiniteNumber(source.z),
  };
}
