import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();

// Use the full rediss:// URI if available, otherwise build from parts
const redisUrl = process.env.REDIS_URL 

const redis = new Redis(redisUrl, {
  tls: { rejectUnauthorized: false }, // Required for Aiven Valkey
  family: 4, // Force IPv4 to avoid IPv6 timeouts
  connectTimeout: 10000, // 10s timeout to detect connection issues early
});

redis.on("connect", () => console.log("✅ Redis connected"));
redis.on("error", (err) => console.error("❌ Redis error:", err));

export default redis;
