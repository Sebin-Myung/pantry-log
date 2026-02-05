# PantryLog

간단한 개인 식재료 관리 모바일 앱 (Expo + React Native + TypeScript)

## 소개

PantryLog는 가정의 재료를 추가하고, 보관 위치별로 관리하며, 요리 기록과 레시피를 함께 관리할 수 있는 경량 앱입니다.

## 빠른 시작

1. 의존성 설치

```bash
npm install
```

2. 개발 서버 실행

```bash
npx expo start
```

3. Android/iOS 시뮬레이터에서 앱을 실행하세요.

## 주요 기술 스택

- Expo
- React Native
- TypeScript
- 파일 기반 라우팅 (Expo Router)

## 개발 팁

- 스토어/로컬 저장소 초기화: 엔티티 폴더의 `model/storage.ts` 혹은 `use...Store.hydrate` 호출 확인
- 라우트 상수는 `shared/.../routes`에서 관리
- 새로운 페이지/레이아웃은 `app/` 폴더에 파일 기반으로 추가

## 폴더 구조 원칙 — Feature-Sliced Design (FSD)

이 프로젝트는 Feature-Sliced Design(FSD) 원칙을 기본으로 구성되어 있습니다. FSD는 코드베이스를 책임(계층)과 기능(슬라이스)으로 나누어 확장성과 유지보수성을 높입니다. 이 저장소에서는 다음 레이어를 사용합니다:

- `app/` — 라우팅과 페이지 레이아웃(프레젠테이션 진입점)
- `pages/` — (웹/페이지별 진입점이 있는 경우) 페이지 묶음
- `entities/` — 독립적인 도메인 엔티티(데이터 타입, 저장소, 영속화 로직)
- `features/` — 비즈니스 기능(엔티티와 UI를 조합하여 동작을 구현)
- `widgets/` — 재사용 가능한 UI 블록(폼, 리스트, 카드 등)
- `shared/` — 전역 유틸리티, 스타일, 상수, 설정

폴더/슬라이스별 권장 구조(예시):

`entities/ingredient/`

- `index.ts` — public export
- `model/` — 상태관리, storage, 타입
- `ui/` — 엔티티 관련 재사용 컴포넌트

`features/add-ingredient/`

- `index.ts` — feature의 public API
- `ui/` — 페이지/모달 등 feature의 UI
- `model/` — feature 전용 상태나 훅

`widgets/ingredient-form/`

- `ui/IngredientForm.tsx`
- `index.ts`

간단한 가이드라인:

- 각 슬라이스는 `index.ts`를 통해 외부로 노출하세요(바렐 파일).
- UI(`ui/`)와 상태/비즈니스 로직(`model/`)을 분리합니다.
- 다른 슬라이스를 참조할 때는 슬라이스 루트(예: `entities/ingredient`)를 통해 가져오고, 내부 경로(심층 경로)는 피합니다.
- 공통 유틸/스타일은 `shared/`에 두어 중복을 줄입니다.
