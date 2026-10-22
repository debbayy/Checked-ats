import { Panel } from '@/components/atoms';
import { RuleScoreRow } from '@/components/molecules';
import type { RuleResult } from '@/types/ats';
import { RuleList } from './RuleBreakdown.styles';

export interface RuleBreakdownProps {
  rules: RuleResult[];
}

export function RuleBreakdown({ rules }: RuleBreakdownProps) {
  return (
    <Panel title="Rincian skor" subtitle="Poin yang didapat per kategori, dari bobot maksimalnya.">
      <RuleList>
        {rules.map((rule) => (
          <RuleScoreRow key={rule.id} rule={rule} />
        ))}
      </RuleList>
    </Panel>
  );
}
