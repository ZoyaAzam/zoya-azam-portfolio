import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0d0d0d",
          color: "#f4f4f0",
          fontFamily: "monospace",
          padding: "64px"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#737373" }}>
          <span>GET /api/v1/hero</span>
          <span style={{ color: "#00ff66" }}>200 OK</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 26, color: "#00ff66", letterSpacing: 4, marginBottom: 12 }}>
            // SENIOR FULL STACK DEVELOPER
          </span>
          <span style={{ fontSize: 96, fontWeight: 700, lineHeight: 1, textTransform: "uppercase" }}>
            Zoya Azam
          </span>
          <span style={{ fontSize: 30, color: "#a3a3a3", marginTop: 20 }}>
            Laravel · Redis Queues · Pusher WebSockets · REST APIs
          </span>
        </div>

        <div style={{ display: "flex", fontSize: 22, color: "#525252" }}>
          <span>mineautoparts.com · firstaxisparts.com · +4 more</span>
        </div>
      </div>
    ),
    { ...size }
  );
}