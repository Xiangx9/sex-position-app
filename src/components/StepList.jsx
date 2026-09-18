import PositionIllustration from "./PositionIllustration";

export default function StepList({ steps, positionId }) {
  return (
    <div className="space-y-8">
      {steps.map((step, index) => (
        <div key={index} className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center text-sm font-medium mt-1">
            {index + 1}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-gray-900 mb-1">{step.title}</h4>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">{step.content}</p>
            {positionId && (
              <div className="aspect-[16/10] max-w-xs rounded-xl bg-gradient-to-br from-rose-50 to-orange-50 border border-rose-100 flex items-center justify-center">
                <PositionIllustration
                  id={positionId}
                  step={Math.min(index, 3)}
                  className="text-rose-400 w-full h-full"
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
