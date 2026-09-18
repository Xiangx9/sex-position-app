/**
 * 统一线稿插图：抽象人形轮廓，健身/教学风格，无露骨细节。
 * 按 posture 切换构图。
 */
export default function PositionIllustration({ id, className = "" }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  const Head = ({ cx, cy, r = 8 }) => (
    <circle cx={cx} cy={cy} r={r} {...common} />
  );

  return (
    <div
      className={`w-full h-full flex items-center justify-center text-rose-300 ${className}`}
      aria-hidden
    >
      <svg viewBox="0 0 200 160" className="w-full h-full max-h-full p-4">
        {getScene(id, common, Head)}
      </svg>
    </div>
  );
}

function getScene(id, common, Head) {
  switch (id) {
    case "missionary":
      return (
        <g>
          {/* 下方平躺 */}
          <Head cx={70} cy={48} />
          <path d="M78 52 L130 52 L145 70" {...common} />
          <path d="M90 52 L85 95 L70 110" {...common} />
          <path d="M110 52 L120 95 L140 108" {...common} />
          {/* 上方 */}
          <Head cx={100} cy={28} />
          <path d="M100 36 L100 70" {...common} />
          <path d="M100 45 L75 60" {...common} />
          <path d="M100 45 L125 60" {...common} />
          <path d="M100 70 L85 100" {...common} />
          <path d="M100 70 L120 100" {...common} />
        </g>
      );

    case "cowgirl":
      return (
        <g>
          {/* 下方平躺 */}
          <Head cx={55} cy={70} />
          <path d="M63 72 L150 72" {...common} />
          <path d="M90 72 L85 110" {...common} />
          <path d="M120 72 L130 110" {...common} />
          {/* 上方跨坐 */}
          <Head cx={110} cy={28} />
          <path d="M110 36 L110 72" {...common} />
          <path d="M110 50 L85 72" {...common} />
          <path d="M110 50 L135 72" {...common} />
          <path d="M110 72 L95 105" {...common} />
          <path d="M110 72 L128 105" {...common} />
        </g>
      );

    case "reverse-cowgirl":
      return (
        <g>
          <Head cx={55} cy={70} />
          <path d="M63 72 L150 72" {...common} />
          <path d="M90 72 L85 110" {...common} />
          <path d="M120 72 L130 110" {...common} />
          {/* 背对跨坐：头朝右 */}
          <Head cx={130} cy={30} />
          <path d="M122 36 L100 72" {...common} />
          <path d="M110 50 L90 72" {...common} />
          <path d="M115 55 L140 70" {...common} />
          <path d="M100 72 L95 105" {...common} />
          <path d="M100 72 L120 105" {...common} />
        </g>
      );

    case "doggy":
      return (
        <g>
          {/* 跪趴 */}
          <Head cx={50} cy={55} />
          <path d="M58 58 L100 50 L130 55" {...common} />
          <path d="M70 55 L55 95" {...common} />
          <path d="M70 55 L80 95" {...common} />
          <path d="M115 52 L110 95" {...common} />
          <path d="M115 52 L130 90" {...common} />
          {/* 后方 */}
          <Head cx={155} cy={40} />
          <path d="M148 48 L120 60" {...common} />
          <path d="M140 55 L145 95" {...common} />
          <path d="M140 55 L165 90" {...common} />
          <path d="M145 70 L125 75" {...common} />
        </g>
      );

    case "spooning":
    case "from-behind-side":
      return (
        <g>
          {/* 前方侧卧 */}
          <Head cx={55} cy={55} />
          <path d="M63 58 L120 58" {...common} />
          <path d="M80 58 L75 100" {...common} />
          <path d="M100 58 L115 95" {...common} />
          {/* 后方贴合 */}
          <Head cx={45} cy={42} />
          <path d="M53 48 L115 48" {...common} />
          <path d="M70 48 L68 58" {...common} />
          <path d="M95 48 L100 58" {...common} />
          <path d="M60 48 L55 90" {...common} />
        </g>
      );

    case "lotus":
    case "sitting-face":
      return (
        <g>
          <Head cx={70} cy={35} />
          <path d="M70 43 L70 85" {...common} />
          <path d="M70 55 L50 75" {...common} />
          <path d="M70 55 L90 75" {...common} />
          <path d="M70 85 L55 110" {...common} />
          <path d="M70 85 L90 105" {...common} />
          <Head cx={130} cy={35} />
          <path d="M130 43 L130 85" {...common} />
          <path d="M130 55 L110 75" {...common} />
          <path d="M130 55 L150 75" {...common} />
          <path d="M130 85 L115 110" {...common} />
          <path d="M130 85 L145 105" {...common} />
          {/* 相对靠近示意 */}
          <path d="M85 60 L115 60" {...common} strokeDasharray="4 3" />
        </g>
      );

    case "prone":
      return (
        <g>
          <Head cx={45} cy={70} />
          <path d="M53 70 L155 70" {...common} />
          <path d="M80 70 L75 100" {...common} />
          <path d="M120 70 L130 100" {...common} />
          <Head cx={100} cy={42} />
          <path d="M100 50 L100 70" {...common} />
          <path d="M100 55 L80 65" {...common} />
          <path d="M100 55 L120 65" {...common} />
          <path d="M95 70 L90 95" {...common} />
          <path d="M105 70 L115 95" {...common} />
        </g>
      );

    case "standing":
    case "face-to-face-standing":
      return (
        <g>
          {/* 墙 */}
          <path d="M30 20 L30 140" {...common} strokeDasharray="6 4" />
          <Head cx={70} cy={30} />
          <path d="M70 38 L70 90" {...common} />
          <path d="M70 55 L50 75" {...common} />
          <path d="M70 55 L95 70" {...common} />
          <path d="M70 90 L55 130" {...common} />
          <path d="M70 90 L90 130" {...common} />
          <Head cx={120} cy={28} />
          <path d="M120 36 L120 90" {...common} />
          <path d="M120 55 L100 70" {...common} />
          <path d="M120 55 L145 70" {...common} />
          <path d="M120 90 L105 130" {...common} />
          <path d="M120 90 L140 130" {...common} />
        </g>
      );

    case "chair":
    case "lap":
      return (
        <g>
          {/* 椅子简笔 */}
          <path d="M50 100 L50 70 L120 70 L120 100" {...common} />
          <path d="M50 70 L50 40" {...common} />
          <path d="M55 100 L55 120" {...common} />
          <path d="M115 100 L115 120" {...common} />
          <Head cx={85} cy={32} />
          <path d="M85 40 L85 70" {...common} />
          <path d="M85 50 L65 65" {...common} />
          <path d="M85 50 L110 60" {...common} />
          <Head cx={115} cy={28} />
          <path d="M110 36 L95 70" {...common} />
          <path d="M105 50 L125 70" {...common} />
          <path d="M100 70 L90 100" {...common} />
          <path d="M100 70 L120 95" {...common} />
        </g>
      );

    case "edge":
    case "table":
      return (
        <g>
          {/* 平面边缘 */}
          <path d="M20 85 L160 85" {...common} />
          <path d="M20 85 L20 120" {...common} />
          <Head cx={70} cy={45} />
          <path d="M70 53 L70 85" {...common} />
          <path d="M70 65 L50 80" {...common} />
          <path d="M70 65 L100 75" {...common} />
          <path d="M70 85 L55 85" {...common} />
          <path d="M70 85 L100 70" {...common} />
          <Head cx={145} cy={40} />
          <path d="M140 48 L115 75" {...common} />
          <path d="M135 60 L135 110" {...common} />
          <path d="M135 60 L155 100" {...common} />
        </g>
      );

    case "scissor":
      return (
        <g>
          <Head cx={50} cy={45} />
          <path d="M58 50 L110 55" {...common} />
          <path d="M75 52 L70 100" {...common} />
          <path d="M95 54 L130 90" {...common} />
          <Head cx={150} cy={45} />
          <path d="M142 50 L90 55" {...common} />
          <path d="M125 52 L130 100" {...common} />
          <path d="M105 54 L70 90" {...common} />
        </g>
      );

    case "bridge":
      return (
        <g>
          <Head cx={50} cy={55} />
          <path d="M58 58 L90 40 L130 55 L150 70" {...common} />
          <path d="M90 40 L85 90" {...common} />
          <path d="M120 48 L130 95" {...common} />
          <Head cx={100} cy={22} />
          <path d="M100 30 L100 50" {...common} />
          <path d="M100 40 L80 55" {...common} />
          <path d="M100 40 L125 55" {...common} />
        </g>
      );

    case "raised-legs":
      return (
        <g>
          <Head cx={55} cy={50} />
          <path d="M63 52 L120 52" {...common} />
          <path d="M90 52 L100 25" {...common} />
          <path d="M105 52 L125 20" {...common} />
          <Head cx={100} cy={28} />
          <path d="M100 36 L100 70" {...common} />
          <path d="M100 50 L75 60" {...common} />
          <path d="M100 50 L130 45" {...common} />
          <path d="M100 70 L85 100" {...common} />
          <path d="M100 70 L120 100" {...common} />
        </g>
      );

    case "knee-chest":
      return (
        <g>
          <Head cx={45} cy={75} />
          <path d="M53 72 L100 45 L140 55" {...common} />
          <path d="M75 55 L60 100" {...common} />
          <path d="M75 55 L90 100" {...common} />
          <path d="M120 48 L115 95" {...common} />
          <Head cx={155} cy={38} />
          <path d="M148 46 L125 58" {...common} />
          <path d="M145 55 L150 100" {...common} />
          <path d="M145 55 L170 95" {...common} />
        </g>
      );

    default:
      return (
        <g>
          <Head cx={80} cy={40} />
          <path d="M80 48 L80 100" {...common} />
          <path d="M80 65 L55 85" {...common} />
          <path d="M80 65 L105 85" {...common} />
          <path d="M80 100 L60 135" {...common} />
          <path d="M80 100 L105 135" {...common} />
          <Head cx={130} cy={40} />
          <path d="M130 48 L130 100" {...common} />
          <path d="M130 65 L110 85" {...common} />
          <path d="M130 65 L155 85" {...common} />
          <path d="M130 100 L115 135" {...common} />
          <path d="M130 100 L150 135" {...common} />
        </g>
      );
  }
}
