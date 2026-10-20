SwoLifts example import template

These CSVs demonstrate valid rows for custom exercises, workout templates, workout sessions, and sets.

Edit the rows, keep the header rows unchanged, then zip the CSV files at the root of the archive.

Full guide:
https://maxil.app/swolifts-import-export.html

Updated for offline SwoLifts 1.2.0 transfer. UTF-8 with or without an Excel BOM is accepted.
Exact *Kg columns preserve stored values when the paired rounded *Lbs value is unchanged.
Edit pounds to change a weight, or use the browser workbench to update paired values safely.
For kg-only input, omit its paired pounds column. Keep stable IDs and unknown columns.
built_in_exercises.csv is a reference snapshot, not imported data. Files in examples/ are ignored.
Use the browser workbench to check and edit locally: no file upload occurs.

Built-in exercise catalog: generation 2, 453 exercises, under ODbL-1.0.
See NOTICE.txt for attribution and license terms. The full canonical catalog
is included as catalog/exercises.csv and is available separately at:
https://maxil.app/assets/swolifts-import-export/catalog/exercises.csv
This catalog license does not cover your workouts, custom exercises or other personal data.
Use SwoLifts 1.2.0 or newer for the 74 new built-in exercises; older versions
may skip sets referencing their exercise UUIDs.
