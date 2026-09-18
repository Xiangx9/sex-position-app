import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function SafetyGuide() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-6">
          ← 返回首页
        </Link>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">安全与沟通指南</h1>
        <p className="text-gray-600 mb-8">
          姿势只是工具，沟通、同意与安全才是核心。以下内容建议双方一起阅读。
        </p>

        <div className="space-y-6">
          <section className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">1. 双方同意</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• 任何活动都需要明确、持续的同意，可以随时撤回。</li>
              <li>• 不要假设对方“应该喜欢”某个姿势或节奏。</li>
              <li>• 事先讨论边界：哪些可以尝试、哪些绝对不行。</li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">2. 安全词与暂停信号</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• 约定一个简单、不易混淆的安全词（例如“红灯”）。</li>
              <li>• 也可以用手势：拍两下表示暂停。</li>
              <li>• 一旦使用安全词，立即停止并关心对方状态。</li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">3. 身体保护</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• 注意膝盖、腰、手腕、肩颈等易受力部位，必要时用枕头支撑。</li>
              <li>• 出现麻木、刺痛、呼吸困难时立刻调整或停止。</li>
              <li>• 灵活度不足时不要强行做高难度姿势。</li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">4. 防护与润滑</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• 根据需要使用安全套等保护措施。</li>
              <li>• 适当润滑可减少不适与摩擦损伤。</li>
              <li>• 注意润滑剂与安全套材质是否兼容。</li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">5. 沟通话术示例</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• “这个角度舒服吗？要不要慢一点？”</li>
              <li>• “我想试一下另一个姿势，你愿意吗？”</li>
              <li>• “刚才有点压到了，我们换个支撑方式。”</li>
            </ul>
          </section>

          <section className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
            <h2 className="text-sm font-semibold text-amber-800 mb-2">重要声明</h2>
            <p className="text-sm text-amber-700 leading-relaxed">
              本网站内容仅供成年人士参考，不构成医疗建议。请根据自身身体状况判断是否适合。若有相关健康问题，请咨询专业医生。始终将双方同意与安全放在第一位。
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
