import Typography from '@mui/material/Typography';
import { SeverityChip } from '@/components/atoms';
import type { AtsIssue } from '@/types/ats';
import { IssueHeader, IssueRoot } from './IssueCard.styles';

export interface IssueCardProps {
  issue: AtsIssue;
}

export function IssueCard({ issue }: IssueCardProps) {
  return (
    <IssueRoot severity={issue.severity}>
      <IssueHeader>
        <SeverityChip severity={issue.severity} />
        <Typography variant="body1" fontWeight={600} component="p">
          {issue.message}
        </Typography>
      </IssueHeader>
      <Typography variant="body2" color="text.secondary">
        {issue.suggestion}
      </Typography>
    </IssueRoot>
  );
}
