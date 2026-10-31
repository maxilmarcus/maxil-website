SwoLifts backup format reference: example

Sample SwoLifts data for exploring the workbench and understanding backup columns.
These files are not a template for creating workout history to import.

SwoLifts import restores backups exported by the app. It does not convert
history from other apps or support spreadsheet-created workout sessions.
Keep the original SwoLifts ZIP unchanged for restoring or moving phones.
For analysis, use a separate copy. Make workout corrections in SwoLifts,
then export a fresh backup instead of editing and re-importing CSV files.

Backup and restore guide:
https://maxil.app/swolifts-import-export.html

Backups contain app-generated IDs, links, timestamps and exact weight values.
Preserve these by keeping the original archive intact. The workbench checks
files locally; it cannot inspect your phone or guarantee a successful restore.
built_in_exercises.csv is reference data. Files in examples/ are not imported.

Built-in exercise reference: generation 3, 421 exercises, matching SwoLifts 1.2.0.
These templates illustrate the SwoLifts file format. For backup and restore,
use an unchanged ZIP exported by SwoLifts. They do not convert another app's history.
