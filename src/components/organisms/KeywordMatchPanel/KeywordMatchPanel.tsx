import { Panel } from '@/components/atoms';
import { KeywordChipGroup } from '@/components/molecules';
import type { KeywordMatch } from '@/types/ats';
import { KeywordColumns } from './KeywordMatchPanel.styles';

export interface KeywordMatchPanelProps {
  keywords: KeywordMatch;
}

export function KeywordMatchPanel({ keywords }: KeywordMatchPanelProps) {
  const total = keywords.matched.length + keywords.missing.length;

  return (
    <Panel
      title="Kecocokan keyword lowongan"
      subtitle={`${keywords.matched.length} dari ${total} keyword utama di job description ada di CV kamu.`}
    >
      <KeywordColumns>
        <KeywordChipGroup title="Ada di CV" keywords={keywords.matched} found />
        <KeywordChipGroup title="Belum ada di CV" keywords={keywords.missing} found={false} />
      </KeywordColumns>
    </Panel>
  );
}
