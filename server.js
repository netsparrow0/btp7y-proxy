import express from "express";
import puppeteer from "puppeteer-core";
import { execSync } from "child_process";

const app = express();

app.get("/btp7y", async (req, res) => {
  try {
      const browser = await puppeteer.launch({
         headless: "new",
         args: ["--no-sandbox", "--disable-setuid-sandbox"]
      });


    const page = await browser.newPage();
    await page.goto("https://www.investing.com/rates-bonds/italy-7-year-bond-yield", {
      waitUntil: "networkidle2"
    });

    await page.waitForSelector(".last-price-value");

    const value = await page.$eval(".last-price-value", el => el.textContent.trim());

    await browser.close();

    res.send(value);
  } catch (err) {
    res.status(500).send("Errore: " + err.message);
  }
});

app.listen(3000, () => console.log("Proxy attivo sulla porta 3000"));

function findChromium() {
  try {
    return execSync("which chromium-browser").toString().trim();
  } catch {
    return execSync("which chromium").toString().trim();
  }
}

