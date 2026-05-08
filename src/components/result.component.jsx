import React from "react";

const toRad = (deg) => (deg * Math.PI) / 180;

// ─────────────────────────────────────────────────────────────
//  Ground diagram (на грунті)
// ─────────────────────────────────────────────────────────────
const GroundDiagram = ({ height, angle, h, d1, d2 }) => {
  const SVG_W = 620;
  const SVG_H = 240;
  const PAD_L = 40;
  const PAD_R = 150;
  const PAD_T = 36;
  const PAD_B = 52;

  const drawW = SVG_W - PAD_L - PAD_R;
  const drawH = SVG_H - PAD_T - PAD_B;
  const scale = Math.min(drawW / ((d1 + d2) || 1), drawH / (h || 1));

  const ox = PAD_L;
  const oy = PAD_T + drawH;

  const Bx = ox + (d2 + d1) * scale;
  const By = oy;
  const Tx = Bx - d1 * scale;
  const Ty = oy - h * scale;
  const Sx = ox;
  const Sy = oy;

  // Sun ray: from Sx (shadow tip on horizon) to Tx,Ty (panel top) — exactly between the two points
  const RayStartX = Sx;
  const RayStartY = Sy;
  const RayEndX = Tx;
  const RayEndY = Ty;

  const RED  = '#d32f2f';
  const CYAN = '#00b0c8';
  const GRAY = '#444';
  const PANEL = '#888';

  const PMx = (Tx + Bx) / 2;
  const PMy = (Ty + By) / 2;
  const calloutX = Bx + 14;
  const calloutTextX = calloutX + 8;

  const arcR = 26;
  const arcEndX = Bx - arcR * Math.cos(toRad(angle));
  const arcEndY = By - arcR * Math.sin(toRad(angle));
  const arrowY = oy + 20;
  const mid = (a, b) => (a + b) / 2;

  return (
    <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: SVG_W, display: 'block' }}>
      <defs>
        <marker id="arr" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto">
          <path d="M0,0 L0,7 L7,3.5 z" fill={RED} />
        </marker>
        <marker id="arrL" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto-start-reverse">
          <path d="M0,0 L0,7 L7,3.5 z" fill={RED} />
        </marker>
      </defs>

      {/* Sun ray — from past Sx through T, crosses horizon */}
      <line x1={RayStartX} y1={RayStartY} x2={RayEndX} y2={RayEndY}
        stroke="#e6c800" strokeWidth="2" strokeDasharray="8,5" />

      {/* Ground */}
      <line x1={Sx - 8} y1={oy} x2={Bx + 8} y2={oy} stroke={RED} strokeWidth="1.5" />

      {/* Vertical h line */}
      <line x1={Tx} y1={Ty} x2={Tx} y2={oy} stroke={CYAN} strokeWidth="1.5" />

      {/* Panel */}
      <line x1={Bx} y1={By} x2={Tx} y2={Ty} stroke={PANEL} strokeWidth="8" strokeLinecap="round" />

      {/* Dashed base */}
      <line x1={Tx} y1={oy} x2={Bx} y2={oy} stroke={GRAY} strokeWidth="0.7" strokeDasharray="4,3" />

      {/* h: label above T with leader line to value */}
      <text x={Tx - 6} y={Ty - 12} fontSize="13" fill={GRAY} fontWeight="bold" textAnchor="end">h</text>
      <line x1={Tx - 12} y1={Ty - 7} x2={Tx - 12} y2={mid(Ty, oy) - 4}
        stroke={GRAY} strokeWidth="0.8" />
      <text x={Tx - 10} y={mid(Ty, oy) + 5} fontSize="13" fill={CYAN} fontWeight="bold" textAnchor="end">{h}</text>

      {/* Callout: висота панелі — raised higher */}
      <line x1={PMx} y1={PMy} x2={calloutX} y2={PMy - 20} stroke={GRAY} strokeWidth="0.8" />
      <text x={calloutTextX} y={PMy - 28} fontSize="11" fill={GRAY} textAnchor="start">висота панелі</text>
      <text x={calloutTextX} y={PMy - 13} fontSize="13" fill={GRAY} fontWeight="bold" textAnchor="start">{height}</text>

      {/* Angle arc — larger radius for visibility */}
      <path d={`M ${Bx - arcR},${By} A ${arcR},${arcR} 0 0,0 ${arcEndX},${arcEndY}`}
        fill="none" stroke={GRAY} strokeWidth="1" />
      {/* кут панелі callout: label above, value below */}
      <text x={Bx + 14} y={By - 44} fontSize="11" fill={GRAY} textAnchor="start">кут панелі</text>
      <text x={Bx + 14} y={By - 28} fontSize="13" fill={GRAY} fontWeight="bold" textAnchor="start">{angle}°</text>
      <line x1={Bx + 12} y1={By - 40} x2={Bx - arcR + 4} y2={By - 16} stroke={GRAY} strokeWidth="0.7" />

      {/* d2 */}
      <line x1={Sx} y1={oy + 10} x2={Sx} y2={oy + 30} stroke={RED} strokeWidth="1" />
      <line x1={Tx} y1={oy + 10} x2={Tx} y2={oy + 30} stroke={RED} strokeWidth="1" />
      <line x1={Sx + 1} y1={arrowY} x2={Tx - 1} y2={arrowY} stroke={RED} strokeWidth="1.5"
        markerStart="url(#arrL)" markerEnd="url(#arr)" />
      <text x={mid(Sx, Tx)} y={arrowY - 4} fontSize="13" fill={RED} fontWeight="bold" textAnchor="middle">{d2}</text>
      <text x={mid(Sx, Tx)} y={arrowY + 14} fontSize="11" fill={RED} textAnchor="middle">d2</text>

      {/* d1 */}
      <line x1={Bx} y1={oy + 10} x2={Bx} y2={oy + 30} stroke={RED} strokeWidth="1" />
      <line x1={Tx + 1} y1={arrowY} x2={Bx - 1} y2={arrowY} stroke={RED} strokeWidth="1.5"
        markerStart="url(#arrL)" markerEnd="url(#arr)" />
      <text x={mid(Tx, Bx)} y={arrowY - 4} fontSize="13" fill={RED} fontWeight="bold" textAnchor="middle">{d1}</text>
      <text x={mid(Tx, Bx)} y={arrowY + 14} fontSize="11" fill={RED} textAnchor="middle">d1</text>
    </svg>
  );
};

