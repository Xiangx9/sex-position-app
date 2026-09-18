import { Link } from "react-router-dom";
import PositionIllustration from "./PositionIllustration";

export default function PositionCard({ position }) {
  return (
    <Link
      to={`/position/${position.id}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
    >
      <div className="aspect-[4/3] bg-gradient-to-br from-rose-50 to-orange-50 flex items-center justify-center">
        <PositionIllustration
          id={position.id}
          className="text-rose-300 group-hover:text-rose-400 transition-colors"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-1 gap-2">
          <h3 className="font-semibold text-gray-900 group-hover:text-rose-600 transition-colors truncate">
            {position.name}
          </h3>
          <div className="flex gap-0.5 flex-shrink-0">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-xs ${i < position.difficulty ? "text-amber-400" : "text-gray-200"}`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <p className="text-sm text-gray-500 line-clamp-2">{position.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {position.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
