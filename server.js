import express from "express";

const app = express();

app.get("/btp7y", async (req, res) => {
  try {
    const url = "https://m.investing.com/rates-bonds/italy-7-year-bond-yield";

    const html = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" }
    }).then(r => r.text());

    const match = html.match(/<span class="last-price-value">([^<]+)<\/span>/);

    if (!match) {
      return res.status(500).send("N/D");
    }

    res.send(match[1].trim());
  } catch (err) {
    res.status(500).send("Errore: " + err.message);
  }
});

app.listen(3000, () => console.log("Proxy attivo sulla porta 3000"));

