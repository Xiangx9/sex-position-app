/**
 * 线稿插图（含分步）
 * step: undefined = 总览；0~3 = 分步示意
 * family 归类复用同一套分解动作，再按 id 做小差异
 */
export default function PositionIllustration({ id, step, className = "" }) {
  const family = getFamily(id);
  const sceneStep = step === undefined || step === null ? "overview" : step;

  return (
    <div
      className={`w-full h-full flex items-center justify-center text-rose-300 ${className}`}
      aria-hidden
    >
      <svg
        viewBox="0 0 240 180"
        className="w-full h-full max-h-full p-2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {renderScene(family, id, sceneStep)}
      </svg>
    </div>
  );
}

function H({ cx, cy, r = 9 }) {
  return <circle cx={cx} cy={cy} r={r} />;
}

function Ground() {
  return <path d="M15 155 H225" strokeOpacity="0.25" strokeWidth="1.5" />;
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

function renderScene(family, id, step) {
  switch (family) {
    case "lie_top":
      return sceneLieTop(id, step);
    case "straddle":
      return sceneStraddle(id, step);
    case "kneel_behind":
      return sceneKneelBehind(id, step);
    case "side":
      return sceneSide(id, step);
    case "sit_face":
      return sceneSitFace(id, step);
    case "chair":
      return sceneChair(id, step);
    case "stand":
      return sceneStand(id, step);
    case "edge":
      return sceneEdge(id, step);
    case "bridge":
      return sceneBridge(id, step);
    default:
      return sceneLieTop(id, step);
  }
}

/* —— 仰卧类：传教士 / 抬腿 / 俯卧 —— */
function sceneLieTop(id, step) {
  const s = step === "overview" ? 2 : step;
  return (
    <g>
      <Ground />
      {/* 下方始终躺 */}
      <H cx={48} cy={id === "prone" ? 95 : 85} />
      <path
        d={
          id === "prone"
            ? "M57 95 H170"
            : "M57 86 C90 82, 125 84, 155 92"
        }
        strokeWidth="2.2"
      />
      {id === "raised-legs" && s >= 2 ? (
        <>
          <path d="M100 85 L118 40 L125 22" />
          <path d="M125 88 L150 38 L160 20" />
        </>
      ) : (
        <>
          <path d="M90 88 L80 125 L70 150" />
          <path d="M130 88 L145 125 L160 148" />
        </>
      )}
      {/* 步骤演进：无人 → 靠近 → 对齐 → 完成 */}
      {s >= 1 && (
        <>
          <H cx={s === 1 ? 160 : 120} cy={s === 1 ? 50 : 40} />
          <path
            d={
              s === 1
                ? "M160 59 L150 90"
                : "M120 49 C120 60, 118 75, 115 95"
            }
            strokeWidth="2.2"
          />
          {s >= 2 && (
            <>
              <path d="M120 58 L95 78" />
              <path d="M120 58 L148 72" />
              <path d="M115 95 L98 135" />
              <path d="M115 95 L140 135" />
            </>
          )}
          {s === 1 && (
            <>
              <path d="M155 70 L145 110" />
              <path d="M165 70 L175 110" />
            </>
          )}
        </>
      )}
      {s === 0 && (
        <path d="M160 40 L180 40" strokeOpacity="0.3" strokeDasharray="4 3" />
      )}
    </g>
  );
}

/* —— 跨坐类 —— */
function sceneStraddle(id, step) {
  const s = step === "overview" ? 2 : step;
  const reverse = id === "reverse-cowgirl";
  return (
    <g>
      <Ground />
      <H cx={42} cy={100} />
      <path d="M51 100 C90 94, 140 94, 175 100" strokeWidth="2.2" />
      <path d="M90 98 L82 140" />
      <path d="M145 98 L155 140" />
      {s >= 1 && (
        <>
          <H cx={reverse && s >= 2 ? 150 : 120} cy={s === 1 ? 24 : 28} />
          {s === 1 ? (
            <>
              <path d="M120 33 L120 55" strokeWidth="2.2" />
              <path d="M120 45 L100 70" />
              <path d="M120 45 L140 70" />
              <path d="M120 55 L110 90" strokeOpacity="0.5" strokeDasharray="4 3" />
            </>
          ) : (
            <>
              <path
                d={
                  reverse
                    ? "M145 36 C135 50, 125 68, 120 82"
                    : "M120 37 L120 78"
                }
                strokeWidth="2.2"
              />
              <path d="M120 52 L92 78" />
              <path d="M120 52 L148 78" />
              <path d="M120 78 L95 115 L88 145" />
              <path d="M120 78 L145 115 L155 145" />
              {s >= 3 && (
                <>
                  <path d="M120 45 L100 40" strokeOpacity="0.5" />
                  <path d="M92 78 L92 78" />
                </>
              )}
            </>
          )}
        </>
      )}
    </g>
  );
}

/* —— 跪趴后入类 —— */
function sceneKneelBehind(id, step) {
  const s = step === "overview" ? 2 : step;
  const low = id === "knee-chest" && s >= 2;
  return (
    <g>
      <Ground />
      {/* 前方 */}
      {s >= 0 && (
        <>
          <H cx={low ? 36 : 42} cy={low ? 105 : 72} />
          <path
            d={
              low
                ? "M45 100 C75 68, 110 50, 145 58 C160 64, 168 75, 172 85"
                : s === 0
                  ? "M50 74 C80 70, 120 70, 150 78"
                  : "M50 74 C75 58, 110 52, 145 60"
            }
            strokeWidth="2.2"
          />
          <path d="M60 72 L45 115 L38 145" />
          <path d="M130 58 L122 115 L115 148" />
          <path d="M148 65 L155 118 L160 148" />
        </>
      )}
      {s >= 1 && (
        <>
          <H cx={s === 1 ? 210 : 198} cy={s === 1 ? 40 : 48} />
          <path
            d={
              s === 1
                ? "M200 48 L190 90"
                : "M190 55 C175 68, 160 80, 150 90"
            }
            strokeWidth="2.2"
          />
          <path d="M185 60 L180 110 L175 148" />
          <path d="M195 65 L210 110 L215 148" />
        </>
      )}
    </g>
  );
}

/* —— 侧卧类 —— */
function sceneSide(id, step) {
  const s = step === "overview" ? 2 : step;
  const scissor = id === "scissor";
  return (
    <g>
      <Ground />
      <H cx={55} cy={60} />
      <path d="M64 64 C100 58, 140 62, 170 72" strokeWidth="2.2" />
      <path d="M85 64 L75 110 L68 145" />
      {scissor && s >= 2 ? (
        <path d="M120 68 L165 105 L180 135" />
      ) : (
        <path d="M130 68 L150 100 L160 135" />
      )}
      {s >= 1 && (
        <>
          <H cx={42} cy={s === 1 ? 35 : 44} />
          <path
            d={
              s === 1
                ? "M50 42 C80 38, 120 42, 150 52"
                : "M50 50 C85 46, 125 50, 155 60"
            }
            strokeWidth="2.2"
          />
          <path d="M70 48 L62 95 L55 130" />
          {scissor && s >= 2 ? (
            <path d="M115 52 L75 105 L60 135" />
          ) : (
            <path d="M115 52 L130 90 L140 125" />
          )}
        </>
      )}
      {scissor && s >= 2 && (
        <circle cx={118} cy={90} r="3.5" strokeOpacity="0.35" />
      )}
    </g>
  );
}

/* —— 面对面坐 —— */
function sceneSitFace(id, step) {
  const s = step === "overview" ? 2 : step;
  return (
    <g>
      <Ground />
      <H cx={78} cy={38} />
      <path d="M78 47 L78 98" strokeWidth="2.2" />
      <path d="M78 60 L55 88" />
      <path d="M78 98 L50 135 L45 150" />
      <path d="M78 98 L105 135" />
      {s >= 1 && (
        <>
          <H cx={s === 1 ? 190 : 155} cy={38} />
          <path
            d={s === 1 ? "M190 47 L190 90" : "M155 47 L155 98"}
            strokeWidth="2.2"
          />
          {s === 1 ? (
            <>
              <path d="M190 60 L170 85" />
              <path d="M190 90 L175 130" />
            </>
          ) : (
            <>
              <path d="M155 60 L130 80" />
              <path d="M155 60 L180 88" />
              <path d="M155 98 L130 135" />
              <path d="M155 98 L185 130" />
              {s >= 2 && (
                <>
                  <path
                    d="M95 62 C112 56, 128 56, 140 62"
                    strokeOpacity="0.4"
                    strokeDasharray="5 4"
                  />
                  <path
                    d="M95 78 C112 86, 128 86, 140 78"
                    strokeOpacity="0.4"
                    strokeDasharray="5 4"
                  />
                </>
              )}
            </>
          )}
        </>
      )}
    </g>
  );
}

/* —— 椅子 —— */
function sceneChair(id, step) {
  const s = step === "overview" ? 2 : step;
  return (
    <g>
      <Ground />
      <path d="M55 115 V70 H145 V115" strokeWidth="2.2" />
      <path d="M55 70 V35" />
      <path d="M60 115 V148" />
      <path d="M140 115 V148" />
      {s >= 0 && (
        <>
          <H cx={100} cy={36} />
          <path d="M100 45 L100 78" strokeWidth="2.2" />
          <path d="M100 58 L78 72" />
          <path d="M100 78 L85 115" />
          <path d="M100 78 L120 115" />
        </>
      )}
      {s >= 1 && (
        <>
          <H cx={s === 1 ? 175 : 148} cy={s === 1 ? 22 : 26} />
          <path
            d={
              s === 1
                ? "M175 30 L165 70"
                : "M142 34 C128 52, 118 68, 110 80"
            }
            strokeWidth="2.2"
          />
          {s >= 2 && (
            <>
              <path d="M130 48 L158 62" />
              <path d="M110 80 L95 125" />
              <path d="M110 80 L132 128" />
            </>
          )}
        </>
      )}
    </g>
  );
}

/* —— 站立 —— */
function sceneStand(id, step) {
  const s = step === "overview" ? 2 : step;
  return (
    <g>
      <path d="M28 15 V160" strokeOpacity="0.35" strokeDasharray="7 5" strokeWidth="1.8" />
      <Ground />
      <H cx={75} cy={28} />
      <path d="M75 37 L75 100" strokeWidth="2.2" />
      <path d="M75 55 L52 82" />
      <path d="M75 100 L58 150" />
      <path d="M75 100 L95 150" />
      {s >= 1 && (
        <>
          <H cx={s === 1 ? 175 : 138} cy={26} />
          <path
            d={s === 1 ? "M175 35 L175 95" : "M138 35 L138 100"}
            strokeWidth="2.2"
          />
          {s === 1 ? (
            <>
              <path d="M175 55 L155 80" />
              <path d="M175 95 L160 150" />
              <path d="M175 95 L190 150" />
            </>
          ) : (
            <>
              <path d="M138 55 L110 80" />
              <path d="M138 55 L162 80" />
              <path d="M138 100 L120 150" />
              <path d="M138 100 L158 150" />
              {s >= 3 && (
                <path d="M95 150 L112 120" strokeOpacity="0.55" strokeDasharray="4 3" />
              )}
            </>
          )}
        </>
      )}
    </g>
  );
}

/* —— 床沿 / 桌边 —— */
function sceneEdge(id, step) {
  const s = step === "overview" ? 2 : step;
  return (
    <g>
      <path d="M15 100 H150" strokeWidth="2.4" />
      <path d="M15 100 V155" strokeOpacity="0.35" />
      <Ground />
      <H cx={65} cy={55} />
      <path d="M72 58 C95 72, 115 88, 130 100" strokeWidth="2.2" />
      <path d="M80 65 L70 95" />
      {s >= 2 && <path d="M120 95 L148 82" />}
      {s >= 1 && (
        <>
          <H cx={s === 1 ? 200 : 185} cy={38} />
          <path
            d={s === 1 ? "M200 47 L195 100" : "M185 47 L172 100"}
            strokeWidth="2.2"
          />
          <path d="M180 60 L155 92" />
          <path d="M185 65 L205 100" />
          <path d="M175 100 L165 150" />
          <path d="M178 100 L195 150" />
        </>
      )}
    </g>
  );
}

/* —— 桥式 —— */
function sceneBridge(id, step) {
  const s = step === "overview" ? 2 : step;
  return (
    <g>
      <Ground />
      {s === 0 ? (
        <>
          <H cx={48} cy={100} />
          <path d="M57 100 H170" strokeWidth="2.2" />
          <path d="M90 100 L85 140" />
          <path d="M140 100 L150 140" />
        </>
      ) : (
        <>
          <H cx={42} cy={s === 1 ? 100 : 95} />
          <path
            d={
              s === 1
                ? "M50 98 C80 75, 120 72, 160 90"
                : "M50 92 C80 52, 125 48, 165 75 C175 85, 182 100, 185 115"
            }
            strokeWidth="2.2"
          />
          <path d="M80 70 L72 125 L68 150" />
          <path d="M145 60 L155 125 L160 150" />
          {s >= 2 && (
            <>
              <H cx={115} cy={26} />
              <path d="M115 35 L115 55" strokeWidth="2.2" />
              <path d="M115 45 L95 60" />
              <path d="M115 45 L140 60" />
            </>
          )}
        </>
      )}
    </g>
  );
}
