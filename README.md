Dieses Repository enthält ein Node.js-Skript zum Scrapen von Produktinformationen von URLs, Konvertieren der Daten in Excel-Dateien und Speichern der Daten in JSON-Dateien basierend auf dem Produkttitel.

Installationsanleitung

Um dieses Skript auszuführen, führen Sie bitte die folgenden Schritte aus:

Node.js Installation:


Stellen Sie sicher, dass Node.js auf Ihrem System installiert ist. Installieren Sie es von nodejs.org falls erforderlich.
Pakete installieren:

Öffnen Sie die Befehlszeile oder das Terminal und navigieren Sie zum Projektverzeichnis.
Führen Sie npm install aus, um die erforderlichen Pakete zu installieren. Dieses Skript verwendet axios, cheerio, dayjs und xlsx.
Verwendung
Um das Skript auszuführen, verwenden Sie den folgenden Befehl:


├── grab.js                         # Hauptskript zum Scrapen und Speichern der Daten    
├── package.json                    # Konfigurationsdatei für Node.js-Projekt    
├── node_modules                    # Verzeichnis mit installierten Paketen (automatisch generiert)    
├── jsons                           # Verzeichnis für JSON-Daten    
│       ├── steckdosen.json         # JSON-Datei für Steckdosen-Produkte    
│       ├── rahmen.json             # JSON-Datei für Rahmen-Produkte    
│       ├── lichtschalter.json      # JSON-Datei für Lichtschalter-Produkte    
│       └── andere_produkte.json    # JSON-Datei für andere Produkte    
└── export                          # Verzeichnis für exportierte Excel-Dateien    
        ├── steckdosen.xlsx     # Excel-Datei für Steckdosen-Daten    
        ├── rahmen.xlsx         # Excel-Datei für Rahmen-Daten    
        ├── lichtschalter.xlsx  # Excel-Datei für Lichtschalter-Daten    
        └── andere_produkte.xlsx# Excel-Datei für andere Produkte
    

    
Beschreibung der Dateien

grab.js: Das Hauptskript, das die URL-Liste aus urls.json einliest, Produktinformationen von den URLs abruft, diese in JSON-Dateien speichert und in Excel-Dateien exportiert.

package.json: Enthält die Abhängigkeiten des Projekts sowie Skripte zum Starten und Testen.

jsons/: Verzeichnis für JSON-Dateien, in denen die gesammelten Produktdaten gespeichert werden.

export/: Verzeichnis für exportierte Excel-Dateien, die die gesammelten Produktdaten enthalten.

Skriptfunktionalitäten

JSON-Daten einlesen: Das Skript liest JSON-Daten für Steckdosen, Rahmen, Lichtschalter und andere Produkte aus entsprechenden Dateien ein.

Daten in Excel exportieren: 
Die gelesenen JSON-Daten werden in separate Excel-Dateien konvertiert und im export/ Verzeichnis gespeichert.

Produktdetails abrufen: 
Das Skript verwendet axios und cheerio, um Produktdetails von den URLs abzurufen und den Preis sowie den Titel zu extrahieren.

Daten speichern: 
Basierend auf dem Produkttitel werden die abgerufenen Daten in die entsprechenden JSON-Dateien gespeichert.

Datum formatieren: 
Das Datum wird im DD-MM-YYYY-Format formatiert, bevor es gespeichert wird.

Erweiterung des Projekts

Dieses Projekt kann durch Hinzufügen weiterer URLs in urls.json erweitert werden. Das Skript erkennt automatisch den Produkttitel und speichert die Daten in die richtige JSON-Datei. Sie können auch zusätzliche Funktionen zum Bearbeiten der gesammelten Daten oder zur Verbesserung der Fehlerbehandlung hinzufügen.

Autor

Dieses Projekt wurde erstellt von Fabian L.
