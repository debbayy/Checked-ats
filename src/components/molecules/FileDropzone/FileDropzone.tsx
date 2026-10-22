'use client';

import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import Typography from '@mui/material/Typography';
import { useState, type ChangeEvent, type DragEvent } from 'react';
import { DropArea, DropIcon, HiddenInput } from './FileDropzone.styles';

export interface FileDropzoneProps {
  accept: string;
  disabled?: boolean;
  onFileSelected: (file: File) => void;
}

/** Click or drag-and-drop to pick a single file. */
export function FileDropzone({ accept, disabled = false, onFileSelected }: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) onFileSelected(file);
    // Allow picking the same file again after fixing it.
    event.target.value = '';
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    const file = event.dataTransfer.files[0];
    if (file) onFileSelected(file);
  };

  return (
    <DropArea
      htmlFor="cv-file-input"
      isDragging={isDragging}
      isDisabled={disabled}
      onDragOver={(event) => {
        event.preventDefault();
        if (!disabled) setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <HiddenInput
        id="cv-file-input"
        type="file"
        accept={accept}
        disabled={disabled}
        onChange={handleChange}
        aria-label="Pilih file CV"
      />
      <DropIcon>
        <UploadFileRoundedIcon />
      </DropIcon>
      <Typography variant="h3" component="p">
        Tarik CV ke sini atau klik untuk pilih file
      </Typography>
      <Typography variant="body2" color="text.secondary">
        PDF atau DOCX, maksimal 10 MB. File cuma dibaca di browser kamu.
      </Typography>
    </DropArea>
  );
}
