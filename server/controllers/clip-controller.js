import redis from '../config/redis.js';
export const createClip = async (req, res) => {
  try {
    const { text, ttl = 300 } = req.body; // ttl in seconds
    console.log(text);
    if (!text) return res.status(400).json({ error: "Text is required" });
    //  console.log(text);
    const pin = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");

    await redis.setex(`clip:${pin}`, ttl, text);

    res.status(201).json({
      message: "Clip created successfully",
      pin,
      link: `${process.env.BASE_URL || "http://localhost:3000"}/p/${pin}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getClip = async (req, res) => {
  try {
    const { pin } = req.params;
    console.log(pin);
    if (!pin) return res.status(400).json({ error: "Pin is required" });

   const text = await redis.get(`clip:${pin}`);
    console.log(text);
    if (!text) return res.status(404).json({ error: "Clip expired or not found" });

    res.status(200).json({ pin, text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
