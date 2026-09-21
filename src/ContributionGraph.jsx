import { useEffect, useMemo, useState } from "react";
import { profile } from "./data/profile";
import {
  getContributionYears,
  getMockContributions,
} from "./data/contributions";

const API_BASE =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:3001";

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function monthLabelsForWeeks(weeks) {
  const labels = [];
  let lastMonth = -1;
  weeks.forEach((week) => {
    const active = week.days.find((d) => d.level >= 0);
    if (!active) {
      labels.push("");
      return;
    }
    const month = Number(active.date.slice(5, 7)) - 1;
    if (month !== lastMonth) {
      labels.push(MONTH_LABELS[month]);
      lastMonth = month;
    } else {
      labels.push("");
    }
  });
  return labels;
}

export default function ContributionGraph() {
  const years = useMemo(() => getContributionYears(5), []);
  const [year, setYear] = useState(years[0]);
  const [data, setData] = useState(() =>
    getMockContributions(profile.username, years[0])
  );
  const [source, setSource] = useState("mock");
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    async function load() {
      setStatus("loading");
      try {
        const res = await fetch(
          `${API_BASE}/api/github/contributions?year=${year}`,
          { signal: controller.signal }
        );
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const json = await res.json();
        if (cancelled) return;
        if (!json.weeks?.length) {
          throw new Error("Empty calendar");
        }
        setData({
          year: json.year,
          total: json.total,
          weeks: json.weeks,
        });
        setSource(json.source === "github" ? "github" : "mock");
        setStatus("ok");
      } catch (err) {
        if (cancelled || err.name === "AbortError") return;
        setData(getMockContributions(profile.username, year));
        setSource("mock");
        setStatus("fallback");
      }
    }

    load();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [year]);

  const months = useMemo(() => monthLabelsForWeeks(data.weeks), [data.weeks]);

  return (
    <section className="contrib" aria-labelledby="contrib-heading">
      <div className="contrib-top">
        <h3 id="contrib-heading" className="contrib-heading">
          Contribution Graph
        </h3>
        <p className="contrib-total">
          {status === "loading"
            ? `Loading ${year}…`
            : `${data.total.toLocaleString()} contributions in ${year}`}
          {source === "mock" && status !== "loading" ? (
            <span className="contrib-mock-tag"> mock</span>
          ) : null}
          {source === "github" ? (
            <span className="contrib-live-tag"> live</span>
          ) : null}
        </p>
      </div>

      <div className="contrib-body">
        <div className="contrib-scroll">
          <div className="contrib-months" aria-hidden>
            {months.map((label, i) => (
              <span key={`m-${i}`} className="contrib-month">
                {label}
              </span>
            ))}
          </div>

          <div className="contrib-grid-wrap">
            <div className="contrib-dows" aria-hidden>
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>

            <div
              className={`contrib-grid${status === "loading" ? " is-loading" : ""}`}
              role="img"
              aria-label={`Contribution calendar for ${year}`}
            >
              {data.weeks.map((week, wi) => (
                <div key={`w-${wi}`} className="contrib-week">
                  {week.days.map((day) => (
                    <span
                      key={day.date}
                      className={`contrib-cell level-${Math.max(day.level, 0)}${
                        day.level < 0 ? " is-out" : ""
                      }`}
                      title={
                        day.level < 0
                          ? undefined
                          : `${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`
                      }
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="contrib-legend">
            <span>Less</span>
            {[0, 1, 2, 3, 4].map((lvl) => (
              <span key={lvl} className={`contrib-cell level-${lvl}`} />
            ))}
            <span>More</span>
          </div>
        </div>

        <div className="contrib-years" role="tablist" aria-label="Year">
          {years.map((y) => (
            <button
              key={y}
              type="button"
              role="tab"
              aria-selected={y === year}
              className={`contrib-year${y === year ? " is-active" : ""}`}
              onClick={() => setYear(y)}
            >
              {y}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
