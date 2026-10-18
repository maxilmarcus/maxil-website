SwoLifts blank import template

Edit the CSV files, keep the header rows unchanged, then zip the CSV files at the root of the archive.

Use ISO 8601 UTC timestamps such as 2026-04-17T14:30:00Z.
CSV weights are pounds.
Leave optional cells blank when unused.

Full guide:
https://maxil.app/swolifts-import-export.html

Updated for offline SwoLifts 1.2.0 transfer. UTF-8 with or without an Excel BOM is accepted.
Exact *Kg columns preserve stored values when the paired rounded *Lbs value is unchanged.
Edit pounds to change a weight, or use the browser workbench to update paired values safely.
For kg-only input, omit its paired pounds column. Keep stable IDs and unknown columns.
built_in_exercises.csv is a reference snapshot, not imported data. Files in examples/ are ignored.
Use the browser workbench to check and edit locally: no file upload occurs.
