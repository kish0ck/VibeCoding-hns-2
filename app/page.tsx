import MeetingSummaryForm from '@/components/MeetingSummaryForm'

export default function Home() {
  return (
    <main className="min-h-screen bg-canvas">
      {/* 헤더 */}
      <div className="bg-ink text-canvas py-section px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-display text-canvas mb-4">
            회의록 요약기
          </h1>
          <p className="text-heading-lg text-canvas opacity-90">
            AI가 회의록을 자동으로 분석합니다
          </p>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-section">
        {/* 폼 섹션 */}
        <div className="mb-section">
          <MeetingSummaryForm />
        </div>

        {/* 특징 설명 */}
        <div className="border-t border-hairline pt-section">
          <h2 className="text-heading-xl text-ink mb-lg">제공되는 기능</h2>
          <div className="grid md:grid-cols-3 gap-lg">
            <div className="bg-soft-cloud p-lg rounded-none">
              <div className="text-heading-lg text-ink font-semibold mb-md">
                📌
              </div>
              <h3 className="text-heading-md text-ink mb-md font-semibold">
                회의 목적
              </h3>
              <p className="text-body-md text-charcoal">
                회의의 핵심 목적을 명확하게 정리합니다.
              </p>
            </div>
            <div className="bg-soft-cloud p-lg rounded-none">
              <div className="text-heading-lg text-ink font-semibold mb-md">
                💡
              </div>
              <h3 className="text-heading-md text-ink mb-md font-semibold">
                주요 논의 사항
              </h3>
              <p className="text-body-md text-charcoal">
                3~5개의 핵심 항목으로 간결하게 정리합니다.
              </p>
            </div>
            <div className="bg-soft-cloud p-lg rounded-none">
              <div className="text-heading-lg text-ink font-semibold mb-md">
                ✅
              </div>
              <h3 className="text-heading-md text-ink mb-md font-semibold">
                액션 아이템
              </h3>
              <p className="text-body-md text-charcoal">
                담당자별 후속 업무를 자동 추출합니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 푸터 */}
      <footer className="bg-canvas border-t border-hairline mt-section">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-section">
          <p className="text-caption-md text-mute text-center">
            © 2026 AI 회의록 요약기 · Claude Opus 4.8 기반
          </p>
        </div>
      </footer>
    </main>
  )
}
