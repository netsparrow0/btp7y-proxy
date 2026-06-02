import express from "express";

const app = express();

app.get("/proxy", async (req, res) => {
  try {
    const target = req.query.url;
    if (!target) return res.status(400).send("Missing url parameter");

    const html = await fetch(target, {
      headers: { "User-Agent": "Mozilla/5.0" }
    }).then(r => r.text());

    res.send(html);
  } catch (err) {
    res.status(500).send("Errore: " + err.message);
  }
});

app.listen(3000, () => console.log("Proxy attivo sulla porta 3000"));

