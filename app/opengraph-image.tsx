import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "古籍焕新 — 古典文学互动阅读平台";
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
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f0e8",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative ink wash background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.06,
            backgroundImage:
              "radial-gradient(ellipse at 20% 50%, #6b4423 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, #8b6914 0%, transparent 40%)",
          }}
        />

        {/* Seal stamp decoration */}
        <div
          style={{
            position: "absolute",
            right: 80,
            top: 60,
            width: 80,
            height: 80,
            borderRadius: 8,
            border: "3px solid #c84032",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: "rotate(-8deg)",
            opacity: 0.3,
          }}
        >
          <span
            style={{
              fontSize: 32,
              color: "#c84032",
              fontWeight: 900,
            }}
          >
            典
          </span>
        </div>

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          {/* Title */}
          <span
            style={{
              fontSize: 72,
              color: "#1a1a2e",
              fontWeight: 900,
              letterSpacing: 12,
            }}
          >
            古籍焕新
          </span>

          {/* Subtitle */}
          <span
            style={{
              fontSize: 24,
              color: "#8b7355",
              letterSpacing: 6,
            }}
          >
            古典文学互动阅读平台
          </span>

          {/* Divider */}
          <div
            style={{
              width: 200,
              height: 2,
              background: "linear-gradient(90deg, transparent, #c84032, transparent)",
              marginTop: 8,
              marginBottom: 8,
            }}
          />

          {/* Features */}
          <div
            style={{
              display: "flex",
              gap: 32,
              fontSize: 20,
              color: "#6b5d4d",
            }}
          >
            <span>山海经</span>
            <span style={{ color: "#c84032" }}>·</span>
            <span>诗词漫游</span>
            <span style={{ color: "#c84032" }}>·</span>
            <span>异兽图鉴</span>
            <span style={{ color: "#c84032" }}>·</span>
            <span>古今对话</span>
          </div>
        </div>

        {/* Bottom tagline */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 16,
            color: "#8b7355",
          }}
        >
          <span>探索千年智慧</span>
          <span style={{ color: "#c84032" }}>—</span>
          <span>与古人对话</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
