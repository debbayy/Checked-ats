import Alert from '@mui/material/Alert';
import { Panel } from '@/components/atoms';
import { IssueCard } from '@/components/molecules';
import type { AtsIssue } from '@/types/ats';
import { IssueListRoot } from './IssueList.styles';

export interface IssueListProps {
  issues: AtsIssue[];
}

export function IssueList({ issues }: IssueListProps) {
  return (
    <Panel title="Yang perlu diperbaiki" subtitle="Diurutkan dari yang paling berpengaruh.">
      {issues.length === 0 ? (
        <Alert severity="success">Tidak ada masalah yang terdeteksi. CV kamu sudah rapi.</Alert>
      ) : (
        <IssueListRoot>
          {issues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </IssueListRoot>
      )}
    </Panel>
  );
}
