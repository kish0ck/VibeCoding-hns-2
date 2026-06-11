'use client'

import { useState } from 'react'
import SummaryResult from './SummaryResult'

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

export default function MeetingSummaryForm() {
  const [transcript, setTranscript] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<SummaryData | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!transcript.trim()) return

    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transcript }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        if (errorData.error === 'API 키가 설정되지 않았습니다') {
          throw new Error(
            'API 키가 설정되지 않았습니다. .env.local 파일에 ANTHROPIC_API_KEY를 추가해주세요.\n\n' +
            'https://console.anthropic.com/account/keys 에서 API 키를 발급받을 수 있습니다.'
          )
        }
        throw new Error(errorData.error || '분석 실패')
      }

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setError(
        error instanceof Error ? error.message : '오류가 발생했습니다'
      )
    } finally {
      setIsLoading(false)
    }
  }

  if (result) {
    return (
      <div className="space-y-lg">
        <button
          onClick={() => {
            setResult(null)
            setTranscript('')
          }}
          className="text-ink hover:opacity-70 font-body-strong text-caption-md transition-opacity"
        >
          ← 새 회의록 분석하기
        </button>
        <SummaryResult data={result} />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-lg">
      <div>
        <label htmlFor="transcript" className="block text-body-strong text-ink mb-md">
          회의록을 붙여넣으세요
        </label>
        <textarea
          id="transcript"
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="Teams, Zoom, 또는 직접 작성한 회의록을 여기에 붙여넣으세요..."
          className="w-full h-64 p-lg border border-hairline bg-canvas text-ink placeholder-mute focus:outline-none focus:border-ink resize-none transition-colors"
          disabled={isLoading}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading || !transcript.trim()}
        className="w-full h-12 bg-ink hover:opacity-90 disabled:opacity-50 text-canvas font-button-md rounded-pill transition-opacity disabled:cursor-not-allowed"
      >
        {isLoading ? '분석 중...' : 'AI 요약하기'}
      </button>

      {error && (
        <div className="p-lg bg-soft-cloud border-l-4 border-sale text-ink">
          <p className="font-body-strong text-ink mb-md">⚠️ 분석 실패</p>
          <p className="text-body-md text-charcoal whitespace-pre-wrap">{error}</p>
        </div>
      )}
    </form>
  )
}
