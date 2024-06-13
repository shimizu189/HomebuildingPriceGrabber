const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const dayjs = require('dayjs');
const XLSX = require('xlsx');
const urlsFilePath = 'F:\\workspace_private\\julius\\urls.json';


// Lese JSON-Daten ein
const steckdosenData = require('./jsons/steckdosen.json');
const rahmenData = require('./jsons/rahmen.json');
const lichtschalterData = require('./jsons/lichtschalter.json');
const andereProdukteData = require('./jsons/andere_produkte.json');

// Funktion zum Konvertieren der JSON-Daten in ein Excel-Arbeitsblatt
function jsonToExcel(data, sheetName, filePath) {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, filePath);
}

// Exportiere die JSON-Daten in Excel
jsonToExcel(steckdosenData, 'Steckdosen', './export/steckdosen.xlsx');
jsonToExcel(rahmenData, 'Rahmen', './export/rahmen.xlsx');
jsonToExcel(lichtschalterData, 'Lichtschalter', './export/lichtschalter.xlsx');
jsonToExcel(andereProdukteData, 'Andere Produkte', './export/andere_produkte.xlsx');


// URLs aus urls.json auslesen
let urls = [];
try {
  const urlsContent = fs.readFileSync(urlsFilePath, 'utf8');
  const urlsData = JSON.parse(urlsContent);
  urls = urlsData.urls;
  console.log('URLs erfolgreich aus urls.json gelesen');
  console.log('URLs:', urls);
} catch (error) {
  console.error('Fehler beim Lesen der urls.json:', error);
}


// Funktion zum Formatieren des Datums im DD-MM-YYYY-Format
function formatDate(date) {
  return dayjs(date).format('DD-MM-YYYY');
}
// Funktion zum Abrufen der Produktdetails
// und Rückgabe von Preis und Titel

async function fetchProductDetails(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const price = $('.price').text().trim();
    const title = $('#productTitle').text().trim();

    return { price, title };
  } catch (error) {
    console.error('Fehler beim Abrufen der Daten:', error);
    return null;
  }
}
/*
* Funktion zum Schreiben von Daten in eine JSON-Datei
* @param {object} item - Das zu schreibende Objekt
* @param {string} filename - Der Dateiname
*/
function writeToJSON(item, filename) {
  const jsonsFolder = 'jsons';
  const filePath = path.join(jsonsFolder, filename);

  let data = [];

  try {
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      data = JSON.parse(fileContent);
    }
    if (!Array.isArray(data)) {
      data = [];
    }
  } catch (error) {
    console.error(`Fehler beim Lesen der Datei ${filename}:`, error);
    data = [];
  }

  data.push(item);

  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Daten erfolgreich in ${filePath} geschrieben`);
  } catch (error) {
    console.error(`Fehler beim Schreiben in die Datei ${filePath}:`, error);
  }
}
// Funktion zum Abrufen der Produktdetails
// und Schreiben in die entsprechende JSON-Datei
// basierend auf dem Produkttitel
// und dem URL-Array
async function grabProductDetails() {
  for (const url of urls) {
    const details = await fetchProductDetails(url);
    if (details && details.price && details.title) {
      console.log(`Gefundene Details für ${url}: Preis - ${details.price}, Titel - ${details.title}`);
      const newItem = {
        url: url,
        price: details.price,
        title: details.title,
        date: formatDate(new Date())
      };

      // Produktkategorie anhand des Titels bestimmen und in die richtige Datei schreiben
      if (details.title.includes('Steckdose')) {
        writeToJSON(newItem, 'steckdosen.json');
      } else if (details.title.includes('Rahmen')) {
        writeToJSON(newItem, 'rahmen.json');
      } else if (details.title.includes('schalter')) {
        writeToJSON(newItem, 'lichtschalter.json');
      } else {
        writeToJSON(newItem, 'andere_produkte.json');
      }
    } else {
      console.log(`Details konnten für ${url} nicht gefunden werden.`);
    }
  }
}

grabProductDetails();
