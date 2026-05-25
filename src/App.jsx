import { useState } from "react";

// ═══════════════════════════════════════════════════════════════════════════════
// COPYBLOCKS DESIGN SYSTEM v2.1 — ROAS ACADEMY EDITION
// Tipografía: Protrakt (display/H1–H3) · Ubuntu (body/UI) · Space Grotesk (datos/labels)
// Paleta oficial: Negro Azulado #181349 · Violeta Eléctrico #7A5AF8 · Violeta Profundo #5B3FD4
//                 Lavanda #BDC0EF · Gris #545F66 · Gris Claro #E4E6EA · Negro #0B1020 · Blanco #FFF
// ═══════════════════════════════════════════════════════════════════════════════

const FONT_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700&display=swap');
`;

// ─── BRAND TOKENS ─────────────────────────────────────────────────────────────
const B = {
  // Brand palette (exact from manual)
  navy:         "#181349",
  navyDeep:     "#0D0D2E",
  violet:       "#7A5AF8",
  violetDark:   "#5B3FD4",
  violetBright: "#9B6FFF",
  payne:        "#545F66",
  periwinkle:   "#BDC0EF",
  antiflash:    "#E4E6EA",
  richBlack:    "#0B1020",
  white:        "#FFFFFF",

  // Gradients from brand guide
  gradMain:     "linear-gradient(135deg, #7A5AF8 0%, #181349 100%)",
  gradVibrant:  "linear-gradient(135deg, #9B6FFF 0%, #5B3FD4 50%, #181349 100%)",
  gradGlow:     "linear-gradient(135deg, #7A5AF8 0%, #3D2FA0 100%)",

  // Semantic block colors — darker, more vibrant than before
  pain:         { base:"#FF3B5C", light:"#1A0810", mid:"#4A1020", border:"#FF3B5C40" },
  promise:      { base:"#00E096", light:"#051A10", mid:"#0A3020", border:"#00E09640" },
  proof:        { base:"#4D9FFF", light:"#060F1F", mid:"#0A2040", border:"#4D9FFF40" },
  constraints:  { base:"#FFB547", light:"#1A1005", mid:"#3A2010", border:"#FFB54740" },
  curiosity:    { base:"#7A5AF8", light:"#0D0B20", mid:"#1E1745", border:"#7A5AF840" },
  conditions:   { base:"#FF6FB0", light:"#1A0810", mid:"#3A0F25", border:"#FF6FB040" },
  offer:        { base:"#00D4E8", light:"#030F12", mid:"#072025", border:"#00D4E840" },

  // Typography — jerarquía estricta del manual de marca
  fontDisplay:  "'Protrakt', sans-serif",           // solo títulos y marca — SIEMPRE uppercase
  fontBody:     "'Ubuntu', sans-serif",             // cuerpo, UI, párrafos — nunca uppercase forzado
  fontData:     "'Space Grotesk', sans-serif",      // datos, labels, badges, métricas — uppercase + tracking

  // Surface system (dark-first)
  surf0:   "#0B1020",  // richest dark — page bg
  surf1:   "#0F1530",  // sidebar
  surf2:   "#131A38",  // card bg
  surf3:   "#1A2248",  // card elevated
  surf4:   "#212B58",  // interactive hover

  // Border
  border1: "rgba(122,90,248,0.15)",
  border2: "rgba(122,90,248,0.25)",
  border3: "rgba(122,90,248,0.40)",

  // Text on dark
  text1:   "#FFFFFF",
  text2:   "#BDC0EF",
  text3:   "#7A7FA8",
  text4:   "#4A4F78",

  // Spacing
  sp: (n) => `${n * 4}px`,
};

// ─── SECTIONS ─────────────────────────────────────────────────────────────────
const SECTIONS = [
  "Overview", "Colors", "Typography", "Shapes & Patterns",
  "Buttons", "Badges", "Inputs", "Block Cards",
  "Navigation", "Empty States", "Patterns & CRO", "Tokens CSS",
];

const GROUPS = {
  "Foundation":   ["Overview", "Colors", "Typography", "Shapes & Patterns"],
  "Components":   ["Buttons", "Badges", "Inputs", "Block Cards", "Navigation", "Empty States"],
  "Guidelines":   ["Patterns & CRO", "Tokens CSS"],
};

// ─── SHARED ATOMS ─────────────────────────────────────────────────────────────
const Chip = ({ label, color = B.violet, bg = "rgba(122,90,248,0.12)", border = B.border2 }) => (
  <span style={{
    display:"inline-flex", alignItems:"center",
    padding:"3px 10px", borderRadius:9999,
    background:bg, color, border:`1px solid ${border}`,
    fontFamily:B.fontBody, fontWeight:600, fontSize:11,
    letterSpacing:"0.06em", textTransform:"uppercase",
  }}>{label}</span>
);

const Tag = ({ children, color = B.text3 }) => (
  <code style={{
    fontFamily:B.fontData, fontSize:12, color,
    background:"rgba(255,255,255,0.05)", padding:"2px 7px",
    borderRadius:4, border:"1px solid rgba(255,255,255,0.08)",
  }}>{children}</code>
);

const SH = ({ title, sub }) => (
  <div style={{ marginBottom:32 }}>
    <h2 style={{
      fontFamily:B.fontData, fontWeight:700, fontSize:28,
      color:B.text1, margin:0, lineHeight:1.2, letterSpacing:"0.02em",
      textTransform:"uppercase",
    }}>{title}</h2>
    {sub && <p style={{ fontFamily:B.fontBody, fontSize:14, color:B.text3, marginTop:8, lineHeight:1.6 }}>{sub}</p>}
  </div>
);

// Arrow shape from brand logo (↗)
const ArrowIcon = ({ size=16, color=B.violet }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M3 13L13 3M13 3H6M13 3V10" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Brand shape — angled container
const BrandShape = ({ children, style }) => (
  <div style={{
    background:B.surf2, border:`1px solid ${B.border1}`,
    borderRadius:"16px 16px 4px 16px", // one corner cut — brand signature
    ...style,
  }}>{children}</div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// SECTIONS
// ═══════════════════════════════════════════════════════════════════════════════

function OverviewSection() {
  const items = [
    { icon:"↗", title:"Bold & Direct", desc:"Every element earns its place. High contrast, strong hierarchy, performance-coded aesthetic." },
    { icon:"◈", title:"Dark-First", desc:"Rich Black base with violet/navy layers. Light mode is secondary — brand lives in dark." },
    { icon:"⬟", title:"Angular DNA", desc:"Brand shapes use asymmetric corners. One clipped corner is the signature geometry of ROAS." },
    { icon:"◉", title:"Semantic Color", desc:"7 block types with vibrant accent colors on dark surfaces. Color = information, never decoration." },
    { icon:"✦", title:"AI-Native", desc:"AI actions have distinct violet glow treatment. Generation states pulse. Results arrive with weight." },
    { icon:"⬡", title:"CRO-Engineered", desc:"Every CTA is unmissable. Progressive disclosure reduces noise. Friction removal is non-negotiable." },
  ];

  return (
    <div>
      <div style={{
        background: B.gradVibrant,
        borderRadius:"20px 20px 4px 20px",
        padding:"48px 40px", marginBottom:40,
        position:"relative", overflow:"hidden",
      }}>
        {/* BG pattern */}
        <div style={{
          position:"absolute", inset:0, opacity:0.08,
          backgroundImage:`url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 32L32 8M32 8H18M32 8V22' stroke='white' strokeWidth='1.5' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize:"40px 40px",
        }} />
        <div style={{ position:"relative" }}>
          <div style={{ fontFamily:B.fontData, fontSize:11, letterSpacing:"0.14em", textTransform:"uppercase", color:"rgba(255,255,255,0.6)", marginBottom:12 }}>ROAS ACADEMY — LÍNEA GRÁFICA</div>
          <h1 style={{ fontFamily:B.fontData, fontWeight:700, fontSize:48, color:"#fff", margin:"0 0 8px", letterSpacing:"0.04em", textTransform:"uppercase", lineHeight:1 }}>COPYBLOCKS</h1>
          <h1 style={{ fontFamily:B.fontData, fontWeight:700, fontSize:48, color:"rgba(189,192,239,0.7)", margin:"0 0 20px", letterSpacing:"0.04em", textTransform:"uppercase", lineHeight:1 }}>DESIGN SYSTEM v2</h1>
          <p style={{ fontFamily:B.fontBody, fontSize:16, color:"rgba(255,255,255,0.7)", maxWidth:480, lineHeight:1.6, margin:0 }}>
            Sistema de diseño completo para CopyBlocks, construido sobre la identidad visual de ROAS Academy. Dark-first, angular, performance-coded.
          </p>
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginBottom:40 }}>
        {items.map(i => (
          <div key={i.title} style={{
            background:B.surf2, border:`1px solid ${B.border1}`,
            borderRadius:"16px 16px 4px 16px",
            padding:24,
            transition:"border-color 200ms",
          }}>
            <div style={{ fontFamily:B.fontData, fontSize:22, color:B.violet, marginBottom:12 }}>{i.icon}</div>
            <div style={{ fontFamily:B.fontData, fontWeight:700, fontSize:13, color:B.text1, marginBottom:6, textTransform:"uppercase", letterSpacing:"0.08em" }}>{i.title}</div>
            <div style={{ fontFamily:B.fontBody, fontSize:13, color:B.text3, lineHeight:1.6 }}>{i.desc}</div>
          </div>
        ))}
      </div>

      {/* Brand sources */}
      <div style={{ background:B.surf1, borderRadius:16, padding:24, border:`1px solid ${B.border1}` }}>
        <div style={{ fontFamily:B.fontData, fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", color:B.text4, marginBottom:16 }}>Fuentes de inspiración</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
          {[
            ["Julius.ai", "AI sidebar patterns, neon accents, dark surfaces"],
            ["Stripe Dashboard", "Typography precision, data density, token architecture"],
            ["Jasper.ai", "Workflow clarity, AI generation states, badge system"],
          ].map(([name, desc]) => (
            <div key={name} style={{ background:"rgba(122,90,248,0.08)", borderRadius:12, padding:"16px 18px", border:`1px solid ${B.border2}` }}>
              <div style={{ fontFamily:B.fontData, fontWeight:700, fontSize:13, color:B.violet, marginBottom:4, textTransform:"uppercase", letterSpacing:"0.06em" }}>{name}</div>
              <div style={{ fontFamily:B.fontBody, fontSize:12, color:B.text3, lineHeight:1.5 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ColorsSection() {
  const [copied, setCopied] = useState(null);
  const copy = hex => { navigator.clipboard?.writeText(hex); setCopied(hex); setTimeout(()=>setCopied(null),1500); };

  // Paleta oficial del manual de marca ROAS — nombres en español
  const brandColors = [
    { name:"NEGRO",             brand:"Negro",           hex:"#0B1020", role:"Fondo de página" },
    { name:"NEGRO AZULADO",     brand:"Negro Azulado",   hex:"#181349", role:"Sidebar / superficie profunda" },
    { name:"VIOLETA ELÉCTRICO", brand:"Violeta Eléctrico", hex:"#7A5AF8", role:"Color primario de marca" },
    { name:"VIOLETA PROFUNDO",  brand:"Violeta Profundo",  hex:"#5B3FD4", role:"Acento oscuro, gradientes" },
    { name:"LAVANDA",           brand:"Lavanda",          hex:"#BDC0EF", role:"Texto sutil / tints" },
    { name:"GRIS",              brand:"Gris",             hex:"#545F66", role:"Texto secundario" },
    { name:"GRIS CLARO",        brand:"Gris Claro",       hex:"#E4E6EA", role:"Superficie clara" },
    { name:"BLANCO",            brand:"Blanco",           hex:"#FFFFFF", role:"Texto sobre oscuro" },
  ];

  const blockColors = [
    ["Pain", B.pain], ["Promise", B.promise], ["Proof", B.proof],
    ["Constraints", B.constraints], ["Curiosity", B.curiosity],
    ["Conditions", B.conditions], ["Offer", B.offer],
  ];

  const surfaces = [
    { name:"surf0", hex:B.surf0, role:"Page background" },
    { name:"surf1", hex:B.surf1, role:"Sidebar" },
    { name:"surf2", hex:B.surf2, role:"Card default" },
    { name:"surf3", hex:B.surf3, role:"Card elevated" },
    { name:"surf4", hex:B.surf4, role:"Interactive hover" },
  ];

  return (
    <div>
      <SH title="Colors" sub="8 colores oficiales del manual de marca (nombres en español) + 7 colores semánticos para block types + escala de superficies." />

      <div style={{ fontFamily:B.fontData, fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", color:B.text4, marginBottom:12 }}>Paleta Oficial de Marca — Manual ROAS</div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:40 }}>
        {brandColors.map(c => (
          <div key={c.hex} onClick={()=>copy(c.hex)} style={{ cursor:"pointer" }}>
            <div style={{
              height:72, borderRadius:"12px 12px 3px 12px",
              background:c.hex, marginBottom:8,
              border:`1px solid rgba(255,255,255,0.12)`,
              boxShadow: copied===c.hex ? `0 0 0 2px ${B.violet}` : "none",
              transition:"box-shadow 150ms",
            }} />
            {/* Nombre oficial del manual (español) */}
            <div style={{ fontFamily:B.fontData, fontWeight:700, fontSize:11, color:B.text1, textTransform:"uppercase", letterSpacing:"0.06em" }}>{c.brand}</div>
            <div style={{ fontFamily:B.fontData, fontSize:10, color:B.violet, marginTop:1 }}>{copied===c.hex ? "✓ Copiado" : c.hex}</div>
            <div style={{ fontFamily:B.fontBody, fontSize:10, color:B.text4, marginTop:2 }}>{c.role}</div>
          </div>
        ))}
      </div>

      <div style={{ fontFamily:B.fontData, fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", color:B.text4, marginBottom:12 }}>Gradientes de Marca</div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:40 }}>
        {[
          ["Main", B.gradMain, "Default brand gradient"],
          ["Vibrant", B.gradVibrant, "Hero sections, CTAs"],
          ["Glow", B.gradGlow, "AI actions, accent areas"],
        ].map(([name, grad, desc]) => (
          <div key={name} style={{ height:80, borderRadius:"12px 12px 3px 12px", background:grad, display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:14, border:`1px solid ${B.border1}` }}>
            <div style={{ fontFamily:B.fontData, fontWeight:600, fontSize:11, color:"rgba(255,255,255,0.9)", textTransform:"uppercase" }}>{name}</div>
            <div style={{ fontFamily:B.fontBody, fontSize:11, color:"rgba(255,255,255,0.5)" }}>{desc}</div>
          </div>
        ))}
      </div>

      <div style={{ fontFamily:B.fontData, fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", color:B.text4, marginBottom:12 }}>Block Type Colors (dark surfaces)</div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:8, marginBottom:40 }}>
        {blockColors.map(([name, c]) => (
          <div key={name} style={{ textAlign:"center" }}>
            <div style={{
              height:72, borderRadius:"12px 12px 3px 12px",
              background:c.light, border:`1px solid ${c.border}`,
              display:"flex", alignItems:"center", justifyContent:"center", marginBottom:8,
            }}>
              <div style={{ width:28, height:28, borderRadius:"8px 8px 2px 8px", background:c.base, boxShadow:`0 0 12px ${c.base}60` }} />
            </div>
            <div style={{ fontFamily:B.fontData, fontWeight:600, fontSize:10, color:B.text2, textTransform:"uppercase" }}>{name}</div>
            <div style={{ fontFamily:B.fontData, fontSize:10, color:B.text4 }}>{c.base}</div>
          </div>
        ))}
      </div>

      <div style={{ fontFamily:B.fontData, fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", color:B.text4, marginBottom:12 }}>Escala de Superficies</div>
      <div style={{ display:"flex", gap:8 }}>
        {surfaces.map(s => (
          <div key={s.name} style={{ flex:1, height:64, background:s.hex, borderRadius:"12px 12px 3px 12px", display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:10, border:`1px solid rgba(255,255,255,0.06)` }}>
            <div style={{ fontFamily:B.fontData, fontWeight:600, fontSize:10, color:"rgba(255,255,255,0.6)" }}>{s.name}</div>
            <div style={{ fontFamily:B.fontBody, fontSize:10, color:"rgba(255,255,255,0.3)" }}>{s.role}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TypographySection() {
  // [label, font, size, weight, tracking, lineH, use]
  const scale = [
    ["Display",            "Space Grotesk", "48px", "700", "0.04em",  "1.0",  "Cifras impactantes, métricas grandes, pantallas hero"],
    ["H1 / Section Title", "Space Grotesk", "28px", "700", "0.02em",  "1.2",  "Títulos de sección en pantalla"],
    ["H2 / Card Header",   "Space Grotesk", "20px", "700", "0.02em",  "1.2",  "Títulos de card, sub-secciones"],
    ["H3 / Label Header",  "Space Grotesk", "14px", "600", "0.06em",  "1.3",  "Labels de formulario, column headers"],
    ["Body Large",         "Ubuntu",        "16px", "400", "normal",  "1.65", "Contenido primario, descripciones"],
    ["Body Base",          "Ubuntu",        "14px", "400", "normal",  "1.6",  "Texto de UI, inputs, body default"],
    ["Body Small",         "Ubuntu",        "13px", "400", "normal",  "1.5",  "Meta info, helper text"],
    ["Body Light",         "Ubuntu",        "14px", "300", "normal",  "1.6",  "Texto editorial, bajo énfasis"],
    ["Caption / Overline", "Space Grotesk", "11px", "600", "0.10em",  "1.4",  "Overlines, timestamps, badges — uppercase"],
    ["Data / Métrica",     "Space Grotesk", "12px", "500", "0.02em",  "1.4",  "Valores de tokens, código, métricas"],
  ];

  const fonts = [
    {
      name:"Space Grotesk", role:"Headings / UI",
      family: B.fontData,
      sample:"Aa",
      weights:["Variable 300–700"],
      note:"Para todos los headings H1–H3, labels, badges y métricas. Uppercase con tracking positivo.",
      sampleStyle:{ letterSpacing:"0.02em" },
    },
    {
      name:"Ubuntu", role:"Body / UI",
      family: B.fontBody,
      sample:"Aa",
      weights:["Light 300","Regular 400","Medium 500","Bold 700"],
      note:"Texto corrido, UI e inputs. Nunca uppercase forzado. Line-height 1.5–1.65.",
      sampleStyle:{ letterSpacing:"normal" },
    },
    {
      name:"Protrakt", role:"Referencia — solo assets",
      family: B.fontData,
      sample:"↗",
      weights:["Bold 700"],
      note:"Fuente de display del logo de ROAS. No se usa en el UI — solo en assets gráficos de marca (logos, banners, materiales impresos).",
      sampleStyle:{ letterSpacing:"0.02em" },
    },
  ];

  return (
    <div>
      <SH title="Typography" sub="Dos fuentes de UI: Space Grotesk (headings, labels, datos) · Ubuntu (cuerpo, inputs, párrafos). Protrakt solo existe en assets de marca — no en el UI." />

      {/* Font showcase — cada tarjeta usa SU PROPIA fuente para todo el contenido */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginBottom:20 }}>
        {fonts.map(f => (
          <div key={f.name} style={{
            background:B.surf2, border:`1px solid ${B.border1}`,
            borderRadius:"16px 16px 4px 16px", padding:24, overflow:"hidden",
            display:"flex", flexDirection:"column",
          }}>
            {/* Role label — en la fuente de esa tarjeta, no en Protrakt */}
            <div style={{ fontFamily:f.family, fontWeight:600, fontSize:10, color:B.text4, textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:8 }}>{f.role}</div>
            {/* Sample */}
            <div style={{
              fontFamily:f.family,
              fontWeight:700, fontSize:52, color:B.text1, lineHeight:1, marginBottom:16,
              ...f.sampleStyle,
            }}>{f.sample}</div>
            {/* Font name */}
            <div style={{ fontFamily:B.fontData, fontWeight:600, fontSize:14, color:B.violet, marginBottom:6 }}>{f.name}</div>
            {/* Weights — en la fuente de esa tarjeta */}
            <div style={{ display:"flex", flexWrap:"wrap", gap:4, marginBottom:12 }}>
              {f.weights.map(w => <span key={w} style={{ fontFamily:f.family, fontSize:11, color:B.text4, background:B.surf3, padding:"2px 8px", borderRadius:4 }}>{w}</span>)}
            </div>
            {/* Usage note */}
            <div style={{ marginTop:"auto", paddingTop:12, borderTop:`1px solid ${B.border1}`, fontFamily:B.fontBody, fontSize:11, color:B.text3, lineHeight:1.5 }}>{f.note}</div>
          </div>
        ))}
      </div>

      {/* Reglas de uso — errores comunes */}
      <div style={{ background:B.surf1, borderRadius:12, padding:20, marginBottom:24, border:`1px solid ${B.border1}` }}>
        <div style={{ fontFamily:B.fontData, fontSize:10, fontWeight:600, color:B.text4, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:14 }}>Reglas de Uso — Errores Frecuentes</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
          {[
            [true,  "Protrakt SOLO para hero/brand mark a 48px o más"],
            [false, "Protrakt en títulos de UI, cards o tamaños menores a 40px"],
            [true,  "Space Grotesk Bold para todos los headings H1–H3 de UI"],
            [false, "Space Grotesk para texto corrido de más de 1 línea"],
            [true,  "Ubuntu para párrafos, inputs y descripciones"],
            [false, "Ubuntu en uppercase con letter-spacing forzado"],
            [true,  "Tracking positivo en Space Grotesk uppercase (0.04–0.10em)"],
            [false, "Tracking negativo fuera de Protrakt display"],
          ].map(([ok, rule], i) => (
            <div key={i} style={{
              display:"flex", alignItems:"flex-start", gap:8, padding:"8px 12px",
              borderRadius:8,
              background: ok ? "rgba(0,224,150,0.05)" : "rgba(255,59,92,0.05)",
              border:`1px solid ${ok ? "rgba(0,224,150,0.15)" : "rgba(255,59,92,0.15)"}`,
            }}>
              <span style={{ fontFamily:B.fontData, fontSize:13, fontWeight:700, color: ok ? "#00E096" : "#FF3B5C", flexShrink:0, lineHeight:1.3 }}>{ok ? "✓" : "✗"}</span>
              <span style={{ fontFamily:B.fontBody, fontSize:12, color: ok ? "#B0EDD6" : "#EDB0B8", lineHeight:1.4 }}>{rule}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Escala tipográfica completa */}
      <div style={{ background:B.surf1, borderRadius:16, overflow:"hidden", border:`1px solid ${B.border1}` }}>
        <div style={{ display:"grid", gridTemplateColumns:"2.5fr 1fr 1fr 1fr 1fr 2fr", background:B.surf2, borderBottom:`1px solid ${B.border1}` }}>
          {["Muestra / Fuente", "Tamaño", "Peso", "Tracking", "Line-h.", "Uso"].map(h => (
            <div key={h} style={{ padding:"10px 16px", fontFamily:B.fontData, fontSize:10, fontWeight:600, color:B.text4, textTransform:"uppercase", letterSpacing:"0.08em" }}>{h}</div>
          ))}
        </div>
        {scale.map(([label, font, size, weight, tracking, lh, use]) => {
          const ff = font==="Protrakt" ? B.fontDisplay : font==="Ubuntu" ? B.fontBody : B.fontData;
          return (
            <div key={label} style={{ display:"grid", gridTemplateColumns:"2.5fr 1fr 1fr 1fr 1fr 2fr", borderBottom:`1px solid rgba(255,255,255,0.04)`, alignItems:"center" }}>
              <div style={{ padding:"12px 16px" }}>
                <div style={{
                  fontFamily:ff, fontSize:size, fontWeight:weight, color:B.text1,
                  textTransform: font==="Protrakt" ? "uppercase" : "none",
                  lineHeight:lh, letterSpacing:tracking,
                }}>{label}</div>
                <div style={{ fontFamily:B.fontData, fontSize:9, color:B.text4, marginTop:3, textTransform:"uppercase", letterSpacing:"0.06em" }}>{font}</div>
              </div>
              <div style={{ padding:"12px 16px" }}><Tag>{size}</Tag></div>
              <div style={{ padding:"12px 16px" }}><Tag>{weight}</Tag></div>
              <div style={{ padding:"12px 16px" }}><Tag>{tracking}</Tag></div>
              <div style={{ padding:"12px 16px" }}><Tag>{lh}</Tag></div>
              <div style={{ padding:"12px 16px", fontFamily:B.fontBody, fontSize:12, color:B.text3, lineHeight:1.4 }}>{use}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ShapesSection() {
  return (
    <div>
      <SH title="Shapes & Patterns" sub="El corte angular en una esquina es el DNA de ROAS. Los contenedores de la marca usan esta firma. El ↗ del logo se usa como textura de fondo." />

      <div style={{ fontFamily:B.fontData, fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", color:B.text4, marginBottom:16 }}>Formas de Contenedor — Firma de Marca</div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:40 }}>
        {[
          { label:"Card Default", radius:"16px 16px 4px 16px", note:"Bottom-right cortado" },
          { label:"Card Alt", radius:"4px 16px 16px 16px", note:"Top-left cortado" },
          { label:"Card Accent", radius:"16px 4px 16px 16px", note:"Top-right cortado" },
          { label:"Pill CTA", radius:"9999px", note:"Full radius — solo CTAs" },
        ].map(s => (
          <div key={s.label} style={{ textAlign:"center" }}>
            <div style={{
              height:80, background:B.gradGlow,
              borderRadius:s.radius, marginBottom:10,
              display:"flex", alignItems:"center", justifyContent:"center",
            }}>
              <ArrowIcon size={20} color="rgba(255,255,255,0.6)" />
            </div>
            <div style={{ fontFamily:B.fontData, fontWeight:600, fontSize:11, color:B.text2, textTransform:"uppercase" }}>{s.label}</div>
            <div style={{ fontFamily:B.fontBody, fontSize:11, color:B.text4, marginTop:3 }}>{s.note}</div>
          </div>
        ))}
      </div>

      <div style={{ fontFamily:B.fontData, fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", color:B.text4, marginBottom:16 }}>Patrones de Textura</div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginBottom:40 }}>
        {[
          { label:"↗ Arrow Pattern (violet)", bg:B.navy, color:"#7A5AF8", opacity:0.35 },
          { label:"↗ Arrow Pattern (dark)", bg:B.surf0, color:"#181349", opacity:0.8 },
          { label:"R Letter Pattern", bg:B.surf2, color:B.violet, opacity:0.2 },
        ].map((p, i) => (
          <div key={i} style={{
            height:140, borderRadius:"16px 16px 4px 16px",
            background:p.bg, position:"relative", overflow:"hidden",
            border:`1px solid ${B.border1}`,
            display:"flex", alignItems:"flex-end", padding:14,
          }}>
            <div style={{
              position:"absolute", inset:0, opacity:p.opacity,
              backgroundImage: i < 2
                ? `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 32L32 8M32 8H18M32 8V22' stroke='${encodeURIComponent(p.color)}' strokeWidth='2' fill='none'/%3E%3C/svg%3E")`
                : `url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='5' y='40' font-family='sans-serif' font-size='40' font-weight='bold' fill='${encodeURIComponent(p.color)}'%3ER%3C/text%3E%3C/svg%3E")`,
              backgroundSize: i < 2 ? "40px 40px" : "50px 50px",
            }} />
            <div style={{ position:"relative", fontFamily:B.fontData, fontSize:11, fontWeight:600, color:B.text2, textTransform:"uppercase", letterSpacing:"0.05em" }}>{p.label}</div>
          </div>
        ))}
      </div>

      <div style={{ fontFamily:B.fontData, fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", color:B.text4, marginBottom:16 }}>Border Radius Scale</div>
      <div style={{ display:"flex", gap:12 }}>
        {[["4px","Corner cut"],["8px","Small card"],["12px","Input"],["16px","Card"],["20px","Modal"],["9999px","Pill"]].map(([r,desc]) => (
          <div key={r} style={{ flex:1, textAlign:"center" }}>
            <div style={{ height:60, background:B.surf3, borderRadius:r, border:`1px solid ${B.border2}`, marginBottom:8 }} />
            <div style={{ fontFamily:B.fontData, fontSize:11, color:B.text2, fontWeight:600 }}>{r}</div>
            <div style={{ fontFamily:B.fontBody, fontSize:10, color:B.text4, marginTop:2 }}>{desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ButtonsSection() {
  const [loading, setLoading] = useState(false);
  const triggerLoad = () => { setLoading(true); setTimeout(()=>setLoading(false), 2000); };

  const base = {
    display:"inline-flex", alignItems:"center", justifyContent:"center", gap:8,
    fontFamily:B.fontBody, fontWeight:700, cursor:"pointer",
    border:"none", outline:"none",
    transition:"all 150ms cubic-bezier(0.4,0,0.2,1)",
    letterSpacing:"0.01em",
  };

  const variants = [
    { name:"Primary", s:{ background:B.gradGlow, color:"#fff", borderRadius:"12px 12px 3px 12px", padding:"10px 20px", fontSize:14, boxShadow:`0 4px 20px rgba(122,90,248,0.40)` } },
    { name:"Secondary", s:{ background:"transparent", color:B.violet, border:`1.5px solid ${B.border3}`, borderRadius:"12px 12px 3px 12px", padding:"10px 20px", fontSize:14 } },
    { name:"Ghost", s:{ background:"rgba(122,90,248,0.08)", color:B.text2, borderRadius:"12px 12px 3px 12px", padding:"10px 20px", fontSize:14 } },
    { name:"Danger", s:{ background:"rgba(255,59,92,0.12)", color:"#FF3B5C", border:"1.5px solid rgba(255,59,92,0.3)", borderRadius:"12px 12px 3px 12px", padding:"10px 20px", fontSize:14 } },
    { name:"✦ AI Generate", s:{ background:`linear-gradient(135deg, #9B6FFF, #7A5AF8, #3D2FA0)`, color:"#fff", borderRadius:"12px 12px 3px 12px", padding:"10px 20px", fontSize:14, boxShadow:`0 4px 24px rgba(122,90,248,0.50), 0 0 0 1px rgba(255,255,255,0.1) inset` } },
  ];

  return (
    <div>
      <SH title="Buttons" sub="5 variantes. Corners asimétricos (firma de marca). AI variant con glow especial. Loading state con spinner." />

      <div style={{ fontFamily:B.fontData, fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", color:B.text4, marginBottom:16 }}>Variantes</div>
      <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:32, alignItems:"center" }}>
        {variants.map(v => (
          <button key={v.name} style={{ ...base, ...v.s }}>
            {v.name.includes("✦") && <span style={{ fontSize:12 }}>✦</span>}
            {v.name.replace("✦ ","")}
          </button>
        ))}
      </div>

      <div style={{ fontFamily:B.fontData, fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", color:B.text4, marginBottom:16 }}>Estados</div>
      <div style={{ display:"flex", gap:12, alignItems:"center", marginBottom:32 }}>
        <button style={{ ...base, ...variants[0].s }}>Default</button>
        <button style={{ ...base, ...variants[0].s, transform:"scale(0.98)", filter:"brightness(1.15)" }}>Hover</button>
        <button style={{ ...base, ...variants[0].s, opacity:0.35, cursor:"not-allowed" }}>Disabled</button>
        <button onClick={triggerLoad} style={{ ...base, ...variants[4].s, minWidth:160 }}>
          {loading ? (
            <span style={{ display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ width:14, height:14, border:"2px solid rgba(255,255,255,0.25)", borderTopColor:"#fff", borderRadius:"50%", display:"inline-block", animation:"cbspin 0.7s linear infinite" }} />
              Generando…
            </span>
          ) : <><span style={{fontSize:12}}>✦</span> Generar con AI</>}
        </button>
        <button style={{ ...base, ...variants[0].s, boxShadow:`0 0 0 3px rgba(122,90,248,0.4)` }}>Focused</button>
      </div>

      <div style={{ fontFamily:B.fontData, fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", color:B.text4, marginBottom:16 }}>Tamaños</div>
      <div style={{ display:"flex", gap:12, alignItems:"center" }}>
        {[["SM", "8px 14px", 12], ["MD", "10px 20px", 14], ["LG", "14px 28px", 16]].map(([size, p, fs]) => (
          <button key={size} style={{ ...base, ...variants[0].s, padding:p, fontSize:fs }}>Button {size}</button>
        ))}
      </div>
      <style>{`@keyframes cbspin { to { transform:rotate(360deg); } }`}</style>
    </div>
  );
}

function BadgesSection() {
  const blocks = ["pain","promise","proof","constraints","curiosity","conditions","offer"];
  const base = { display:"inline-flex", alignItems:"center", borderRadius:9999, fontFamily:B.fontBody, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase" };

  return (
    <div>
      <SH title="Badges" sub="7 block types como chips de color en dark surface. Siempre subtle (dark bg + color de acento vibrante). Solid solo en fondos claros." />

      <div style={{ fontFamily:B.fontData, fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", color:B.text4, marginBottom:12 }}>Block Type — Subtle (default, dark)</div>
      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:24 }}>
        {blocks.map(t => {
          const c = B[t];
          return (
            <span key={t} style={{ ...base, background:c.light, color:c.base, border:`1px solid ${c.border}`, padding:"4px 12px", fontSize:11 }}>
              {t.charAt(0).toUpperCase()+t.slice(1)}
            </span>
          );
        })}
      </div>

      <div style={{ fontFamily:B.fontData, fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", color:B.text4, marginBottom:12 }}>Block Type — Sólido (contraste alto)</div>
      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:24 }}>
        {blocks.map(t => {
          const c = B[t];
          return (
            <span key={t} style={{ ...base, background:c.base, color:"#fff", padding:"4px 12px", fontSize:11, boxShadow:`0 0 10px ${c.base}40` }}>
              {t.charAt(0).toUpperCase()+t.slice(1)}
            </span>
          );
        })}
      </div>

      <div style={{ fontFamily:B.fontData, fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", color:B.text4, marginBottom:12 }}>Utility Badges</div>
      <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
        {[
          ["✦ AI", B.violet, "rgba(122,90,248,0.15)"],
          ["BETA", B.periwinkle, "rgba(189,192,239,0.1)"],
          ["NEW", B.promise.base, "rgba(0,224,150,0.1)"],
          ["PRO", "#FFB547", "rgba(255,181,71,0.1)"],
          ["+3 más", B.text3, "rgba(255,255,255,0.05)"],
        ].map(([label, color, bg]) => (
          <span key={label} style={{ ...base, background:bg, color, border:`1px solid ${color}30`, padding:"4px 12px", fontSize:11 }}>{label}</span>
        ))}
      </div>
    </div>
  );
}

function InputsSection() {
  const [val, setVal] = useState("");

  const inputBase = {
    display:"block", width:"100%", boxSizing:"border-box",
    fontFamily:B.fontBody, fontSize:14, color:B.text1,
    background:B.surf2, outline:"none",
    transition:"all 150ms",
  };
  const lbl = { display:"block", fontFamily:B.fontData, fontWeight:600, fontSize:11, color:B.text3, marginBottom:6, textTransform:"uppercase", letterSpacing:"0.08em" };

  return (
    <div>
      <SH title="Inputs" sub="Superficies oscuras surf2. Focus con glow violet. Error con glow red. Labels siempre arriba en Space Grotesk uppercase." />

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }}>
        <div>
          <label style={lbl}>Block Content</label>
          <input placeholder="Escribe tu copy block…" style={{ ...inputBase, padding:"11px 14px", border:`1.5px solid ${B.border1}`, borderRadius:"12px 12px 3px 12px" }} />
          <div style={{ fontFamily:B.fontBody, fontSize:12, color:B.text4, marginTop:6 }}>Texto de ayuda opcional</div>
        </div>
        <div>
          <label style={lbl}>Estado Focus</label>
          <input defaultValue="Copy en progreso…" style={{ ...inputBase, padding:"11px 14px", border:`1.5px solid ${B.violet}`, borderRadius:"12px 12px 3px 12px", boxShadow:`0 0 0 3px rgba(122,90,248,0.20)` }} />
        </div>
        <div>
          <label style={lbl}>Error State</label>
          <input defaultValue="x" style={{ ...inputBase, padding:"11px 14px", border:`1.5px solid #FF3B5C`, borderRadius:"12px 12px 3px 12px", boxShadow:"0 0 0 3px rgba(255,59,92,0.15)" }} />
          <div style={{ fontFamily:B.fontBody, fontSize:12, color:"#FF3B5C", marginTop:6 }}>Este campo es requerido</div>
        </div>
        <div>
          <label style={{ ...lbl, color:B.text4 }}>Disabled</label>
          <input disabled value="No editable" style={{ ...inputBase, padding:"11px 14px", border:`1.5px solid rgba(255,255,255,0.06)`, borderRadius:"12px 12px 3px 12px", color:B.text4, cursor:"not-allowed" }} />
        </div>
        <div style={{ gridColumn:"1/-1" }}>
          <label style={lbl}>Textarea — Long-form Block</label>
          <textarea value={val} onChange={e=>setVal(e.target.value)}
            placeholder="Describe el dolor exacto del cliente. Sé específico — no 'no tienes tiempo' sino 'tu hijo se duerme antes de que llegues a casa'."
            style={{ ...inputBase, padding:"12px 14px", border:`1.5px solid ${B.border1}`, borderRadius:"12px 12px 3px 12px", minHeight:120, resize:"vertical", lineHeight:1.6 }}
          />
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:6 }}>
            <div style={{ fontFamily:B.fontBody, fontSize:12, color:B.text4 }}>Descripción del punto de dolor</div>
            <div style={{ fontFamily:B.fontData, fontSize:11, color: val.length>200 ? "#FF3B5C" : B.text4 }}>{val.length}/280</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlockCardsSection() {
  const [sel, setSel] = useState(null);
  const [exp, setExp] = useState(null);
  const blocks = [
    { id:1, type:"pain", content:"Llevas 6 meses invirtiendo $5,000+ al mes en ads que apenas llegan a break-even. Tus competidores están escalando a 7 cifras. La diferencia no es presupuesto — es sistema.", meta:"ROAS Academy · hace 3 días" },
    { id:2, type:"promise", content:"¿Qué pasaría si pudieras generar 10 variaciones de copy de alto rendimiento en menos de 1 hora, usando un framework que ya funciona para más de 200 marcas?", meta:"ROAS Academy · hace 1 semana" },
    { id:3, type:"proof", content:"De ROAS 0.8x a 3.2x en 45 días usando el método CASH en tráfico frío. Sin aumentar presupuesto. Solo mejor copy.", meta:"NutriBrand · hace 2 semanas" },
    { id:4, type:"curiosity", content:"La única frase que detiene el scroll en frío — y por qué la mayoría de copywriters nunca la aprenden.", meta:"ROAS Academy · hace 5 días" },
  ];

  return (
    <div>
      <SH title="Block Cards" sub="La unidad principal de CopyBlocks. Color semántico por tipo en superficies oscuras. Hover revela acciones. Selección con borde violet." />

      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
        {blocks.map(b => {
          const c = B[b.type];
          const isSel = sel===b.id, isExp = exp===b.id;
          return (
            <div key={b.id} onClick={()=>setSel(isSel?null:b.id)} style={{
              background:B.surf2,
              border:`1.5px solid ${isSel ? B.violet : B.border1}`,
              borderRadius:"16px 16px 4px 16px",
              padding:20, cursor:"pointer",
              boxShadow: isSel ? `0 0 0 3px rgba(122,90,248,0.25)` : "none",
              transition:"all 200ms",
            }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12 }}>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                    <span style={{
                      display:"inline-flex", alignItems:"center",
                      background:c.light, color:c.base,
                      border:`1px solid ${c.border}`,
                      padding:"3px 10px", borderRadius:9999,
                      fontFamily:B.fontData, fontWeight:700, fontSize:10,
                      textTransform:"uppercase", letterSpacing:"0.08em",
                    }}>{b.type}</span>
                    {isSel && <span style={{ fontFamily:B.fontData, fontSize:10, color:B.violet, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.05em" }}>✓ Seleccionado</span>}
                  </div>
                  <p style={{
                    fontFamily:B.fontBody, fontSize:14, color:B.text1,
                    lineHeight:1.65, margin:0,
                    display:"-webkit-box", WebkitLineClamp:isExp?99:2,
                    WebkitBoxOrient:"vertical", overflow:"hidden",
                  }}>{b.content}</p>
                  <div style={{ fontFamily:B.fontData, fontSize:11, color:B.text4, marginTop:8 }}>{b.meta}</div>
                </div>
                <div style={{ display:"flex", gap:4, flexShrink:0 }}>
                  {["↕","✎","⧉"].map(icon => (
                    <button key={icon} onClick={e=>{e.stopPropagation();if(icon==="↕")setExp(isExp?null:b.id);}} style={{
                      background:"rgba(255,255,255,0.05)", border:"none", cursor:"pointer",
                      padding:"6px 8px", borderRadius:8, color:B.text4, fontSize:12,
                      transition:"background 150ms",
                    }}>{icon}</button>
                  ))}
                </div>
              </div>
              {isExp && (
                <div style={{ marginTop:16, paddingTop:16, borderTop:`1px solid ${B.border1}` }}>
                  <div style={{ display:"flex", gap:8 }}>
                    {[["Usar en Ad", B.violet, "rgba(122,90,248,0.15)"],["Copiar", B.text3, B.surf3],["Eliminar","#FF3B5C","rgba(255,59,92,0.1)"]].map(([l,c,bg]) => (
                      <button key={l} style={{ flex:1, padding:"9px", background:bg, color:c, border:"none", borderRadius:"10px 10px 3px 10px", fontFamily:B.fontBody, fontSize:13, fontWeight:700, cursor:"pointer" }}>{l}</button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function NavigationSection() {
  const [active, setActive] = useState("dashboard");
  const navItems = [
    { id:"dashboard", icon:"⊞", label:"Dashboard" },
    { id:"blocks", icon:"◫", label:"Block Bank", count:47 },
    { id:"concepts", icon:"◈", label:"Concepts", count:12 },
    { id:"composer", icon:"✍", label:"Ad Composer" },
    { id:"script", icon:"◉", label:"Script Builder" },
    { id:"generator", icon:"✦", label:"Quick Gen", ai:true },
    { id:"import", icon:"⬇", label:"Import" },
  ];

  return (
    <div>
      <SH title="Navigation" sub="Sidebar 220px en Navy #181349. Items activos con fondo violet. Brand selector siempre primero con el logotipo de ROAS. AI badge en Quick Gen." />

      <div style={{ display:"grid", gridTemplateColumns:"220px 1fr", gap:32 }}>
        <div style={{
          background:B.navy, borderRadius:"20px 20px 4px 20px",
          padding:"20px 0", minHeight:480,
          border:`1px solid rgba(122,90,248,0.2)`,
          boxShadow:`4px 0 20px rgba(0,0,0,0.4)`,
          position:"relative",
        }}>
          {/* Brand */}
          <div style={{ padding:"0 16px 16px", borderBottom:`1px solid rgba(122,90,248,0.15)`, marginBottom:8 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 10px", borderRadius:"10px 10px 3px 10px", background:"rgba(122,90,248,0.2)", cursor:"pointer" }}>
              <div style={{ width:30, height:30, borderRadius:"8px 8px 2px 8px", background:B.gradGlow, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <ArrowIcon size={14} color="#fff" />
              </div>
              <div>
                <div style={{ fontFamily:B.fontData, fontWeight:700, fontSize:12, color:"#fff", textTransform:"uppercase", letterSpacing:"0.10em", lineHeight:1 }}>ROAS</div>
                <div style={{ fontFamily:B.fontBody, fontSize:10, color:B.violet, marginTop:2 }}>academy ↓</div>
              </div>
            </div>
          </div>

          <div style={{ padding:"0 12px" }}>
            {navItems.map(item => (
              <div key={item.id} onClick={()=>setActive(item.id)} style={{
                display:"flex", alignItems:"center", gap:10,
                padding:"9px 12px", borderRadius:"10px 10px 3px 10px",
                cursor:"pointer", marginBottom:2,
                background: active===item.id ? "rgba(122,90,248,0.20)" : "transparent",
                borderLeft: active===item.id ? `2px solid ${B.violet}` : "2px solid transparent",
                transition:"all 150ms",
              }}>
                <span style={{ fontSize:13, color: active===item.id ? B.violet : B.text4, width:16, textAlign:"center" }}>{item.icon}</span>
                <span style={{ fontFamily:B.fontBody, fontSize:13, fontWeight: active===item.id ? 700 : 400, color: active===item.id ? "#fff" : B.text3, flex:1 }}>{item.label}</span>
                {item.ai && <span style={{ fontFamily:B.fontData, fontSize:9, background:B.gradGlow, color:"#fff", padding:"2px 7px", borderRadius:9999, fontWeight:700, letterSpacing:"0.06em" }}>AI</span>}
                {item.count && <span style={{ fontFamily:B.fontData, fontSize:10, color:B.text4 }}>{item.count}</span>}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {[
            ["Active state", `Fondo violet al 20% + borde izquierdo ${B.violet}. Label blanco, fontWeight 700.`],
            ["Hover state", "Fondo rgba(255,255,255,0.04). Transición 150ms."],
            ["AI badge", "Gradiente glow. Solo en Quick Gen. Nunca más de 1."],
            ["Brand selector", "Primero siempre. Muestra el ROAS arrow icon + nombre activo."],
            ["Border radius", "10px 10px 3px 10px — firma angular en todos los items."],
          ].map(([title, desc]) => (
            <div key={title} style={{ background:B.surf2, border:`1px solid ${B.border1}`, borderRadius:"12px 12px 3px 12px", padding:16 }}>
              <div style={{ fontFamily:B.fontData, fontWeight:600, fontSize:12, color:B.text2, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:4 }}>{title}</div>
              <div style={{ fontFamily:B.fontBody, fontSize:13, color:B.text3 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EmptyStatesSection() {
  return (
    <div>
      <SH title="Empty States" sub="Siempre: icono + razón clara + 1 CTA. Nunca pantalla en blanco. Guía al usuario a la siguiente acción productiva." />
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
        {[
          { icon:"◫", title:"Sin blocks todavía", desc:"Tu Block Bank está vacío. Añade tu primer copy block o importa desde un transcript.", cta:"+ Añadir Block", type:"default" },
          { icon:"✦", title:"AI lista", desc:"Describe tu oferta y Claude generará hooks y headlines probados para ti.", cta:"✦ Generar ahora", type:"ai" },
          { icon:"!", title:"Error de generación", desc:"Algo salió mal. Tus inputs están guardados — inténtalo de nuevo.", cta:"Reintentar", type:"error" },
        ].map(s => (
          <div key={s.title} style={{
            background: s.type==="ai" ? "rgba(122,90,248,0.08)" : s.type==="error" ? "rgba(255,59,92,0.06)" : B.surf2,
            border:`1px solid ${s.type==="ai" ? B.border2 : s.type==="error" ? "rgba(255,59,92,0.25)" : B.border1}`,
            borderRadius:"20px 20px 4px 20px", padding:32, textAlign:"center",
          }}>
            <div style={{ fontSize:36, color: s.type==="ai" ? B.violet : s.type==="error" ? "#FF3B5C" : B.text4, marginBottom:16 }}>{s.icon}</div>
            <div style={{ fontFamily:B.fontData, fontWeight:700, fontSize:17, color:B.text1, marginBottom:8, textTransform:"uppercase", letterSpacing:"0.04em" }}>{s.title}</div>
            <div style={{ fontFamily:B.fontBody, fontSize:13, color:B.text3, lineHeight:1.6, marginBottom:24 }}>{s.desc}</div>
            <button style={{
              background: s.type==="ai" ? B.gradGlow : s.type==="error" ? "rgba(255,59,92,0.2)" : "rgba(122,90,248,0.15)",
              color: s.type==="error" ? "#FF3B5C" : "#fff",
              border:`1px solid ${s.type==="ai" ? "transparent" : s.type==="error" ? "rgba(255,59,92,0.3)" : B.border2}`,
              borderRadius:"10px 10px 3px 10px", padding:"10px 20px",
              fontFamily:B.fontBody, fontWeight:700, fontSize:13, cursor:"pointer",
              boxShadow: s.type==="ai" ? `0 4px 20px rgba(122,90,248,0.4)` : "none",
            }}>{s.cta}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function PatternsSection() {
  const patterns = [
    { title:"AI Generation Flow", items:["Botón: ✦ [Verbo] con AI — siempre con el ✦ prefix","Loading: spinner + 'Generando…' — nunca vaciar la pantalla","Success: fade-in con animación + Copy + Guardar inmediatos","Error: toast rojo + input preservado — nunca perder trabajo del usuario"] },
    { title:"CRO: Friction Reduction", items:["Brand context pre-cargado en cada call de AI","Block type default = Pain (punto de entrada más común)","Auto-focus al primer input al abrir modal","Save button siempre visible en formularios multi-paso"] },
    { title:"Visual Hierarchy", items:["Un solo H1 por pantalla (Protrakt, uppercase)","CTA primary siempre el más grande y visible","Destructive actions nunca son primary","Stats en fontData semibold, labels en regular debajo"] },
    { title:"Dark Surface Rules", items:["Nunca usar color block como decoración — solo semántico","Gradiente glow solo en el elemento más importante de la pantalla","Border opacity 15-40% según jerarquía (border1 → border3)","Texto en 4 niveles: text1(blanco) text2 text3 text4(sutil)"] },
    { title:"Brand Geometry", items:["Corner asimétrico (16px 16px 4px 16px) en todos los contenedores","Arrow icon ↗ usado como elemento gráfico de refuerzo","Patrón de flechas en hero sections y surfaces vacías","Nunca mezclar pill radius con card radius en el mismo grupo"] },
    { title:"Feedback Loops", items:["Toast: 3s, bottom-right, solo acción en errores","Botón loading: inmediato al click — max 50ms delay","Copy to clipboard: reemplaza icon con ✓ por 1.5s","Autosave: silencioso, muestra 'Guardado ✓' 2s luego fade"] },
  ];

  return (
    <div>
      <SH title="Patterns & CRO" sub="Patrones de alto nivel que gobiernan cómo se ensamblan las pantallas. Las reglas invisibles que hacen a CopyBlocks sentirse rápido y confiable." />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
        {patterns.map(p => (
          <div key={p.title} style={{ background:B.surf2, border:`1px solid ${B.border1}`, borderRadius:"16px 16px 4px 16px", padding:24 }}>
            <div style={{ fontFamily:B.fontData, fontWeight:700, fontSize:13, color:B.text1, marginBottom:16, textTransform:"uppercase", letterSpacing:"0.08em" }}>{p.title}</div>
            {p.items.map((item,i) => (
              <div key={i} style={{ display:"flex", gap:10, marginBottom:10 }}>
                <span style={{ color:B.violet, fontFamily:B.fontData, fontSize:12, flexShrink:0, marginTop:2 }}>↗</span>
                <span style={{ fontFamily:B.fontBody, fontSize:13, color:B.text3, lineHeight:1.55 }}>{item}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function TokensSection() {
  return (
    <div>
      <SH title="Tokens CSS" sub="Custom properties listas para copiar en :root. Nombres basados en el manual de marca oficial de ROAS Academy." />
      <div style={{ background:B.richBlack, borderRadius:"16px 16px 4px 16px", padding:32, fontFamily:B.fontData, fontSize:12, color:B.text3, lineHeight:2, border:`1px solid ${B.border1}`, overflowX:"auto" }}>
        <div style={{ color:B.violet }}>/* CopyBlocks Design Tokens — ROAS Academy · Manual de Marca 2025 */</div>
        <div style={{ color:B.text4 }}>:root {"{"}</div>
        {[
          ["/* Paleta Oficial (Manual de Marca — nombres en español) */",""],
          ["--roas-negro",              "#0B1020"],
          ["--roas-negro-azulado",      B.navy],
          ["--roas-violeta-electrico",  B.violet],
          ["--roas-violeta-profundo",   B.violetDark],
          ["--roas-lavanda",            B.periwinkle],
          ["--roas-gris",               B.payne],
          ["--roas-gris-claro",         B.antiflash],
          ["--roas-blanco",             "#FFFFFF"],
          ["/* Superficies (derivadas de Negro Azulado) */",""],
          ["--cb-surf-0", B.surf0],
          ["--cb-surf-1", B.surf1],
          ["--cb-surf-2", B.surf2],
          ["--cb-surf-3", B.surf3],
          ["--cb-surf-4", B.surf4],
          ["/* Texto sobre oscuro */",""],
          ["--cb-text-1", B.text1],
          ["--cb-text-2", B.text2],
          ["--cb-text-3", B.text3],
          ["--cb-text-4", B.text4],
          ["/* Tipografía — 3 roles, no intercambiables */",""],
          ["--cb-font-display", "'Protrakt', sans-serif"],
          ["--cb-font-body",    "'Ubuntu', sans-serif"],
          ["--cb-font-data",    "'Space Grotesk', sans-serif"],
          ["/* Escala tipográfica */",""],
          ["--cb-text-hero",   "48px"],
          ["--cb-text-h1",     "32px"],
          ["--cb-text-h2",     "20px"],
          ["--cb-text-h3",     "14px"],
          ["--cb-text-body-lg","16px"],
          ["--cb-text-body",   "14px"],
          ["--cb-text-sm",     "13px"],
          ["--cb-text-caption","11px"],
          ["/* Geometría — firma de marca (corte angular) */",""],
          ["--cb-radius-card",  "16px 16px 4px 16px"],
          ["--cb-radius-input", "12px 12px 3px 12px"],
          ["--cb-radius-btn",   "12px 12px 3px 12px"],
          ["/* Motion */",""],
          ["--cb-transition",   "all 150ms cubic-bezier(0.4,0,0.2,1)"],
          ["--cb-shadow-glow",  "0 4px 20px rgba(122,90,248,0.40)"],
          ["--cb-shadow-card",  "0 2px 12px rgba(0,0,0,0.40)"],
        ].map(([k,v],i) => (
          k.startsWith("/*")
            ? <div key={i} style={{ color:B.text4, marginTop:8 }}>{k}</div>
            : <div key={i}><span style={{ color:"#9B6FFF" }}>&nbsp;&nbsp;{k}</span>: <span style={{ color:"#00E096" }}>{v}</span>;</div>
        ))}
        <div style={{ color:B.text4 }}>{"}"}</div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════════════

const RENDERERS = {
  "Overview":OverviewSection, "Colors":ColorsSection, "Typography":TypographySection,
  "Shapes & Patterns":ShapesSection, "Buttons":ButtonsSection, "Badges":BadgesSection,
  "Inputs":InputsSection, "Block Cards":BlockCardsSection, "Navigation":NavigationSection,
  "Empty States":EmptyStatesSection, "Patterns & CRO":PatternsSection, "Tokens CSS":TokensSection,
};

export default function App() {
  const [active, setActive] = useState("Overview");
  const Renderer = RENDERERS[active] || OverviewSection;

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:B.surf0, fontFamily:B.fontBody }}>
      <style>{`
        ${FONT_CSS}
        * { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:${B.border2}; border-radius:3px; }
        button:focus-visible { outline:2px solid ${B.violet}; outline-offset:2px; }
        @keyframes cbspin { to { transform:rotate(360deg); } }
      `}</style>

      {/* SIDEBAR */}
      <div style={{
        width:220, flexShrink:0, background:B.navy,
        borderRight:`1px solid rgba(122,90,248,0.15)`,
        display:"flex", flexDirection:"column",
        position:"sticky", top:0, height:"100vh", overflowY:"auto",
      }}>
        {/* Logo */}
        <div style={{ padding:"24px 16px 20px", borderBottom:`1px solid rgba(122,90,248,0.12)` }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:34, height:34, borderRadius:"10px 10px 2px 10px", background:B.gradGlow, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <ArrowIcon size={16} color="#fff" />
            </div>
            <div>
              <div style={{ fontFamily:B.fontData, fontWeight:700, fontSize:13, color:"#fff", textTransform:"uppercase", letterSpacing:"0.10em", lineHeight:1 }}>COPYBLOCKS</div>
              <div style={{ fontFamily:B.fontBody, fontSize:10, color:B.violet, marginTop:3 }}>Design System v2</div>
            </div>
          </div>
        </div>

        {/* Groups */}
        <div style={{ padding:"16px 12px", flex:1 }}>
          {Object.entries(GROUPS).map(([group, items]) => (
            <div key={group} style={{ marginBottom:24 }}>
              <div style={{ fontFamily:B.fontData, fontSize:9, fontWeight:600, color:B.text4, textTransform:"uppercase", letterSpacing:"0.12em", padding:"0 10px", marginBottom:8 }}>{group}</div>
              {items.map(item => (
                <button key={item} onClick={()=>setActive(item)} style={{
                  display:"block", width:"100%", textAlign:"left",
                  padding:"9px 12px",
                  borderRadius:"10px 10px 3px 10px",
                  border:"none", cursor:"pointer",
                  background: active===item ? "rgba(122,90,248,0.20)" : "transparent",
                  borderLeft: active===item ? `2px solid ${B.violet}` : "2px solid transparent",
                  color: active===item ? "#fff" : B.text3,
                  fontFamily:B.fontBody, fontSize:13,
                  fontWeight: active===item ? 700 : 400,
                  marginBottom:2,
                  transition:"all 150ms",
                }}>{item}</button>
              ))}
            </div>
          ))}
        </div>

        <div style={{ padding:"12px 16px", borderTop:`1px solid rgba(122,90,248,0.1)` }}>
          <div style={{ fontFamily:B.fontData, fontSize:10, color:B.text4 }}>ROAS Academy © 2025</div>
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ flex:1, overflowY:"auto" }}>
        {/* Topbar */}
        <div style={{
          position:"sticky", top:0, zIndex:10,
          background:"rgba(11,16,32,0.90)", backdropFilter:"blur(16px)",
          borderBottom:`1px solid ${B.border1}`,
          padding:"14px 40px",
          display:"flex", alignItems:"center", gap:12,
        }}>
          <div style={{ fontFamily:B.fontData, fontWeight:700, fontSize:16, color:B.text1, textTransform:"uppercase", letterSpacing:"0.04em" }}>{active}</div>
          <div style={{ width:4, height:4, borderRadius:"50%", background:B.text4 }} />
          <div style={{ fontFamily:B.fontData, fontSize:11, color:B.text4, textTransform:"uppercase", letterSpacing:"0.06em" }}>
            {Object.entries(GROUPS).find(([,items])=>items.includes(active))?.[0]}
          </div>
        </div>

        {/* Main */}
        <div style={{ padding:"48px 48px", maxWidth:980, margin:"0 auto" }}>
          <Renderer />
        </div>
      </div>
    </div>
  );
}
