'use client'

interface SummaryData {
  summary: {
    purpose: string
    keyPoints: string[]
    decisions: string[]
  }
  actionItems: Array<{
    assignee: string
    task: string
  }>
}

interface SummaryResultProps {
  data: SummaryData
}

export default function SummaryResult({ data }: SummaryResultProps) {
  const handleCopy = () => {
    const text = formatResultAsText(data)
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-section">
      {/* 회의 목적 */}
      <div className="bg-soft-cloud p-lg border-t-4 border-ink">
        <h3 className="text-heading-md text-ink font-body-strong mb-md">
          📌 회의 목적
        </h3>
        <p className="text-body-md text-charcoal leading-relaxed">{data.summary.purpose}</p>
      </div>

      {/* 주요 논의 내용 */}
      <div className="border-b border-hairline pb-section">
        <h3 className="text-heading-md text-ink font-body-strong mb-lg">
          💡 주요 논의 내용
        </h3>
        <ul className="space-y-md">
          {data.summary.keyPoints.map((point, idx) => (
            <li key={idx} className="flex items-start gap-lg">
              <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-ink text-canvas font-body-strong text-caption-sm flex-shrink-0">
                {idx + 1}
              </span>
              <span className="text-body-md text-charcoal pt-1">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 결정사항 */}
      <div className="border-b border-hairline pb-section">
        <h3 className="text-heading-md text-ink font-body-strong mb-lg">
          ✅ 결정사항
        </h3>
        <ul className="space-y-md">
          {data.summary.decisions.map((decision, idx) => (
            <li key={idx} className="flex items-start gap-lg">
              <span className="text-success font-bold pt-1 flex-shrink-0">✓</span>
              <span className="text-body-md text-charcoal pt-1">{decision}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 액션 아이템 */}
      <div className="border-b border-hairline pb-section">
        <h3 className="text-heading-md text-ink font-body-strong mb-lg">
          📋 액션 아이템
        </h3>
        <div className="space-y-md">
          {data.actionItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-soft-cloud p-lg border-l-4 border-ink"
            >
              <div className="flex items-start gap-lg">
                <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-ink text-canvas font-body-strong text-caption-sm flex-shrink-0">
                  {idx + 1}
                </div>
                <div className="flex-grow">
                  <p className="font-body-strong text-ink">{item.assignee}</p>
                  <p className="text-body-md text-charcoal mt-md">{item.task}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 복사 버튼 */}
      <button
        onClick={handleCopy}
        className="w-full h-12 bg-ink hover:opacity-90 text-canvas font-button-md rounded-pill transition-opacity"
      >
        📋 결과 복사하기
      </button>
    </div>
  )
}

function formatResultAsText(data: SummaryData): string {
  const lines = [
    '=== AI 회의록 요약 ===',
    '',
    '📌 회의 목적',
    data.summary.purpose,
    '',
    '💡 주요 논의 내용',
    ...data.summary.keyPoints.map((point, idx) => `${idx + 1}. ${point}`),
    '',
    '✅ 결정사항',
    ...data.summary.decisions.map((decision) => `• ${decision}`),
    '',
    '📋 액션 아이템',
    ...data.actionItems.map(
      (item) => `• ${item.assignee}: ${item.task}`
    ),
    '',
    '생성일: ' + new Date().toLocaleString('ko-KR'),
  ]

  return lines.join('\n')
}
