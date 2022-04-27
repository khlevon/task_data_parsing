import fs from "fs";
import path from "path";

export const loadQueries = (
  folderPath: string,
  fileExtension: string = "sql"
): { [key: string]: string } => {
  /**
   * Reads all files with `fileExtension` from the given folder and returns them as an mapping of file name to file content
   */
  const files = fs.readdirSync(folderPath);
  const queries: { [key: string]: string } = {};

  for (const file of files) {
    if (file.endsWith(fileExtension)) {
      const filePath = path.join(folderPath, file);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const fileName = file.replace(`.${fileExtension}`, "");

      queries[fileName] = fileContent;
    }
  }

  return queries;
};

export const parseDate = (date: string): Date => {
  /**
   * Parse UTC date string to Date object
   * string format: "3/18/2020 17:30:23 PM(UTC+0)"
   */
  const dateParts = date.split(" ");
  const datePart = dateParts[0].split("/");
  const timePart = dateParts[1].split(":");
  const timeZonePart = dateParts[2].split("PM(UTC");
  const timeZoneOffset = parseInt(timeZonePart[1].replace(")", ""));

  const year = parseInt(datePart[2]);
  const month = parseInt(datePart[0]) - 1;
  const day = parseInt(datePart[1]);
  const hour = parseInt(timePart[0]);
  const minute = parseInt(timePart[1]);
  const second = parseInt(timePart[2]);

  return new Date(
    Date.UTC(year, month, day, hour, minute, second, 0) +
      timeZoneOffset * 60 * 60 * 1000
  );
};
