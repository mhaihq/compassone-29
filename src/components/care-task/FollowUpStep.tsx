
import React from 'react';
import { FollowUpContainer } from './follow-up/FollowUpContainer';
import { FollowUpStepProps } from './follow-up/followUpTypes';

export const FollowUpStep: React.FC<FollowUpStepProps> = ({ taskContext }) => {
  return <FollowUpContainer taskContext={taskContext} />;
};
