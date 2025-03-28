/**
 *
 * @param {number[]} start geoJSON point-coordinates
 * @param {number[]} end geoJSON point-coordinates
 * @returns distance between two point
 */
export function distance(start, end) {
  return Math.sqrt((end[0] - start[0]) ** 2 + (end[1] - start[1]) ** 2);
}
