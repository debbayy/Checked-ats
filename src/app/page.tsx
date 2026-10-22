'use client';

import { ResultsView, UploadPanel } from '@/components/organisms';
import { CheckerTemplate } from '@/components/templates';

export default function HomePage() {
  return (
    <CheckerTemplate sidebar={<UploadPanel />}>
      <ResultsView />
    </CheckerTemplate>
  );
}
