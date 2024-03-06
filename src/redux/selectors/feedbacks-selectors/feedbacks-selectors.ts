import { RootState } from '@redux/configure-store.ts';

export const feedbacksSelector = (state: RootState) => state.feedback.feedbacks;
export const ratingFeedbackSelector = (state: RootState) => state.feedback.rating;
export const messageFeedbackSelector = (state: RootState) => state.feedback.message;
export const isErrorFeedbackSelector = (state: RootState) => state.feedback.isError;
export const creationStatusFeedbackSelector = (state: RootState) => state.feedback.creationStatus;
