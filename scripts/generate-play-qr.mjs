import QRCode from "qrcode";
import { writeFile } from "node:fs/promises";
import { PLAY_URL } from "../src/constants.js";

// Static, direct-to-Play code: no redirect service or browser QR dependency.
const svg = await QRCode.toString(PLAY_URL, {
  type: "svg",
  errorCorrectionLevel: "M",
  margin: 4,
  color: { dark: "#172338", light: "#ffffff" },
});
await writeFile(new URL("../assets/swolifts-google-play-qr.svg", import.meta.url), svg);
