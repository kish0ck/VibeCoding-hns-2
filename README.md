# AI 회의록 요약기 - 개발 문서

## 📋 프로젝트 개요

**AI 회의록 요약기**는 Claude AI를 활용하여 회의 내용을 자동으로 분석하고 요약해주는 웹 애플리케이션입니다.

**주요 기능:**
- 회의록 텍스트 입력
- Claude Opus 4.8 AI를 통한 자동 분석
- 한국어로 된 요약 결과 생성
- 회의 목적, 주요 논의 사항, 결정사항, 액션 아이템 자동 추출
- 결과 복사 기능

---

## 🏗️ 프로젝트 구조

```
meetingSummary/
├── app/
│   ├── page.tsx                 # 홈 페이지 (헤더, 폼, 기능 설명)
│   ├── api/
│   │   └── summarize/
│   │       └── route.ts         # Claude API 호출 엔드포인트
│   └── layout.tsx               # 레이아웃 설정
├── components/
│   ├── MeetingSummaryForm.tsx   # 입력 폼 컴포넌트
│   └── SummaryResult.tsx        # 결과 표시 컴포넌트
├── .env.local                    # 환경 변수 (API 키)
├── .env.example                  # 환경 변수 템플릿
├── tailwind.config.js            # Tailwind CSS 설정 및 Nike 디자인 토큰
├── tsconfig.json                 # TypeScript 설정
├── next.config.js                # Next.js 설정
└── package.json                  # 프로젝트 의존성
```

---

## 🛠️ 개발 단계별 설명

### **Phase 1: UI 설정 (초기 구축)**

#### 목표
기본 웹 애플리케이션 구조를 세우고 사용자가 회의록을 입력할 수 있는 폼을 만들기

#### 사용 기술
- **Next.js 15**: 최신 React 프레임워크 (App Router 사용)
- **TypeScript**: 타입 안정성
- **Tailwind CSS**: 스타일링

#### 구현 내용

📄 **app/page.tsx** - 홈 페이지
- 헤더: 애플리케이션 제목과 설명
- 메인 폼: MeetingSummaryForm 컴포넌트 임베드
- 사용 예시: 앱의 기능을 3개 카드로 설명

📄 **components/MeetingSummaryForm.tsx** - 입력 폼
- textarea: 회의록 입력 (높이 256px)
- submit 버튼: 분석 시작
- 로딩 상태: 버튼 비활성화
- 에러 처리: 오류 메시지 표시

📄 **components/SummaryResult.tsx** - 결과 표시
- 회의 목적 섹션
- 주요 논의 내용 (리스트)
- 결정사항 (리스트)
- 액션 아이템 (담당자별)
- 복사 버튼: 결과를 텍스트로 클립보드에 복사

---

### **Phase 2: Claude API 통합**

#### 목표
Claude AI를 통해 회의록을 분석하고 구조화된 데이터로 반환하기

#### 사용 기술
- **@anthropic-ai/sdk**: Claude API 공식 SDK
- **Next.js API Routes**: 서버사이드 API 엔드포인트
- **Environment Variables**: 안전한 API 키 관리

#### 구현 내용

📄 **.env.local** - 환경 변수 (git에 커밋하지 않음)
```
ANTHROPIC_API_KEY=sk-ant-api03-...
```

📄 **app/api/summarize/route.ts** - API 엔드포인트
```typescript
// 요청 수신
- POST /api/summarize
- body: { transcript: string }

// 유효성 검사
- 회의록 텍스트 필수
- API 키 존재 확인

// Claude API 호출
const message = await client.messages.create({
  model: 'claude-opus-4-8',
  max_tokens: 1024,
  messages: [{
    role: 'user',
    content: `[한국어 프롬프트] 회의록을 분석하여 JSON 형식으로 반환`
  }]
})

// 응답 구조
{
  summary: {
    purpose: string,        # 회의 목적
    keyPoints: string[],    # 주요 논의 사항
    decisions: string[]     # 결정사항
  },
  actionItems: [{
    assignee: string,       # 담당자
    task: string            # 업무
  }]
}

// 에러 처리
- 404: API 키 없음
- 400: 잘못된 요청
- 500: API 오류
```

