class Time {
  static millisecond = 1;
  static second = Time.millisecond * 1000;
  static minute = Time.second * 60;
  static hour = Time.minute * 60;
  static day = Time.hour * 24;
  static week = Time.day * 7;

  static beautifyDateTime(date: string | Date): string {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }

    return `${date
      .getDate()
      .toString()
      .padStart(2, "0")}.${date
      .getMonth()
      .toString()
      .padStart(
        2,
        "0"
      )}.${date.getFullYear()} ${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
  }
  static beautifyDate(date: string | Date): string {
    return "";
  }
  static beautifyTime(date: string | Date): string {
    return "";
  }
}

export default Time;
