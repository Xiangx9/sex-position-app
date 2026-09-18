/**
 * 姿势插图：直接使用 public/poses/<id>.webp
 * 图片为 PDF 原图转出的 WebP，纯白背景已抠成透明，可以直接叠在渐变底色上。
 */
import { useState } from "react";

/** Vite 的 base，GitHub Pages 部署在子路径下，值为 "/sex-position-app/" */
const BASE = import.meta.env.BASE_URL;

export default function PositionIllustration({ id, name, className = "" }) {
  const [broken, setBroken] = useState(false);

  if (broken) {
    return (
      <div className="w-full h-full flex items-center justify-center" aria-hidden>
        <span className="text-xs text-gray-300">插图暂缺</span>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-1" aria-hidden>
      <img
        src={`${BASE}poses/${id}.webp`}
        alt={name ? `${name}示意图` : ""}
        loading="lazy"
        decoding="async"
        draggable={false}
        onError={() => setBroken(true)}
        className={`max-w-full max-h-full w-auto h-auto object-contain select-none ${className}`}
      />
    </div>
  );
}
