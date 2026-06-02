import express from "express";
import { chromium } from "playwright";

const app = express();

app.get("/btp7y", async (req, res) => {
  try {
    const browser = await chromium.launch({
      headless: true,
      args: ["--no-sandbox"]
    });

    const page = await browser.newPage();
    await page.goto("https://www.investing.com/rates-bonds/italy-7-year-bond-yield", {
      waitUntil: "domcontentloaded"
    });

    const value = await page.locator(".instrument-price_last__KQzyA").innerText();

    await browser.close();
    res.send(value);
  } catch (err) {
    res.send("Errore: " + err.message);
  }
});

app.listen(3000, () => console.log("Proxy attivo sulla porta 3000"));

