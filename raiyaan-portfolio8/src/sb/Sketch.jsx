import React, { useMemo } from "react";
import { CANONICAL_SKETCHBOOK_HTML } from "../tui/shaders/sketchbook/sketchbookDocument.js";
import s0 from "./s0.webp";
import s1 from "./s1.webp";
import s2 from "./s2.webp";
import s3 from "./s3.webp";
import s4 from "./s4.webp";
import s5 from "./s5.webp";
import s6 from "./s6.webp";
import s7 from "./s7.webp";
import s8 from "./s8.webp";
import fSerif from "./instrument-serif.woff2";
import fItalic from "./instrument-serif-italic.woff2";
import fNews from "./newsreader.woff2";

const PAGES = [
  { url: s0, title: "Hello", place: "Raiyaan" },
  { url: s1, title: "Orbit", place: "Co-founded startup" },
  { url: s2, title: "VaXease", place: "Hult Prize project" },
  { url: s3, title: "NaviSense", place: "Indoor navigation" },
  { url: s4, title: "SkyZen", place: "Flight booking prototype" },
  { url: s5, title: "FindBack", place: "Lost and found" },
  { url: s6, title: "UniResource Hub", place: "Campus booking app" },
  { url: s7, title: "What I am studying", place: "This semester" },
  { url: s8, title: "A letter to my future self", place: "Open in 2036" },
];

const HOST = `<style id="host">
:root{--paper:#000;--ink:#e8e3d6;--ink-soft:rgba(232,227,214,.62);--ink-faint:rgba(232,227,214,.42);--hairline:rgba(232,227,214,.16)}
html,body,.page{width:100%;height:100%;min-height:0;overflow:hidden;background:#000}
body>.wash{display:none}
.page>.top,.page>.rule,.page>.about,.page>.plates,.page>.contact,.page>.foot{display:none!important}
#sketchbook{width:100%;height:100%;min-height:0;padding:12px 0 10px;align-content:center}
#sketchbook>.botany,#sketchbook>.hero-kicker,#sketchbook>.hero-down{display:none!important}
#sketchbook .sb-wrap{gap:8px}
#sketchbook .sb-3d{max-width:min(980px,94vw)}
#sketchbook .sb-captions{min-height:18px}
@media(max-width:640px){#sketchbook{padding:4px 0}#sketchbook .sb-wrap{gap:5px}#sketchbook .sb-3d{max-width:100vw}}
</style>`;

function build() {
  let h = CANONICAL_SKETCHBOOK_HTML;
  h = h.replace("url(sketchbook/instrument-serif.woff2)", `url(${fSerif})`)
       .replace("url(sketchbook/instrument-serif-italic.woff2)", `url(${fItalic})`)
       .replace("url(sketchbook/newsreader.woff2)", `url(${fNews})`);
  const a = h.indexOf("const PAGES=["), b = h.indexOf("PAGES.forEach(p=>p.url=DIR+p.file);");
  if (a < 0 || b < 0) throw new Error("sketchbook source changed");
  h = h.slice(0, a) + "const PAGES=" + JSON.stringify(PAGES) + ";\n" + h.slice(b + "PAGES.forEach(p=>p.url=DIR+p.file);".length);
  h = h.replace("const M=PAGES.length, LAND=6;", "const M=PAGES.length, LAND=0;");
  h = h.replace("Drag the page to turn · Drag the glass across it", "Drag a page to turn it · Drag the glass over the ink");
  return h.replace("</head>", HOST + "</head>");
}

export default function Sketch() {
  const doc = useMemo(build, []);
  return (
    <iframe
      title="Sketchbook of projects and a letter to my future self"
      srcDoc={doc}
      sandbox="allow-scripts"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0, background: "#000" }}
    />
  );
}
