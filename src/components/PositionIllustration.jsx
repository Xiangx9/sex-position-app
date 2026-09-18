/**
 * 手绘剪影插图：实心人体轮廓 + 男/女标注。
 * 图形数据来自 src/data/poseShapes.js（每个姿势独立写死的关节坐标）。
 * step: undefined=总览, 0~3=分步靠近动画
 */
import {
  getPose,
  buildParts,
  closeOffset,
  PALETTE,
  STEP_COEF,
  FLOOR,
  MATTRESS_TOP,
} from "../data/poseShapes";

const INK = "#94A3B8";

/* ---------- 基本形状：火柴人 = 线段 + 圆头 ---------- */
function Shape({ s, color }) {
  const o = s.o ?? 1;
  if (s.t === "c") return <circle cx={s.cx} cy={s.cy} r={s.r} fill={color} opacity={o} />;
  return (
    <line
      x1={s.x1}
      y1={s.y1}
      x2={s.x2}
      y2={s.y2}
      stroke={color}
      strokeWidth={s.w}
      strokeLinecap="round"
      opacity={o}
    />
  );
}

/* ---------- 场景道具 ---------- */
function Scene({ kind }) {
  if (kind === "bed") {
    return (
      <g>
        <rect x="6" y={MATTRESS_TOP} width="248" height="20" rx="8" fill={INK} opacity="0.18" />
        <line x1="6" y1={MATTRESS_TOP} x2="254" y2={MATTRESS_TOP} stroke={INK} strokeWidth="1.6" opacity="0.5" />
        <line x1="10" y1={FLOOR} x2="250" y2={FLOOR} stroke={INK} strokeWidth="1.4" opacity="0.35" />
      </g>
    );
  }
  if (kind === "chair") {
    // 座面 y=112，靠背在左侧 x=60
    return (
      <g stroke={INK} strokeWidth="2.4" fill="none" opacity="0.5">
        <path d="M60 58 V112 H152" />
        <path d="M68 112 V158" />
        <path d="M144 112 V158" />
      </g>
    );
  }
  if (kind === "edge") {
    // 床沿：床体到 x=134 为止，右侧悬空
    return (
      <g>
        <rect x="8" y="112" width="126" height="24" rx="6" fill={INK} opacity="0.18" />
        <line x1="8" y1="112" x2="134" y2="112" stroke={INK} strokeWidth="1.6" opacity="0.5" />
        <line x1="10" y1="158" x2="250" y2="158" stroke={INK} strokeWidth="1.4" opacity="0.35" />
      </g>
    );
  }
  if (kind === "lowtable") {
    // 矮桌：桌面 y=118，比普通桌子低
    return (
      <g>
        <rect x="16" y="118" width="102" height="10" rx="3" fill={INK} opacity="0.18" />
        <line x1="16" y1="118" x2="118" y2="118" stroke={INK} strokeWidth="1.6" opacity="0.5" />
        <line x1="10" y1="158" x2="250" y2="158" stroke={INK} strokeWidth="1.4" opacity="0.35" />
      </g>
    );
  }
  if (kind === "wall") {
    return <line x1="28" y1="16" x2="28" y2={FLOOR} stroke={INK} strokeWidth="2" strokeDasharray="8 5" opacity="0.45" />;
  }
  if (kind === "table") {
    return (
      <g stroke={INK} strokeWidth="2.4" fill="none" opacity="0.5">
        <path d="M12 100 H152" />
        <path d="M22 100 V158" />
        <path d="M142 100 V158" />
      </g>
    );
  }
  return <line x1="10" y1={FLOOR} x2="250" y2={FLOOR} stroke={INK} strokeWidth="1.4" opacity="0.35" />;
}

/* ---------- 一个人 ---------- */
function Person({ p, dx, dy }) {
  const parts = buildParts(p);
  const color = PALETTE[p.sex] || PALETTE.f;
  return (
    <g
      transform={`translate(${dx} ${dy})`}
      style={{ transition: "transform 420ms cubic-bezier(.4,0,.2,1)" }}
    >
      {parts.far.map((s, i) => (
        <Shape key={`f${i}`} s={s} color={color} />
      ))}
      {parts.body.map((s, i) => (
        <Shape key={`b${i}`} s={s} color={color} />
      ))}
      {parts.near.map((s, i) => (
        <Shape key={`n${i}`} s={s} color={color} />
      ))}
      {parts.head.map((s, i) => (
        <Shape key={`h${i}`} s={s} color={color} />
      ))}
    </g>
  );
}

/* ---------- 男/女标签 ---------- */
function Tag({ x, y, sex, dx, dy }) {
  const color = PALETTE[sex] || PALETTE.f;
  return (
    <g
      transform={`translate(${dx} ${dy})`}
      style={{ transition: "transform 420ms cubic-bezier(.4,0,.2,1)" }}
    >
      <rect x={x - 15} y={y - 9} width="30" height="18" rx="9" fill="#fff" stroke={color} strokeWidth="1.4" />
      <text x={x} y={y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill={color}>
        {sex === "f" ? "女" : "男"}
      </text>
    </g>
  );
}

/* ---------- 方向箭头 ---------- */
function Arrow({ a, show }) {
  if (!a || !show) return null;
  const [x1, y1] = a.from;
  const [x2, y2] = a.to;
  const ang = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
  return (
    <g opacity="0.75">
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#F43F5E" strokeWidth="2" strokeDasharray="5 4" strokeLinecap="round" />
      <path
        d={`M ${x2} ${y2} l -8 -4 l 0 8 z`}
        fill="#F43F5E"
        transform={`rotate(${ang} ${x2} ${y2}) translate(2 0)`}
      />
    </g>
  );
}

/** 只输出 svg 本体，方便离线渲染预览 */
export function PoseSvg({ id, step }) {
  const pose = getPose(id);
  const s = step === undefined || step === null ? 2 : step;
  const k = STEP_COEF[s] ?? 0;
  const a = pose.A;
  const b = pose.B;
  const [cx, cy] = closeOffset(pose);
  const bx = (b?.approach?.[0] ?? 0) * k + cx;
  const by = (b?.approach?.[1] ?? 0) * k + cy;

  return (
    <svg
      viewBox="0 0 260 190"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <Scene kind={pose.scene} />
      {a && <Person p={a} dx={0} dy={0} />}
      {b && <Person p={b} dx={bx} dy={by} />}
      {a?.tag && <Tag x={a.tag[0]} y={a.tag[1]} sex={a.sex} dx={0} dy={0} />}
      {b?.tag && <Tag x={b.tag[0]} y={b.tag[1]} sex={b.sex} dx={bx} dy={by} />}
      <Arrow a={pose.arrow} show={s === 0 || s === 1} />
    </svg>
  );
}

export default function PositionIllustration({ id, step, className = "" }) {
  return (
    <div className={`w-full h-full flex items-center justify-center ${className}`} aria-hidden>
      <PoseSvg id={id} step={step} />
    </div>
  );
}
