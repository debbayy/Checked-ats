import Typography from '@mui/material/Typography';
import { Panel } from '@/components/atoms';
import { RULE_WEIGHTS } from '@/lib/ats';
import type { RuleId } from '@/types/ats';
import { CheckGrid, CheckItem, Weight } from './CheckIntro.styles';

const CHECKS: { id: RuleId; label: string }[] = [
  { id: 'textExtractable', label: 'Teks bisa dibaca (bukan gambar/scan)' },
  { id: 'sections', label: 'Heading bagian standar' },
  { id: 'contact', label: 'Email, nomor HP, LinkedIn' },
  { id: 'bulletsAndVerbs', label: 'Bullet point & kata kerja aksi' },
  { id: 'quantified', label: 'Pencapaian pakai angka' },
  { id: 'dates', label: 'Format tanggal konsisten' },
  { id: 'length', label: 'Panjang CV' },
  { id: 'formatting', label: 'Layout satu kolom, tanpa karakter rusak' },
  { id: 'fileSize', label: 'Ukuran file' },
  { id: 'keywords', label: 'Keyword lowongan (kalau JD diisi)' },
];

/** Shown before any CV is uploaded: what gets checked and how much each part weighs. */
export function CheckIntro() {
  return (
    <Panel title="Yang dicek" subtitle="Bobot tiap kategori terhadap skor akhir.">
      <CheckGrid>
        {CHECKS.map((check) => (
          <CheckItem key={check.id}>
            <Typography variant="body2">{check.label}</Typography>
            <Weight>{RULE_WEIGHTS[check.id]} poin</Weight>
          </CheckItem>
        ))}
      </CheckGrid>
    </Panel>
  );
}
