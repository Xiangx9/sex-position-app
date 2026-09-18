/**
 * 剪影式教学插图：填充人体轮廓 + 甲/乙标注，比纯棍图更易辨认。
 * step: undefined=总览, 0~3=分步
 */
export default function PositionIllustration({ id, step, className = "" }) {
  const family = getFamily(id);
  const s = step === undefined || step === null ? "overview" : step;

  return (
    <div
      className={`w-full h-full flex items-center justify-center text-rose-400 ${className}`}
      aria-hidden
    >
      <svg viewBox="0 0 260 190" className="w-full h-full max-h-full p-2">
        {/* 地面 */}
        <line x1="16" y1="172" x2="244" y2="172" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
        {render(family, id, s)}
      </svg>
    </div>
  );
}

function getFamily(id) {
  const map = {
    missionary: "lie_top",
    "raised-legs": "lie_top",
    prone: "lie_top",
    cowgirl: "straddle",
    "reverse-cowgirl": "straddle",
    doggy: "kneel_behind",
    "knee-chest": "kneel_behind",
    spooning: "side",
    "from-behind-side": "side",
    scissor: "side",
    lotus: "sit_face",
    "sitting-face": "sit_face",
    lap: "sit_face",
    chair: "chair",
    standing: "stand",
    "face-to-face-standing": "stand",
    edge: "edge",
    table: "edge",
    bridge: "bridge",
  };
  return map[id] || "lie_top";
}

/** 实心椭圆头 */
function Head({ cx, cy, r = 11, opacity = 0.9 }) {
  return <circle cx={cx} cy={cy} r={r} fill="currentColor" fillOpacity={opacity} stroke="none" />;
}

/** 甲/乙小标签 */
function Tag({ x, y, text }) {
  return (
    <g>
      <circle cx={x} cy={y} r="9" fill="white" stroke="currentColor" strokeWidth="1.2" />
      <text
        x={x}
        y={y + 3.5}
        textAnchor="middle"
        fontSize="10"
        fontWeight="600"
        fill="currentColor"
        stroke="none"
      >
        {text}
      </text>
    </g>
  );
}

function render(family, id, step) {
  switch (family) {
    case "lie_top":
      return LieTop(id, step);
    case "straddle":
      return Straddle(id, step);
    case "kneel_behind":
      return KneelBehind(id, step);
    case "side":
      return Side(id, step);
    case "sit_face":
      return SitFace(id, step);
    case "chair":
      return Chair(id, step);
    case "stand":
      return Stand(id, step);
    case "edge":
      return Edge(id, step);
    case "bridge":
      return Bridge(id, step);
    default:
      return LieTop(id, step);
  }
}

/* ========== 仰卧类 ========== */
function LieTop(id, step) {
  const s = step === "overview" ? 2 : step;
  const prone = id === "prone";
  const raised = id === "raised-legs" && s >= 2;

  return (
    <g>
      {/* 甲：躺着的人 — 粗躯干 */}
      <Head cx={52} cy={prone ? 100 : 88} r={12} opacity={0.85} />
      <ellipse
        cx={110}
        cy={prone ? 108 : 98}
        rx={58}
        ry={18}
        fill="currentColor"
        fillOpacity="0.35"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      {/* 腿 */}
      {raised ? (
        <>
          <path d="M130 90 L150 45 L155 28" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
          <path d="M145 95 L175 50 L182 32" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
        </>
      ) : (
        <>
          <path d="M155 100 L185 125 L200 150" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
          <path d="M150 110 L175 140 L190 162" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
        </>
      )}
      <Tag x={28} y={88} text="甲" />

      {/* 乙：步骤推进 */}
      {s >= 1 && (
        <g>
          <Head cx={s === 1 ? 175 : 120} cy={s === 1 ? 48 : 42} r={12} opacity={0.95} />
          {s === 1 ? (
            <>
              <ellipse cx={175} cy={85} rx={16} ry={32} fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="1.8" />
              <path d="M175 115 L165 150" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
              <path d="M180 115 L195 150" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
            </>
          ) : (
            <>
              <ellipse cx={120} cy={72} rx={20} ry={28} fill="currentColor" fillOpacity="0.45" stroke="currentColor" strokeWidth="1.8" />
              <path d="M105 95 L95 140" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
              <path d="M135 95 L150 140" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
              <path d="M100 60 L85 80" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
              <path d="M140 60 L160 75" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
            </>
          )}
          <Tag x={s === 1 ? 200 : 148} y={s === 1 ? 40 : 28} text="乙" />
        </g>
      )}

      {s === 0 && (
        <text x={180} y={60} fontSize="11" fill="currentColor" fillOpacity="0.45" stroke="none">
          乙靠近 →
        </text>
      )}
    </g>
  );
}

