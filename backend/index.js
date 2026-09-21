import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";

dotenv.config();
const app = express();

const allowedOrigins = [
  "https://portfolio-six-sage-35.vercel.app",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

const CONTRIB_QUERY = `
  query ($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              color
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

const LEVEL_MAP = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

function yearBounds(year) {
  const from = new Date(Date.UTC(year, 0, 1, 0, 0, 0)).toISOString();
  const to = new Date(Date.UTC(year, 11, 31, 23, 59, 59)).toISOString();
  return { from, to };
}

app.get("/api/github/contributions", async (req, res) => {
  const token = process.env.GITHUB_TOKEN;
  const login = process.env.GITHUB_USERNAME || "Amjath-s";
  const year = Number(req.query.year) || new Date().getFullYear();

  if (!token) {
    return res.status(503).json({
      error: "GITHUB_TOKEN is not configured",
      mock: true,
    });
  }

  if (!Number.isFinite(year) || year < 2008 || year > 2100) {
    return res.status(400).json({ error: "Invalid year" });
  }

  const { from, to } = yearBounds(year);

  try {
    const { data } = await axios.post(
      "https://api.github.com/graphql",
      {
        query: CONTRIB_QUERY,
        variables: { login, from, to },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "User-Agent": "portfolio-contributions",
        },
      }
    );

    if (data.errors?.length) {
      console.error("GitHub GraphQL errors:", data.errors);
      return res.status(502).json({
        error: "GitHub GraphQL error",
        details: data.errors,
      });
    }

    const calendar = data.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar) {
      return res.status(404).json({ error: "User or contributions not found" });
    }

    const weeks = calendar.weeks.map((week) => ({
      days: week.contributionDays.map((day) => {
        const y = Number(day.date.slice(0, 4));
        const count = day.contributionCount;
        const level =
          y === year
            ? LEVEL_MAP[day.contributionLevel] ??
              (count <= 0 ? 0 : count <= 2 ? 1 : count <= 5 ? 2 : count <= 9 ? 3 : 4)
            : -1;
        return {
          date: day.date,
          count,
          level,
        };
      }),
    }));

    return res.json({
      year,
      total: calendar.totalContributions,
      weeks,
      source: "github",
    });
  } catch (error) {
    console.error("GitHub contributions fetch failed:", error.response?.data || error.message);
    return res.status(500).json({
      error: "Failed to fetch contributions",
      details: error.response?.data || error.message,
    });
  }
});

app.options("/api/contact", (req, res) => {
  res.sendStatus(204);
});

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Portfolio Contact",
          email: process.env.register_email,
        },
        to: [{ email: process.env.send_mail }],
        subject: `Portfolio Contact Form: Message from ${name}`,
        htmlContent: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Message:</b><br>${message}</p>`,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.brevo_api_key,
        },
      }
    );

    return res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Full error:", error);
    console.error("Brevo response data:", error.response?.data);
    return res.status(500).json({
      error: "Failed to send email",
      details: error.response?.data,
    });
  }
});

app.listen(process.env.PORT || 3001, () => console.log("Server running"));