// ─────────────────────────────────────────────────────────────
//  Roof diagram (на криші)
//
//  KEY geometry (from reference image):
//  B  = bottom-RIGHT — panel base & roof meet, ON the horizon
//  T  = panel top-LEFT, above horizon by h, left by d1
//  S  = shadow tip, d2 left of T, on horizon
//  Roof: green, from B up-left at roofAngle
//  Panel: gray, from B up-left at panelAngle (steeper than roof)
//  Cyan: vertical from T down to the ROOF LINE (not horizon!)
//  Sun ray: dashed yellow from T going up-RIGHT (long)
//  Arcs at B: outer=кут криші (horizon→roof), inner=кут1 (roof→panel)
//  кут криші label: BELOW horizon (in the gap under the arc)
//  кут1 label: right-side callout above кут криші
// ─────────────────────────────────────────────────────────────
const RoofDiagram = ({ height, panelAngle, roofAngle, angle1, h, d1, d2 }) => {
  const SVG_W = 720;
  const SVG_H = 320;

  const PAD_L = 20;
  const PAD_R = 175;  // space for right callouts
  const PAD_T = 70;   // space above for sun ray
  const PAD_B = 80;   // space below for dimension arrows + кут криші label

  const drawW = SVG_W - PAD_L - PAD_R;
  const drawH = SVG_H - PAD_T - PAD_B;
  const scale = Math.min(drawW / ((d1 + d2) || 1), drawH / (h || 1));

  // Horizon y-coordinate
  const hy = PAD_T + drawH;

  // B: bottom-right anchor, on horizon
  const Bx = PAD_L + (d1 + d2) * scale;
  const By = hy;

  // T: panel top — d1 left of B, h above horizon
  const Tx = Bx - d1 * scale;
  const Ty = hy - h * scale;

  // S: shadow tip — d2 left of T, on horizon
  const Sx = Tx - d2 * scale;
  const Sy = hy;

  // Roof line: from B at roofAngle upward-left, extended to touch the sun ray line
  // Sun ray line: parametric Sx + t*(RayEnd-Sx). Find intersection with roof direction from B.
  // We extend the roof far enough to guarantee it intersects the ray.
  const roofLen = height * scale * 1.05;
  const RFx = Bx - roofLen * Math.cos(toRad(roofAngle));
  const RFy = By - roofLen * Math.sin(toRad(roofAngle));
  // Intersection of roof ray from B and sun ray from Sx:
  // B + t*(RF-B)/|RF-B| * s == Sx + u*(T-Sx)/|T-Sx| * r  → solve for s
  // Using line intersection formula:
  // Roof direction unit: (RFx-Bx, RFy-By) / roofLen
  const roofDx = (RFx - Bx) / roofLen;
  const roofDy = (RFy - By) / roofLen;
  // Ray direction: rdx/rLen, rdy/rLen (defined below, need to pre-calc here)
  const _rdx = Tx - Sx;
  const _rdy = Ty - Sy;
  const _rLen = Math.sqrt(_rdx * _rdx + _rdy * _rdy);
  const rayDirX = _rdx / _rLen;
  const rayDirY = _rdy / _rLen;
  // Solve: Bx + s*roofDx = Sx + u*rayDirX, By + s*roofDy = Sy + u*rayDirY
  // s = ((Sx-Bx)*rayDirY - (Sy-By)*rayDirX) / (roofDx*rayDirY - roofDy*rayDirX)
  const denom = roofDx * rayDirY - roofDy * rayDirX;
  let RoofExtX = RFx;
  let RoofExtY = RFy;
  if (Math.abs(denom) > 0.0001) {
    const s = ((Sx - Bx) * rayDirY - (Sy - By) * rayDirX) / denom;
    if (s > 0) {
      RoofExtX = Bx + s * roofDx;
      RoofExtY = By + s * roofDy;
    }
  }

  // Point where the vertical from T meets the ROOF LINE
  // Roof line parametric: P(t) = B + t*(RF-B)
  // We want P(t).x == Tx → t = (Tx - Bx) / (RFx - Bx)
  const tRoof = (Tx - Bx) / (RFx - Bx || 0.001);
  const RoofAtTx = By + tRoof * (RFy - By); // y of roof directly under T

  // Sun ray: from horizon (Sx,hy) through T and continuing up-right
  // Direction S→T extended until it goes well above the SVG top
  const rdx = _rdx;
  const rdy = _rdy;
  const rLen = _rLen;
  // Extend far enough upward so it visually exits the diagram
  const rayExtend = 250;
  const RayEndX = Tx + (rdx / rLen) * rayExtend;
  const RayEndY = Ty + (rdy / rLen) * rayExtend;
  // Ray starts at Sx (shadow tip on horizon) and goes through T and beyond
  const RayStartX = Sx;
  const RayStartY = hy;

  const RED  = '#d32f2f';
  const CYAN = '#00b0c8';
  const GRAY = '#444';
  const ROOF = '#6a8a3a';

  const arrowY = By + 26;
  const mid = (a, b) => (a + b) / 2;

  // Right-side callout x positions
  const calloutAnchorX = Bx + 14;
  const calloutTextX   = Bx + 22;

  // Arc radii
  const arcRoof = 110; // outer: кут криші
  const arcKut1 = 75;  // inner: кут1

  // кут криші arc (horizon left → roof direction)
  const roofArcEx = Bx - arcRoof * Math.cos(toRad(roofAngle));
  const roofArcEy = By - arcRoof * Math.sin(toRad(roofAngle));

  // кут1 arc (roof direction → panel direction)
  const kut1Sx = Bx - arcKut1 * Math.cos(toRad(roofAngle));
  const kut1Sy = By - arcKut1 * Math.sin(toRad(roofAngle));
  const kut1Ex = Bx - arcKut1 * Math.cos(toRad(panelAngle));
  const kut1Ey = By - arcKut1 * Math.sin(toRad(panelAngle));

  // кут1 value label: along bisector between roofAngle & panelAngle (used for arc line endpoint)
  const kut1Mid = (roofAngle + panelAngle) / 2;
  const kut1LR  = arcKut1 + 14;
  const kut1ValX = Bx - kut1LR * Math.cos(toRad(kut1Mid));
  const kut1ValY = By - kut1LR * Math.sin(toRad(kut1Mid));

  // кут криші label: place well BELOW horizon line, below the d1/d2 arrow row
  const roofMid = roofAngle / 2;
  const kutLabelX = Bx - arcRoof * Math.cos(toRad(roofMid / 2));
  const kutLabelY = By + 44; // below the red arrow line

  // висота панелі callout: from panel midpoint → right
  const PMx = mid(Tx, Bx);
  const PMy = mid(Ty, By);

  return (
    <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: SVG_W, display: 'block' }}>
      <defs>
        <marker id="arr2" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto">
          <path d="M0,0 L0,7 L7,3.5 z" fill={RED} />
        </marker>
        <marker id="arrL2" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto-start-reverse">
          <path d="M0,0 L0,7 L7,3.5 z" fill={RED} />
        </marker>
      </defs>

      {/* ── Horizon dashed line ── */}
      <line x1={Sx - 18} y1={hy} x2={Bx + 18} y2={hy}
        stroke={GRAY} strokeWidth="1.2" strokeDasharray="7,4" />

      {/* ── Roof (green, behind panel) — extended to touch sun ray ── */}
      <line x1={Bx} y1={By} x2={RoofExtX} y2={RoofExtY}
        stroke={ROOF} strokeWidth="9" strokeLinecap="round" />

      {/* ── Sun ray: from horizon (shadow tip S) through T and continuing up-right ── */}
      <line x1={RayStartX} y1={RayStartY} x2={RayEndX} y2={RayEndY}
        stroke="#e6c800" strokeWidth="2.5" strokeDasharray="10,6" />

      {/* ── Cyan vertical: T → point on ROOF (not horizon) ── */}
      <line x1={Tx} y1={Ty} x2={Tx} y2={RoofAtTx}
        stroke={CYAN} strokeWidth="2" />

      {/* ── Panel (gray, on top of roof) ── */}
      <line x1={Bx} y1={By} x2={Tx} y2={Ty}
        stroke="#888" strokeWidth="9" strokeLinecap="round" />

      {/* ── Red ground line S→B ── */}
      <line x1={Sx} y1={hy} x2={Bx} y2={hy} stroke={RED} strokeWidth="1.8" />

      {/* ── h: "h" label above T, leader line from "h" down to the cyan value ── */}
      <text x={Tx - 6} y={Ty - 18}
        fontSize="14" fill={GRAY} fontWeight="bold" textAnchor="end">h</text>
      {/* cyan value — at midpoint of cyan line, left */}
      <text x={Tx - 6} y={mid(Ty, RoofAtTx) + 5}
        fontSize="14" fill={CYAN} fontWeight="bold" textAnchor="end">{h}</text>
      {/* leader line from bottom of "h" label to top of value */}
      <line x1={Tx - 12} y1={Ty - 12} x2={Tx - 12} y2={mid(Ty, RoofAtTx) - 4}
        stroke={GRAY} strokeWidth="0.8" />

      {/* ── Callout: висота панелі ── */}
      <line x1={PMx} y1={PMy} x2={calloutAnchorX} y2={PMy - 20}
        stroke={GRAY} strokeWidth="0.9" />
      <text x={calloutTextX} y={PMy - 28}
        fontSize="12" fill={GRAY} textAnchor="start">висота панелі</text>
      <text x={calloutTextX} y={PMy - 11}
        fontSize="14" fill={GRAY} fontWeight="bold" textAnchor="start">{height}</text>

      {/* ── Arc: кут криші (horizon → roof) ── */}
      <path d={`M ${Bx - arcRoof},${By} A ${arcRoof},${arcRoof} 0 0,0 ${roofArcEx},${roofArcEy}`}
        fill="none" stroke={GRAY} strokeWidth="1.3" />
      {/* leader line from arc midpoint to label below */}
      <line x1={kutLabelX} y1={By + 4} x2={kutLabelX} y2={kutLabelY - 2}
        stroke={GRAY} strokeWidth="0.8" />
      {/* кут криші label: BELOW horizon */}
      <text x={kutLabelX} y={kutLabelY + 2}
        fontSize="11" fill={GRAY} textAnchor="middle">кут криші</text>
      <text x={kutLabelX} y={kutLabelY + 17}
        fontSize="13" fill={GRAY} fontWeight="bold" textAnchor="middle">{roofAngle}°</text>

      {/* ── Arc: кут1 (roof → panel) ── */}
      <path d={`M ${kut1Sx},${kut1Sy} A ${arcKut1},${arcKut1} 0 0,0 ${kut1Ex},${kut1Ey}`}
        fill="none" stroke={GRAY} strokeWidth="1.3" />
      {/* кут1 callout: label "кут1" then value below it — positioned below "висота панелі" callout */}
      <line x1={calloutAnchorX} y1={PMy + 28} x2={kut1ValX + 8} y2={kut1ValY - 2}
        stroke={GRAY} strokeWidth="0.8" />
      <text x={calloutTextX} y={PMy + 28}
        fontSize="12" fill={GRAY} textAnchor="start">кут1</text>
      <text x={calloutTextX} y={PMy + 44}
        fontSize="14" fill={GRAY} fontWeight="bold" textAnchor="start">{angle1}°</text>

      {/* ── d2: S → T ── */}
      <line x1={Sx} y1={By + 12} x2={Sx} y2={By + 36} stroke={RED} strokeWidth="1" />
      <line x1={Tx} y1={By + 12} x2={Tx} y2={By + 36} stroke={RED} strokeWidth="1" />
      <line x1={Sx + 1} y1={arrowY} x2={Tx - 1} y2={arrowY}
        stroke={RED} strokeWidth="1.8"
        markerStart="url(#arrL2)" markerEnd="url(#arr2)" />
      <text x={mid(Sx, Tx)} y={arrowY - 7}
        fontSize="14" fill={RED} fontWeight="bold" textAnchor="middle">{d2}</text>
      <text x={mid(Sx, Tx)} y={arrowY + 17}
        fontSize="12" fill={RED} textAnchor="middle">d2</text>

      {/* ── d1: T → B ── */}
      <line x1={Bx} y1={By + 12} x2={Bx} y2={By + 36} stroke={RED} strokeWidth="1" />
      <line x1={Tx + 1} y1={arrowY} x2={Bx - 1} y2={arrowY}
        stroke={RED} strokeWidth="1.8"
        markerStart="url(#arrL2)" markerEnd="url(#arr2)" />
      <text x={mid(Tx, Bx)} y={arrowY - 7}
        fontSize="14" fill={RED} fontWeight="bold" textAnchor="middle">{d1}</text>
      <text x={mid(Tx, Bx)} y={arrowY + 17}
        fontSize="12" fill={RED} textAnchor="middle">d1</text>
    </svg>
  );
};

