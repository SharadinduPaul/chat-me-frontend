import moment from "moment";

export const shortHandTime = (time: string) => {
  const updatedAtYear = Number(moment(time).format("YYYY"));
  const updatedAtTime = moment(time).format("LT");

  if (moment().year() - updatedAtYear > 0) {
    return String(updatedAtYear);
  } else if (moment().diff(moment(time), "days") > 0) {
    return moment(time).format("Do MMM");
  } else {
    return String(updatedAtTime);
  }
};
export const sentAtTime = (time: string) => {
  return moment(time).format("Do MMM YY / LT");
};
