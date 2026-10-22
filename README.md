# ATS CV Checker

A web app for checking whether a CV is ATS-friendly. Upload a CV (PDF or DOCX) and you get:

- an **ATS score from 0 to 100** with a verdict (Ramah ATS / Perlu perbaikan / Belum ramah ATS);
- a **list of issues** sorted by severity (Kritis, Perlu dicek, Saran), each with a concrete fix;
- a **score breakdown** per category;
- a **keyword match** against a job description, if you paste one;
- a **preview of the text** as an ATS reads it.

Everything is processed **in the browser**. The CV is never uploaded to any server.

> The score is an estimate based on general rules used by many ATSs. It is not an official score from Workday, Greenhouse, Taleo, or any other specific ATS.

## Stack

| Concern          | Choice                                                     |
| ---------------- | ---------------------------------------------------------- |
| Framework        | Next.js 15 (App Router) + TypeScript strict                |
| UI               | Material UI 6, global theme in `src/theme`                 |
| Styling          | Styled components via `styled` from `@mui/material/styles` |
| State management | Zustand (separate stores per domain)                       |
| Parsing          | `pdfjs-dist` (PDF), `mammoth` (DOCX)                       |
| Testing          | Vitest + React Testing Library                             |
| Code quality     | ESLint (next + typescript) + Prettier                      |

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm test           # run all unit tests
npm run test:watch # tests in watch mode
npm run lint       # ESLint
npm run typecheck  # TypeScript check
npm run format     # Prettier
npm run build      # production build
npm start          # run the production build
```

Requires Node.js 18.18 or newer (developed on Node 22).

## Folder structure

```
src/
├── app/                    # Next.js App Router: layout, providers, page
├── components/
│   ├── atoms/              # Smallest pieces: Panel, ScoreDial, ScoreBar, SeverityChip
│   ├── molecules/          # Combinations of atoms: FileDropzone, IssueCard, RuleScoreRow, KeywordChipGroup
│   ├── organisms/          # Page sections: UploadPanel, ScoreOverview, IssueList, RuleBreakdown, ...
│   └── templates/          # Page layout: CheckerTemplate
├── hooks/useCvCheck.ts     # The one place where the two stores meet (upload → score)
├── lib/
│   ├── ats/                # Scoring engine (pure functions, no React)
│   │   ├── rules/          # One file per rule + its test
│   │   └── analyzeCv.ts    # Runs every rule and builds the report
│   ├── parser/             # Reads PDF/DOCX into plain text
│   └── format.ts           # UI labels and formatting helpers
├── store/
│   ├── cv/                 # useCvStore: file, parsed text, status, job description
│   └── analysis/           # useAnalysisStore: score report
├── styles/globals.css      # Global CSS (fonts, reset, focus, reduced motion)
├── theme/                  # Design tokens + MUI theme
├── test/                   # Test helpers (renderWithTheme)
└── types/ats.ts            # Shared types
```

Each component lives in its own folder:

```
ScoreDial/
├── ScoreDial.tsx           # Component
├── ScoreDial.styles.ts     # Styled components
├── ScoreDial.test.tsx      # Unit test
└── index.ts                # Public export
```

### Data flow

```
FileDropzone ──▶ useCvCheck.checkFile(file)
                   ├─▶ useCvStore.loadCv(file)        → parseCvFile → plain text
                   └─▶ useAnalysisStore.analyze(input) → analyzeCv  → AtsReport
ResultsView  ◀── reads the report from useAnalysisStore via selectors
```

Each store is split into `*.types.ts` (state and actions), `use*Store.ts` (implementation), and `*.selectors.ts` (small selectors used by components).

## Scoring system

Each rule returns a value from 0 to 1, multiplied by its weight. The final score is the weighted average, scaled to 0–100.

| Category                     | Weight | What is checked                                                             |
| ---------------------------- | -----: | --------------------------------------------------------------------------- |
| Text is ATS-readable         |     20 | < 30 words = image/scan CV (0), < 150 words = partial (0.5)                 |
| Standard section headings    |     15 | Experience, Education, Skills, Summary (Indonesian & English headings)      |
| Contact info                 |     10 | Email (0.45), phone number (0.35), LinkedIn URL (0.2)                       |
| Job keyword match            |     20 | Only when a JD is provided. Top 25 JD keywords that appear in the CV        |
| Bullet points & action verbs |     10 | Target ≥ 5 bullets and ≥ 5 action verbs (EN/ID)                             |
| Measurable achievements      |     10 | Numbers with units: %, x, +, users, million, and so on (target ≥ 3)         |
| Date format                  |     10 | Dates present and in a single consistent format                             |
| CV length                    |     10 | Ideal 300–900 words, maximum 2 pages                                        |
| Layout & characters          |     10 | No broken characters (icon fonts, `(cid:x)`) and no two-column/table layout |
| File size                    |      5 | < 2 MB ideal, > 5 MB critical                                               |

Without a job description the weights add up to 100. With a JD, the keyword rule is added and the total is normalized back to 0–100.

**Verdict:** ≥ 80 Ramah ATS · 60–79 Perlu perbaikan · < 60 Belum ramah ATS.

All weights live in `src/lib/ats/rules/weights.ts`; thresholds live in each rule file.

## Adding a new rule

1. Create `src/lib/ats/rules/myRule.ts` that exports an `AtsRule` function (input → `RuleResult | null`).
2. Add its weight to `RULE_WEIGHTS` and its `RuleId` to `src/types/ats.ts`.
3. Register it in `ATS_RULES` (`src/lib/ats/rules/index.ts`).
4. Write `myRule.test.ts` next to it.