/* ========== 跨坐 ========== */
function Straddle(id, step) {
  const s = step === "overview" ? 2 : step;
  const rev = id === "reverse-cowgirl";

  return (
    <g>
      {/* 甲躺 */}
      <Head cx={48} cy={105} r={12} opacity={0.85} />
      <ellipse cx={115} cy={115} rx={62} ry={16} fill="currentColor" fillOpacity="0.35" stroke="currentColor" strokeWidth="1.8" />
      <path d="M160 115 L190 145" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <path d="M155 122 L180 155" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <Tag x={26} y={105} text="甲" />

      {s >= 1 && (
        <g>
          <Head cx={rev && s >= 2 ? 145 : 120} cy={32} r={12} />
          {s === 1 ? (
            <>
              {/* 站着准备跨坐 */}
              <ellipse cx={120} cy={70} rx={14} ry={28} fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="1.8" />
              <path d="M120 98 L110 140" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
              <path d="M125 98 L140 140" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
            </>
          ) : (
            <>
              {/* 已跨坐 */}
              <ellipse cx={120} cy={68} rx={18} ry={26} fill="currentColor" fillOpacity="0.5" stroke="currentColor" strokeWidth="1.8" />
              <path d="M108 90 L92 130 L88 155" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
              <path d="M132 90 L150 130 L155 155" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
              {/* 小腿折回示意 */}
              <path d="M88 155 L108 158" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" opacity="0.7" />
              <path d="M155 155 L135 158" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" opacity="0.7" />
            </>
          )}
          <Tag x={rev && s >= 2 ? 168 : 145} y={24} text="乙" />
          {rev && s >= 2 && (
            <text x={168} y={48} fontSize="10" fill="currentColor" fillOpacity="0.5" stroke="none">
              背对
            </text>
          )}
        </g>
      )}
      {s === 0 && (
        <text x={150} y={50} fontSize="11" fill="currentColor" fillOpacity="0.45" stroke="none">
          乙跨坐到甲上方
        </text>
      )}
    </g>
  );
}

/* ========== 跪趴后入 ========== */
function KneelBehind(id, step) {
  const s = step === "overview" ? 2 : step;
  const low = id === "knee-chest" && s >= 2;

  return (
    <g>
      {/* 甲跪趴：头左，臀右 */}
      <Head cx={low ? 40 : 46} cy={low ? 115 : 78} r={12} opacity={0.85} />
      {/* 躯干斜线用粗椭圆 */}
      <ellipse
        cx={100}
        cy={low ? 95 : 78}
        rx={50}
        ry={16}
        transform={low ? "rotate(-18 100 95)" : "rotate(-12 100 78)"}
        fill="currentColor"
        fillOpacity="0.35"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      {/* 手臂撑地 */}
      <path d="M70 85 L50 125 L42 155" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      {/* 膝 */}
      <path d="M125 80 L118 125 L112 158" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
      <path d="M145 85 L150 128 L155 158" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
      <Tag x={24} y={low ? 115 : 70} text="甲" />

      {s >= 1 && (
        <g>
          <Head cx={s === 1 ? 220 : 200} cy={s === 1 ? 42 : 50} r={12} />
          <ellipse
            cx={s === 1 ? 210 : 185}
            cy={s === 1 ? 85 : 90}
            rx={14}
            ry={30}
            fill="currentColor"
            fillOpacity="0.45"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path d="M200 115 L190 155" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          <path d="M215 115 L225 155" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          {s >= 2 && (
            <path d="M175 90 L155 95" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" opacity="0.6" />
          )}
          <Tag x={s === 1 ? 238 : 225} y={s === 1 ? 35 : 42} text="乙" />
        </g>
      )}
      {s === 0 && (
        <text x={175} y={55} fontSize="11" fill="currentColor" fillOpacity="0.45" stroke="none">
          乙在甲后方
        </text>
      )}
    </g>
  );
}

