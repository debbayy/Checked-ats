import type { CvStore } from './cv.types';

export const selectCvFile = (state: CvStore) => state.file;
export const selectCvText = (state: CvStore) => state.parsed?.text ?? '';
export const selectCvStatus = (state: CvStore) => state.status;
export const selectCvError = (state: CvStore) => state.errorMessage;
export const selectJobDescription = (state: CvStore) => state.jobDescription;
export const selectIsParsing = (state: CvStore) => state.status === 'parsing';
