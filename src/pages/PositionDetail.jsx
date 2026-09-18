import { useParams, Link } from "react-router-dom";
import { positions } from "../data/positions";
import Header from "../components/Header";
import StepList from "../components/StepList";
import PositionCard from "../components/PositionCard";

export default function PositionDetail() {
  const { id } = useParams();
  const position = positions.find((p) => p.id === id);

  if (!position) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-gray-50">
        <p className="text-gray-600">姿势不存在</p>
        <Link to="/" className="text-rose-500 hover:text-rose-600">
          返回首页
        </Link>
      </div>
    );
  }

  const relatedPositions = positions.filter((p) => position.related?.includes(p.id));

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-3xl mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-6"
        >
          ← 返回
        </Link>

        <div className="mb-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{position.name}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                <span className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={i < position.difficulty ? "text-amber-400" : "text-gray-200"}
                    >
                      ★
                    </span>
                  ))}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                  {position.intensity}体力
                </span>
                <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                  灵活性 {position.flexibility}
                </span>
              </div>
            </div>
          </div>
          <p className="mt-3 text-gray-600">{position.description}</p>
        </div>

        <div className="aspect-[16/10] rounded-2xl bg-gradient-to-br from-rose-50 to-orange-50 flex items-center justify-center mb-8">
          <span className="text-6xl text-rose-200 font-light">{position.name[0]}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-sm">
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-gray-500 mb-1">适合</p>
            <p className="text-gray-900">{position.suitable}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-gray-500 mb-1">不适合</p>
            <p className="text-gray-900">{position.notSuitable}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 sm:col-span-2">
            <p className="text-gray-500 mb-1">道具</p>
            <p className="text-gray-900">{position.props}</p>
          </div>
        </div>

        <section className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-5">动作步骤</h2>
          <StepList steps={position.steps} />
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">要点与技巧</h2>
          <ul className="space-y-2">
            {position.tips.map((tip, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-600">
                <span className="text-rose-500">•</span>
                {tip}
              </li>
            ))}
          </ul>
          {position.variations?.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500 mb-2">常见变式</p>
              <div className="flex flex-wrap gap-2">
                {position.variations.map((v) => (
                  <span
                    key={v}
                    className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-700"
                  >
                    {v}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>

        <section className="bg-amber-50 border border-amber-100 rounded-2xl p-5 mb-8">
          <h2 className="text-sm font-semibold text-amber-800 mb-2">注意事项</h2>
          <p className="text-sm text-amber-700 leading-relaxed">
            出现任何不适请立即停止。注意关节保护，使用必要的支撑与润滑。双方随时可以用安全词叫停。本内容仅供参考，请根据自身情况调整。
          </p>
        </section>

        {relatedPositions.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">相关姿势</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPositions.map((p) => (
                <PositionCard key={p.id} position={p} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
