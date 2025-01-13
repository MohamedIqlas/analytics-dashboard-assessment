import Papa from "papaparse";

export const parseCSV = (filePath, callback) => {
  fetch(filePath)
    .then((response) => response.text())
    .then((csvData) => {
      Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => callback(results.data),
      });
    });
};
