import React, { Suspense, lazy, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./tui/style.css";
import { AnimatedTopDock } from "./tui/shaders/animated-top-dock/AnimatedTopDock.js";
import { ElementsCollection } from "./tui/shaders/elements/ElementsCollection.js";

const Sketch = lazy(() => import("./sb/Sketch.jsx"));
const WireframeForms = lazy(() =>
  import("./tui/shaders/neuform-isolated/NeuformBatchEffects.js").then((m) => ({ default: m.WireframeForms }))
);
const CharacterCarousel = lazy(() =>
  import("./tui/shaders/character-carousel/CharacterCarousel.js").then((m) => ({ default: m.CharacterCarousel }))
);

/* mount a heavy effect only once its box is near the viewport */
function InView({ children, margin = "400px" }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) { setOn(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  return <div ref={ref} style={{ position: "absolute", inset: 0 }}>{on ? <Suspense fallback={null}>{children}</Suspense> : null}</div>;
}

function mount(id, node) {
  const el = document.getElementById(id);
  if (el) createRoot(el).render(node);
}

mount("dock", <div className="shader-frame-dock"><AnimatedTopDock variant="sable" proximity={122} spring={0.19} damping={0.7} widthGrowth={17} heightGrowth={16} drop={3.5} /></div>);
mount("water", <ElementsCollection variant="water" speed={0.7} size={1} particleAmount={1} hue={0} saturation={0} brightness={1} opacity={1} />);
mount("sk", <InView><Sketch /></InView>);
mount("wire", <InView><WireframeForms variant="sphere" mode="dark" speed={3} size={1} length={1} density={1} opacity={0.35} hue={0} saturation={1} brightness={1} /></InView>);
mount("cc", <InView><CharacterCarousel variant="wave" speed={1} scale={1.55} opacity={1} hue={0} saturation={1} brightness={1} /></InView>);

/* a card in the carousel asks the page to open that project's brief */
window.addEventListener("message", (e) => {
  const d = e.data;
  if (!d || d.type !== "open-project" || typeof d.id !== "string") return;
  if (!/^[a-z]+$/.test(d.id)) return;
  const b = document.createElement("button");
  b.setAttribute("data-open", d.id);
  b.style.display = "none";
  document.body.appendChild(b);
  b.click();
  b.remove();
});