#### 보안 특징
✅ API 키는 환경 변수에서 읽음 (코드에 하드코딩 X)
✅ API 키는 서버사이드에서만 사용 (클라이언트에 노출 X)
✅ 사용자 친화적 에러 메시지
✅ 입력 유효성 검사

---

### **모델 업그레이드: Sonnet → Opus 4.8**

#### 변경 사유
더 정확하고 강력한 AI 분석 결과를 제공하기 위해 Claude Opus 4.8로 업그레이드

#### 변경 사항
📄 **app/api/summarize/route.ts** - 라인 28
```typescript
// Before
model: 'claude-3-5-sonnet-20241022'

// After
model: 'claude-opus-4-8'
```

#### 차이점
| 항목 | Sonnet 4.6 | Opus 4.8 |
|------|-----------|----------|
| 성능 | 중간 | 최고 |
| 비용 | 낮음 | 중간 |
| 정확도 | 좋음 | 매우 좋음 |
| 한국어 이해 | 좋음 | 매우 좋음 |

---

### **Phase 3: Nike 디자인 시스템 적용**

#### 목표
전문적이고 일관된 디자인 언어를 적용하여 사용자 경험 개선

#### 디자인 원칙

1. **극도의 단순성**
   - 순수 검은색, 흰색, 소프트 그레이만 사용
   - 장식적 요소 최소화

2. **평면 설계**
   - 드롭 섀도우 없음
   - 모든 버튼은 Pill 모양 (둥근 30px)
   - 일관된 테두리만 사용

3. **일관된 간격**
   - 8px 기본 단위
   - 섹션 간 48px 간격
   - 모든 컴포넌트가 8px 그리드에 맞춤

#### 색상 시스템

📄 **tailwind.config.js** - 색상 토큰
```typescript
colors: {
  'ink': '#111111',              # 주요 텍스트, 버튼
  'canvas': '#ffffff',           # 배경
  'soft-cloud': '#f5f5f5',       # 섹션 배경
  'charcoal': '#39393b',         # 부차 텍스트
  'mute': '#707072',             # 약화된 텍스트
  'hairline': '#cacacb',         # 테두리
  'hairline-soft': '#e5e5e5',    # 약한 테두리
  'sale': '#d30005',             # 강조 (빨강)
  'success': '#007d48',          # 성공 (초록)
}
```

#### 타이포그래피 시스템

📄 **tailwind.config.js** - 폰트 설정
```typescript
fontSize: {
  'display': ['96px', { lineHeight: '0.9' }],
  'heading-xl': ['32px', { lineHeight: '1.2' }],
  'heading-lg': ['24px', { lineHeight: '1.2' }],
  'heading-md': ['16px', { lineHeight: '1.75' }],
  'body-md': ['16px', { lineHeight: '1.5' }],
  'body-strong': ['16px', { fontWeight: '500' }],
  'button-md': ['16px', { fontWeight: '500' }],
  'caption-md': ['14px', { fontWeight: '500' }],
  'caption-sm': ['12px', { fontWeight: '500' }],
}
```

#### 스페이싱 시스템

```typescript
spacing: {
  'sm': '8px',         # 기본 단위
  'md': '12px',        # 근접 요소
  'lg': '18px',        # 일반 간격
  'xl': '24px',        # 큰 간격
  'section': '48px',   # 섹션 간 거리
}
```

#### 페이지별 적용

📄 **app/page.tsx** - 홈 페이지
- 검은색 헤더 (ink 배경, canvas 텍스트)
- 특징 섹션 (소프트 클라우드 배경)
- 푸터 (hairline 테두리)

📄 **components/MeetingSummaryForm.tsx** - 입력 폼
- 레이블: body-strong (강조 텍스트)
- 텍스트 영역: hairline 테두리, 포커스 시 ink 테두리
- Pill 모양 버튼: ink 배경, canvas 텍스트
- 에러: soft-cloud 배경, sale 왼쪽 테두리

