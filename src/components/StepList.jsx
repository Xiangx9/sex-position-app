export default function StepList({ steps }) {
  return (
    <div className="space-y-6">
      {steps.map((step, index) => (
        <div key={index} className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center text-sm font-medium">
            {index + 1}
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-1">{step.title}</h4>
            <p className="text-gray-600 text-sm leading-relaxed">{step.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
