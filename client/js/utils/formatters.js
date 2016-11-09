import moment from "moment";

export const formatDate = (date) => {
  return moment.utc(date).format("dddd, MMMM Do YYYY");
}

export const formatDistance = (meters, include_unit = true) => {
  let km = meters / 1000;
  let unit = include_unit ? "km" : "";
  return `${km.toFixed(2)}${unit}`
}

export const formatDuration = (time) => {
  let hours, minutes, seconds;
  minutes = Math.floor(time / 60);
  seconds = time % 60;
  hours = Math.floor(minutes / 60);
  minutes = minutes % 60;

  return [hours, minutes, seconds].map(i => i >= 10 ? i.toString() : `0${i}`).join(":")
}

export const formatSpeed = (meters_per_second) => {
  return `${meters_per_second.toFixed(2)} m/s`
}
