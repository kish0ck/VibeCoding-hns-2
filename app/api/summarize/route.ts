import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { transcript } = await request.json()

    if (!transcript || typeof transcript !== 'string') {
      return NextResponse.json(
        { error: '회의록 텍스트가 필요합니다' },
        { status: 400 }
      )
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'API 키가 설정되지 않았습니다' },
        { status: 500 }
      )
    }

    // Claude API 호출
    const message = await client.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `다음 회의록을 분석하여 요약 정보를 추출하세요. 반드시 한국어로 답변하고, 정확하고 간결하게 정리해주세요.

회의록:
${transcript}

다음 JSON 형식으로만 응답하세요 (다른 설명 없이). 모든 텍스트는 한국어여야 합니다:

{
  "summary": {
    "purpose": "회의의 주요 목적을 한 두 문장으로 요약",
    "keyPoints": [
      "가장 중요한 논의 내용",
      "두 번째 중요 사항",
      "세 번째 중요 사항"
    ],
    "decisions": [
      "확정된 결정사항 1",
      "확정된 결정사항 2"
    ]
  },
  "actionItems": [
    {
      "assignee": "담당자명 (미정일 경우 '담당자 미정')",
      "task": "구체적인 업무 내용"
    }
  ]
}

요구사항:
- 목적은 간결하게 (2문장 이내)
- 핵심 포인트는 3~5개 (가장 중요한 것들만)
- 결정사항은 확정된 것들만 포함
- 액션 아이템은 담당자와 업무가 명확한 것들만
- 모든 텍스트는 한국어`,
        },
      ],
    })

    // 응답 추출
    const content = message.content[0]
    if (content.type !== 'text') {
      throw new Error('예상치 못한 응답 형식')
    }

    // JSON 파싱
    const result = JSON.parse(content.text)

    return NextResponse.json(result)
  } catch (error) {
    console.error('API 오류:', error)

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'AI 응답 파싱 오류' },
        { status: 500 }
      )
    }

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: '처리 중 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}
