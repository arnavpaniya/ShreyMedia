import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Shrey Media - Digital Marketing & Technology Solutions | Jaipur HQ";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#07070A",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 70px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ambient Glows */}
        <div
          style={{
            position: "absolute",
            top: "-150px",
            right: "-150px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,94,0,0.35) 0%, rgba(7,7,10,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-150px",
            left: "-150px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,240,255,0.25) 0%, rgba(7,7,10,0) 70%)",
          }}
        />

        {/* Top Bar: Brand & Location */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "24px",
                background: "linear-gradient(135deg, #FF5E00, #FFAE33)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              S
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "24px", fontWeight: "900", color: "#FFFFFF", letterSpacing: "1px" }}>
                SHREY MEDIA
              </span>
              <span style={{ fontSize: "14px", color: "#FFAE33", letterSpacing: "2px", fontWeight: "600" }}>
                GROWTH &amp; TECH ECOSYSTEM
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(255,255,255,0.06)",
              padding: "8px 18px",
              borderRadius: "30px",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <div style={{ width: "10px", height: "10px", borderRadius: "5px", background: "#10B981" }} />
            <span style={{ fontSize: "15px", color: "#E5E7EB", fontWeight: "600" }}>
              JAIPUR HQ • FILM COLONY
            </span>
          </div>
        </div>

        {/* Center Main Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "950px" }}>
          <div
            style={{
              fontSize: "56px",
              fontWeight: "900",
              color: "#FFFFFF",
              lineHeight: 1.15,
              letterSpacing: "-1px",
            }}
          >
            Marketing Brings The Customer.{" "}
            <span style={{ color: "#00F0FF" }}>Technology Converts &amp; Retains Them.</span>
          </div>

          <div style={{ fontSize: "22px", color: "#9CA3AF", lineHeight: 1.4 }}>
            In-House Film Studio • Viral Reels &amp; Meta Ads • Custom Web &amp; WhatsApp Automation
          </div>
        </div>

        {/* Bottom Metrics Pill Bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "24px" }}>
          <div style={{ display: "flex", gap: "32px" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "28px", fontWeight: "900", color: "#FF5E00" }}>50M+</span>
              <span style={{ fontSize: "13px", color: "#9CA3AF", fontWeight: "500" }}>Organic Reel Views</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "28px", fontWeight: "900", color: "#00F0FF" }}>20+</span>
              <span style={{ fontSize: "13px", color: "#9CA3AF", fontWeight: "500" }}>Jaipur Brands Scaled</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "28px", fontWeight: "900", color: "#FFAE33" }}>4K Cine</span>
              <span style={{ fontSize: "13px", color: "#9CA3AF", fontWeight: "500" }}>In-House Production</span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#FFFFFF", fontSize: "18px", fontWeight: "700" }}>
            <span>shreymedia.in</span>
            <span style={{ color: "#FF5E00" }}>•</span>
            <span style={{ color: "#10B981" }}>+91 9001590181</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
