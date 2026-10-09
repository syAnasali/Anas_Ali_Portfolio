import React, { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

const BLR_TZ = "Asia/Kolkata";
const JAI_TZ = "Asia/Kolkata";

const AIRPORTS = [
  { code: "JAI", lat: 26.8242, lng: 75.8122, tz: "Asia/Kolkata" },
  { code: "BLR", lat: 13.1986, lng: 77.7066, tz: "Asia/Kolkata" },
  { code: "DEL", lat: 28.5562, lng: 77.1, tz: "Asia/Kolkata" },
  { code: "BOM", lat: 19.0896, lng: 72.8656, tz: "Asia/Kolkata" },
  { code: "SIN", lat: 1.3644, lng: 103.9915, tz: "Asia/Singapore" },
  { code: "DXB", lat: 25.2532, lng: 55.3657, tz: "Asia/Dubai" },
  { code: "LHR", lat: 51.47, lng: -0.4543, tz: "Europe/London" },
  { code: "JFK", lat: 40.6413, lng: -73.7781, tz: "America/New_York" },
  { code: "SFO", lat: 37.6213, lng: -122.379, tz: "America/Los_Angeles" },
];

function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function nearestAirport(lat, lng) {
  return AIRPORTS.reduce((best, a) =>
    haversine(lat, lng, a.lat, a.lng) < haversine(lat, lng, best.lat, best.lng)
      ? a
      : best,
  );
}

function useClockTime(tz) {
  const [time, setTime] = useState(() =>
    new Intl.DateTimeFormat("en-GB", {
      timeZone: tz,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(new Date()),
  );

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: tz,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [tz]);

  return time;
}

function ClockRow({ code, tz }) {
  const time = useClockTime(tz);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.45rem",
        lineHeight: 1,
      }}
    >
      <MapPin
        size={12}
        strokeWidth={1.8}
        style={{ flexShrink: 0, opacity: 0.7 }}
      />
      <span
        style={{ letterSpacing: "0.04em", opacity: 0.75, fontSize: "0.65rem" }}
      >
        {code}
      </span>
      <span
        style={{ fontVariantNumeric: "tabular-nums", letterSpacing: "0.03em" }}
      >
        {time}
      </span>
    </div>
  );
}

export function ClockWidget() {
  const [userAirport, setUserAirport] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const match = AIRPORTS.find((a) => a.tz === tz);
      setUserAirport(match ?? null);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setUserAirport(nearestAirport(coords.latitude, coords.longitude));
      },
      () => {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const match = AIRPORTS.find((a) => a.tz === tz);
        setUserAirport(match ?? null);
      },
      { timeout: 6000, maximumAge: 300_000 },
    );
  }, []);

  const userTz =
    userAirport?.tz ?? Intl.DateTimeFormat().resolvedOptions().timeZone;
  const userCode = userAirport?.code ?? "···";
  const sameAsJAI = userAirport?.code === "JAI" || userAirport?.code === "BLR";

  return (
    <div
      id="clock-widget"
      style={{
        position: "fixed",
        bottom: "1.25rem",
        left: "1.25rem",
        zIndex: 49,
        color: "var(--hud-text, white)",
        fontFamily: "'DM Mono', 'SF Mono', monospace",
        fontSize: "0.82rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.45rem",
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      <ClockRow code="JAI" tz={JAI_TZ} />
      {!sameAsJAI && <ClockRow code={userCode} tz={userTz} />}
    </div>
  );
}
