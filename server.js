import express from "express";
import puppeteer from "puppeteer";

const app = express();

app.get("/btp7y", async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();
    await page.goto("https://www.investing.com/rates-bonds/italy-7-year-bond-yield", {
      waitUntil: "domcontentloaded"
    });

    const value = await page.$eval(
      ".instrument-price_last__KQzyA",
      el => el.innerText
    );

    await browser.close();
    res.send(value);
  } catch (err) {
    res.send("Errore: " + err.message);
  }
});

app.listen(3000, () => console.log("Proxy attivo sulla porta 3000"));
