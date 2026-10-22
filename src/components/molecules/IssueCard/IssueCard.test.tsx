import { screen } from '@testing-library/react';
import { renderWithTheme } from '@/test/renderWithTheme';
import { IssueCard } from './IssueCard';

describe('IssueCard', () => {
  it('shows severity, message and suggestion', () => {
    renderWithTheme(
      <ul>
        <IssueCard
          issue={{
            id: 'contact:email',
            ruleId: 'contact',
            severity: 'critical',
            message: 'Email tidak terbaca.',
            suggestion: 'Tulis email sebagai teks biasa.',
          }}
        />
      </ul>,
    );
    expect(screen.getByText('Kritis')).toBeInTheDocument();
    expect(screen.getByText('Email tidak terbaca.')).toBeInTheDocument();
    expect(screen.getByText('Tulis email sebagai teks biasa.')).toBeInTheDocument();
  });
});