📄 **components/SummaryResult.tsx** - 결과 표시
- 섹션 구분: hairline 하단 테두리
- 항목 번호: 검은색 원 (ink 배경)
- 액션 아이템: soft-cloud 배경, ink 왼쪽 테두리
- Pill 모양 복사 버튼

---

## 🚀 시작하기

### 1. 설치
```bash
cd meetingSummary
npm install
```

### 2. 환경 변수 설정
```bash
echo "ANTHROPIC_API_KEY=your_api_key_here" > .env.local
```

API 키는 [Anthropic Console](https://console.anthropic.com/account/keys)에서 발급받을 수 있습니다.

### 3. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 `http://localhost:3000` 열기

### 4. 사용 방법
1. 회의록 텍스트를 textarea에 붙여넣기
2. "AI 요약하기" 버튼 클릭
3. 분석 결과 확인
4. "결과 복사하기" 버튼으로 텍스트 복사

---

## 📊 기술 스택

| 항목 | 기술 |
|------|------|
| **프레임워크** | Next.js 15 (App Router) |
| **언어** | TypeScript |
| **스타일링** | Tailwind CSS |
| **AI** | Claude API (Opus 4.8) |
| **SDK** | @anthropic-ai/sdk |
| **런타임** | Node.js |

---

## 🎨 디자인 특징

### 색상 팔레트
- **Ink** (#111111): 주요 텍스트, 버튼 배경
- **Canvas** (#ffffff): 페이지 배경
- **Soft Cloud** (#f5f5f5): 섹션 배경
- **Charcoal** (#39393b): 부차 텍스트
- **Mute** (#707072): 보조 텍스트

### 컴포넌트
- **Pill Button**: 모든 버튼 (30px 둥근 모서리)
- **Card**: 소프트 클라우드 배경
- **List**: 번호 혹은 체크마크

---

## 🔒 보안

✅ **API 키 보호**
- 환경 변수 사용 (.env.local)
- 서버사이드 호출만 (클라이언트 노출 X)
- .gitignore로 커밋 방지

✅ **입력 검증**
- 회의록 텍스트 필수
- 최대 1024 토큰 응답

✅ **에러 처리**
- 사용자 친화적 메시지
- 상세 에러는 서버 로그에만

---

## 📝 주요 파일 설명

### Backend
- **app/api/summarize/route.ts**: Claude API 통합, JSON 파싱, 에러 처리

### Frontend
- **app/page.tsx**: 메인 레이아웃, 헤더, 푸터
- **components/MeetingSummaryForm.tsx**: 입력 폼, 상태 관리
- **components/SummaryResult.tsx**: 결과 표시, 텍스트 형식화

### Config
- **tailwind.config.js**: Nike 디자인 토큰
- **tsconfig.json**: TypeScript 설정
- **next.config.js**: Next.js 설정

---

## 🧪 테스트 회의록 예시

```
[회의 제목] Q2 제품 로드맵 검토
[참석자] 제품팀, 개발팀, 디자인팀

1. 회의 목표 설명
   - Q2 신규 기능 우선순위 결정
   - 개발 일정 확인

2. 신규 기능 논의
   - 사용자 대시보드 개선: 3주 소요
   - API 성능 최적화: 2주 소요
   - 모바일 앱 버그 수정: 1주 소요

3. 결정사항
   - 대시보드를 우선순위 1로 진행
   - API 최적화는 대시보드 후 진행
   - 버그 수정은 병렬 진행

4. 액션 아이템
   - 김개발: 대시보드 설계 문서 작성 (마감: 6/12)
   - 이디자인: UI 디자인 완성 (마감: 6/15)
   - 박제품: 스펙 검토 및 승인 (마감: 6/11)
```

---

## ✨ 향후 개선 계획

- [ ] 회의 녹음 파일 직접 업로드 (음성-텍스트 변환)
- [ ] 다국어 지원 (영어, 일본어 등)
- [ ] 이전 요약 기록 저장 및 검색
- [ ] PDF 내보내기 기능
- [ ] 팀 공유 기능
- [ ] 실시간 협업 요약

---

## 📞 문의

이 문서에 대한 질문이나 오류가 있으면 언제든지 알려주세요!
# VibeCoding-hns-2
