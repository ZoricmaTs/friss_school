import {useEffect, useState} from 'react';

export type DataRecord = Record<string, string>;

const results: Record<number, DataRecord[]> = {}

const loadingRequests: Record<number, Promise<DataRecord[]>> = {};

async function load(gid: number): Promise<DataRecord[]> {
  const url =
    `https://docs.google.com/spreadsheets/d/e/2PACX-1vTXJHUttyIKJ87EWExaMK8a4REVQF12z0g9UGQu-sEIss-J_kFTKQ_v-P-CfwcbjWtvT5DxriNXQE2a/pub?gid=${gid}&single=true&output=csv`;

  const res = await fetch(url);
  const text = await res.text();
  console.log('res', res, text)

  function parseCSV(csv: string) {
    const rows = [];
    let row = [];
    let cell = '';
    let insideQuotes = false;

    for (let i = 0; i < csv.length; i++) {
      const char = csv[i];
      const next = csv[i + 1];

      if (char === '"') {
        if (insideQuotes && next === '"') {
          // Экранированные двойные кавычки ""
          cell += '"';
          i++;
        } else {
          // Вход или выход из кавычек
          insideQuotes = !insideQuotes;
        }
      } else if (char === ',' && !insideQuotes) {
        // Конец ячейки
        row.push(cell);
        cell = '';
      } else if ((char === '\n' || char === '\r') && !insideQuotes) {
        // Конец строки
        if (cell !== '' || row.length) {
          row.push(cell);
          rows.push(row);
        }
        row = [];
        cell = '';

        // Пропустить CRLF (\r\n)
        if (char === '\r' && next === '\n') i++;
      } else {
        cell += char;
      }
    }

    // Добавить последнюю ячейку/строку
    if (cell !== '' || row.length) {
      row.push(cell);
      rows.push(row);
    }

    return rows;
  }

  const rows = parseCSV(text);

  const heads = rows[0];

  const result: DataRecord[] = [];

  for (let i = 1; i < rows.length; i += 1) {
    const row = rows[i];
    const record: DataRecord = {};

    for (let col = 0; col < heads.length; col += 1) {
      const title = heads[col];
      let cell = row[col];

      if (cell.startsWith('"') && cell.endsWith('"')) {
        cell = cell.substring(1, cell.length - 1);
      }

      record[title] = cell;
    }

    result.push(record);
  }


  results[gid] = result;

  return result;
}

export default function useSheetData(gid: number) {
  const [data, setData] = useState<DataRecord[]>(results[gid] || []);

  useEffect(() => {
    if (results[gid]) {
      return;
    }

    loadingRequests[gid] = (loadingRequests[gid] || load(gid)).then(result => {
      setData(result);
      return result;
    });
  }, [gid]);

  return data;
}