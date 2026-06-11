import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI 회의록 요약기',
  description: '회의록을 입력하면 AI가 요약과 액션 아이템을 추출해줍니다',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
