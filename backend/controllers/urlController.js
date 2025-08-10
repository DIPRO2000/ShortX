import Url from "../models/Url.js";
import nanoid from "../utils/generateShortId.js";
import Joi from "joi";

const urlSchema = Joi.object({
  url: Joi.string().uri().required() 
});

// POST - Shorten URL
export const shortenUrl = async (req, res) => {
  try {
    const { error } = urlSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { url } = req.body;

    // Check if URL already exists
    let existing = await Url.findOne({ originalUrl: url });
    if (existing) {
      return res.json({
        shortUrl: `${process.env.BASE_URL}/${existing.shortId}`
      });
    }

    const shortId = nanoid();
    const newUrl = await Url.create({ originalUrl: url, shortId });

    res.json({ shortUrl: `${process.env.BASE_URL}/${newUrl.shortId}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// GET - Redirect short URL
export const redirectUrl = async (req, res) => {
  try {
    const { shortId } = req.params;
    const urlEntry = await Url.findOne({ shortId });

    if (!urlEntry) return res.status(404).json({ error: "URL not found" });

    urlEntry.clicks++;
    await urlEntry.save();

    res.redirect(urlEntry.originalUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// GET - Get URL info
export const getUrlInfo = async (req, res) => {
  try {
    const { shortId } = req.params;
    const urlEntry = await Url.findOne({ shortId }).lean();

    if (!urlEntry) return res.status(404).json({ error: "URL not found" });

    res.json(urlEntry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
