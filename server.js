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

app.get("/extract", async (req, res) => {
  try {
    const { url, regex } = req.query;
    if (!url || !regex) return res.status(400).send("Missing url or regex");

    const html = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" }
    }).then(r => r.text());

    const re = new RegExp(regex);
    const match = html.match(re);

    if (!match) return res.status(404).send("No match");

    res.send(match[1] || match[0]);
  } catch (err) {
    res.status(500).send("Errore: " + err.message);
  }
});


app.listen(3000, () => console.log("Proxy attivo sulla porta 3000"));