/* ========== 侧卧 ========== */
function Side(id, step) {
  const s = step === "overview" ? 2 : step;
  const scissor = id === "scissor";

  return (
    <g>
      {/* 甲侧躺 */}
      <Head cx={55} cy={70} r={12} opacity={0.85} />
      <ellipse cx={115} cy={85} rx={55} ry={15} fill="currentColor" fillOpacity="0.35" stroke="currentColor" strokeWidth="1.8" />
      <path d="M155 90 L185 120 L200 150" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      {scissor && s >= 2 ? (
        <path d="M140 85 L175 130 L160 155" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      ) : (
        <path d="M150 95 L175 130 L190 155" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      )}
      <Tag x={30} y={65} text="甲" />

      {s >= 1 && (
        <g>
          <Head cx={48} cy={48} r={11} />
          <ellipse cx={110} cy={60} rx={50} ry={13} fill="currentColor" fillOpacity="0.5" stroke="currentColor" strokeWidth="1.8" />
          <path d="M145 65 L170 100 L185 135" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          {scissor && s >= 2 && (
            <path d="M130 60 L100 120 L85 150" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          )}
          <Tag x={28} y={40} text="乙" />
          {s >= 2 && (
            <text x={195} y={50} fontSize="10" fill="currentColor" fillOpacity="0.5" stroke="none">
              {scissor ? "腿交叉" : "贴合"}
            </text>
          )}
        </g>
      )}
    </g>
  );
}

/* ========== 面对面坐 ========== */
function SitFace(id, step) {
  const s = step === "overview" ? 2 : step;

  return (
    <g>
      {/* 甲坐 */}
      <Head cx={80} cy={40} r={12} opacity={0.85} />
      <ellipse cx={80} cy={85} rx={16} ry={32} fill="currentColor" fillOpacity="0.35" stroke="currentColor" strokeWidth="1.8" />
      <path d="M70 115 L50 155" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <path d="M90 115 L115 150" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <Tag x={55} y={28} text="甲" />

      {s >= 1 && (
        <g>
          <Head cx={s === 1 ? 195 : 160} cy={40} r={12} />
          <ellipse
            cx={s === 1 ? 195 : 160}
            cy={85}
            rx={16}
            ry={32}
            fill="currentColor"
            fillOpacity="0.5"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path d="M150 115 L135 155" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          <path d="M170 115 L190 150" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          <Tag x={s === 1 ? 218 : 185} y={28} text="乙" />
          {s >= 2 && (
            <>
              {/* 拥抱虚线 */}
              <path
                d="M100 70 C120 55, 140 55, 150 70"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="5 4"
                strokeOpacity="0.5"
              />
              <text x={110} y={48} fontSize="10" fill="currentColor" fillOpacity="0.45" stroke="none">
                面对面拥抱
              </text>
            </>
          )}
        </g>
      )}
    </g>
  );
}

/* ========== 椅子 ========== */
function Chair(id, step) {
  const s = step === "overview" ? 2 : step;

  return (
    <g>
      {/* 椅子 */}
      <path d="M60 130 V80 H150 V130" fill="none" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.55" />
      <path d="M60 80 V40" fill="none" stroke="currentColor" strokeWidth="2.2" strokeOpacity="0.55" />
      <path d="M68 130 V165" fill="none" stroke="currentColor" strokeWidth="2" strokeOpacity="0.45" />
      <path d="M142 130 V165" fill="none" stroke="currentColor" strokeWidth="2" strokeOpacity="0.45" />

      {/* 甲坐着 */}
      <Head cx={105} cy={38} r={12} opacity={0.85} />
      <ellipse cx={105} cy={75} rx={18} ry={26} fill="currentColor" fillOpacity="0.35" stroke="currentColor" strokeWidth="1.8" />
      <path d="M95 100 L85 130" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <path d="M115 100 L125 130" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <Tag x={78} y={28} text="甲" />

      {s >= 1 && (
        <g>
          <Head cx={s === 1 ? 185 : 145} cy={28} r={12} />
          {s === 1 ? (
            <>
              <ellipse cx={185} cy={70} rx={14} ry={28} fill="currentColor" fillOpacity="0.45" stroke="currentColor" strokeWidth="1.8" />
              <path d="M185 98 L175 145" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
              <path d="M190 98 L205 145" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
            </>
          ) : (
            <>
              <ellipse cx={140} cy={65} rx={16} ry={24} fill="currentColor" fillOpacity="0.5" stroke="currentColor" strokeWidth="1.8" />
              <path d="M130 88 L115 130" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
              <path d="M150 88 L165 135" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
            </>
          )}
          <Tag x={s === 1 ? 208 : 168} y={20} text="乙" />
        </g>
      )}
    </g>
  );
}

