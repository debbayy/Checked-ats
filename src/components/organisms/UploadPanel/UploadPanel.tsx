'use client';

import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Panel } from '@/components/atoms';
import { FileDropzone } from '@/components/molecules';
import { useCvCheck } from '@/hooks/useCvCheck';
import { formatFileSize } from '@/lib/format';
import { ACCEPTED_FILE_TYPES } from '@/lib/parser';
import {
  selectCvError,
  selectCvFile,
  selectHasReport,
  selectIsParsing,
  selectJobDescription,
  useAnalysisStore,
  useCvStore,
} from '@/store';
import { Actions, FileName, FileRow } from './UploadPanel.styles';

/** Upload a CV and (optionally) a job description. Talks to the stores directly. */
export function UploadPanel() {
  const file = useCvStore(selectCvFile);
  const isParsing = useCvStore(selectIsParsing);
  const errorMessage = useCvStore(selectCvError);
  const jobDescription = useCvStore(selectJobDescription);
  const setJobDescription = useCvStore((state) => state.setJobDescription);
  const hasReport = useAnalysisStore(selectHasReport);
  const { checkFile, recheck, startOver } = useCvCheck();

  return (
    <Panel title="Upload CV" subtitle="Skor keluar otomatis setelah file terbaca.">
      <FileDropzone accept={ACCEPTED_FILE_TYPES} disabled={isParsing} onFileSelected={checkFile} />

      {file && (
        <FileRow>
          <DescriptionOutlinedIcon color="primary" fontSize="small" />
          <FileName title={file.name}>{file.name}</FileName>
          <Typography variant="body2" color="text.secondary">
            {formatFileSize(file.sizeBytes)}
          </Typography>
        </FileRow>
      )}

      {isParsing && (
        <div>
          <LinearProgress aria-label="Membaca CV" />
          <Typography variant="body2" color="text.secondary" mt={1}>
            Membaca isi CV…
          </Typography>
        </div>
      )}

      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <TextField
        id="job-description"
        label="Job description (opsional)"
        placeholder="Tempel deskripsi lowongan di sini untuk cek kecocokan keyword"
        multiline
        minRows={4}
        maxRows={10}
        value={jobDescription}
        onChange={(event) => setJobDescription(event.target.value)}
      />

      <Actions>
        <Button variant="contained" onClick={recheck} disabled={!hasReport || isParsing}>
          Cek ulang dengan job description
        </Button>
        {file && (
          <Button variant="text" onClick={startOver} disabled={isParsing}>
            Mulai dari awal
          </Button>
        )}
      </Actions>
    </Panel>
  );
}