// ─────────────────────────────────────────────────────────────
//  Main export
// ─────────────────────────────────────────────────────────────
export const ResultComponent = ({ panelHeight, panelAngle, onRoof, roofAngle, onReset }) => {
  const height = parseFloat(panelHeight);
  const pAngle = parseFloat(panelAngle);
  const rAngle = onRoof ? parseFloat(roofAngle) : 0;

  let h, d1, d2, angle1, a;

  if (onRoof) {
    angle1 = parseFloat((pAngle - rAngle).toFixed(2));
    h      = parseFloat((height * Math.sin(toRad(angle1))).toFixed(2));
    d1     = parseFloat((height * Math.cos(toRad(angle1))).toFixed(2));
    a      = parseFloat((28 + rAngle).toFixed(2));
    d2     = parseFloat((h / Math.tan(toRad(a))).toFixed(2));
  } else {
    angle1 = pAngle;
    h      = parseFloat((height * Math.sin(toRad(pAngle))).toFixed(2));
    d1     = parseFloat((height * Math.cos(toRad(pAngle))).toFixed(2));
    a      = 28;
    d2     = parseFloat((h / Math.tan(toRad(28))).toFixed(2));
  }

  return (
    <div className="result-wrapper">
      {/* Diagram */}
      <div className="diagram-box">
        {onRoof ? (
          <RoofDiagram
            height={height}
            panelAngle={pAngle}
            roofAngle={rAngle}
            angle1={angle1}
            h={h} d1={d1} d2={d2} a={a}
          />
        ) : (
          <GroundDiagram
            height={height}
            angle={pAngle}
            h={h} d1={d1} d2={d2}
          />
        )}
      </div>

      {/* Values summary */}
      <div className="result-values">
        <div className="result-row">
          <span className="result-key">Висота панелі:</span>
          <span className="result-val">{height} м</span>
        </div>
        <div className="result-row">
          <span className="result-key">Кут нахилу панелі:</span>
          <span className="result-val">{pAngle}°</span>
        </div>
        {onRoof && (
          <div className="result-row">
            <span className="result-key">Кут нахилу криші:</span>
            <span className="result-val">{rAngle}°</span>
          </div>
        )}

        <div className="result-divider" />

        {onRoof && <div className="result-row">
          <span className="result-key">Кут1 (панель − криша):</span>
          <span className="result-val">{angle1}°</span>
        </div>}
        <div className="result-row">
          <span className="result-key">h:</span>
          <span className="result-val cyan">{h} м</span>
        </div>
        <div className="result-row">
          <span className="result-key">d1:</span>
          <span className="result-val red">{d1} м</span>
        </div>
        <div className="result-row">
          <span className="result-key">d2:</span>
          <span className="result-val red">{d2} м</span>
        </div>
      </div>

      {/* Reset */}
      <button className="btn-reset" onClick={onReset}>RESET</button>
    </div>
  );
};