/* ========== 站立 ========== */
function Stand(id, step) {
  const s = step === "overview" ? 2 : step;

  return (
    <g>
      {/* 墙 */}
      <line x1="32" y1="18" x2="32" y2="170" stroke="currentColor" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="8 5" />

      <Head cx={80} cy={32} r={12} opacity={0.85} />
      <ellipse cx={80} cy={80} rx={15} ry={36} fill="currentColor" fillOpacity="0.35" stroke="currentColor" strokeWidth="1.8" />
      <path d="M80 115 L65 165" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
      <path d="M85 115 L100 165" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
      <Tag x={55} y={24} text="甲" />

      {s >= 1 && (
        <g>
          <Head cx={s === 1 ? 185 : 140} cy={30} r={12} />
          <ellipse
            cx={s === 1 ? 185 : 140}
            cy={78}
            rx={15}
            ry={36}
            fill="currentColor"
            fillOpacity="0.5"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path d="M135 115 L120 165" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
          <path d="M148 115 L165 165" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
          <Tag x={s === 1 ? 210 : 165} y={22} text="乙" />
          {s >= 2 && (
            <text x={100} y={55} fontSize="10" fill="currentColor" fillOpacity="0.45" stroke="none">
              面对面靠墙
            </text>
          )}
        </g>
      )}
    </g>
  );
}

/* ========== 床沿 ========== */
function Edge(id, step) {
  const s = step === "overview" ? 2 : step;

  return (
    <g>
      {/* 床/桌面 */}
      <path d="M18 108 H155" stroke="currentColor" strokeWidth="3" strokeOpacity="0.5" />
      <path d="M18 108 V170" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" />
      <text x={50} y={100} fontSize="10" fill="currentColor" fillOpacity="0.35" stroke="none">
        {id === "table" ? "桌沿" : "床沿"}
      </text>

      {/* 甲在床上 */}
      <Head cx={70} cy={58} r={12} opacity={0.85} />
      <ellipse cx={100} cy={85} rx={40} ry={16} transform="rotate(15 100 85)" fill="currentColor" fillOpacity="0.35" stroke="currentColor" strokeWidth="1.8" />
      <path d="M130 95 L150 108" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <Tag x={48} y={48} text="甲" />

      {s >= 1 && (
        <g>
          <Head cx={s === 1 ? 210 : 190} cy={42} r={12} />
          <ellipse cx={s === 1 ? 205 : 185} cy={90} rx={14} ry={34} fill="currentColor" fillOpacity="0.5" stroke="currentColor" strokeWidth="1.8" />
          <path d="M180 120 L170 165" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          <path d="M195 120 L205 165" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          <Tag x={s === 1 ? 230 : 212} y={34} text="乙" />
          {s >= 2 && (
            <text x={155} y={55} fontSize="10" fill="currentColor" fillOpacity="0.45" stroke="none">
              站立对齐
            </text>
          )}
        </g>
      )}
    </g>
  );
}

/* ========== 桥式 ========== */
function Bridge(id, step) {
  const s = step === "overview" ? 2 : step;

  return (
    <g>
      {s === 0 ? (
        <g>
          <Head cx={50} cy={110} r={12} opacity={0.85} />
          <ellipse cx={120} cy={120} rx={60} ry={14} fill="currentColor" fillOpacity="0.35" stroke="currentColor" strokeWidth="1.8" />
          <path d="M165 120 L195 150" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          <Tag x={28} y={110} text="甲" />
          <text x={150} y={70} fontSize="11" fill="currentColor" fillOpacity="0.45" stroke="none">
            甲先平躺
          </text>
        </g>
      ) : (
        <g>
          {/* 拱起的身体 */}
          <Head cx={48} cy={105} r={12} opacity={0.85} />
          <path
            d="M60 105 C90 55, 140 50, 180 90"
            fill="none"
            stroke="currentColor"
            strokeWidth="14"
            strokeLinecap="round"
            opacity="0.35"
          />
          <path
            d="M60 105 C90 55, 140 50, 180 90"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path d="M100 70 L90 140 L85 165" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          <path d="M160 70 L175 140 L182 165" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          <Tag x={28} y={105} text="甲" />
          {s >= 2 && (
            <g>
              <Head cx={125} cy={28} r={11} />
              <ellipse cx={125} cy={55} rx={14} ry={18} fill="currentColor" fillOpacity="0.5" stroke="currentColor" strokeWidth="1.8" />
              <Tag x={150} y={22} text="乙" />
            </g>
          )}
          {s === 1 && (
            <text x={100} y={35} fontSize="11" fill="currentColor" fillOpacity="0.45" stroke="none">
              甲抬臀成桥
            </text>
          )}
        </g>
      )}
    </g>
  );
}
