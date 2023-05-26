import { useCallback, useState, useEffect } from 'react';
import { cx } from '@emotion/css';
import { shallow } from 'zustand/shallow';
import { useTranslation } from 'react-i18next';

import { selectedStep as selectedStepStyle, step, stepTimer, stepTitle } from './style';
import Icon from './icon';
import { useConversionStore, conversionSteps } from 'common/store';
import { formatProgressTime } from './format-time';

const conversionStoreSelector = (s) => [s.uploadStepStatus, s.uploadStartTime, s.uploadEndTime, s.setStep, s.selectedStep];
let intervalId = null;

const UploadButton = () => {
  const { t } = useTranslation();
  const [elapsedTime, setElapsedTime] = useState('');
  const [status, startTime, endTime, setStep, selectedStep] = useConversionStore(conversionStoreSelector, shallow);

  useEffect(() => {
    if (startTime !== null && endTime !== null) {
      setElapsedTime(formatProgressTime(startTime, endTime));
      clearInterval(intervalId);
    } else if (startTime !== null && intervalId === null) {
      intervalId = setInterval(() => {
        setElapsedTime(formatProgressTime(startTime, endTime));
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [startTime, endTime]);

  const onClick = useCallback(() => setStep(conversionSteps.upload), [setStep]);

  return (
    <button className={cx(step, { [selectedStepStyle]: selectedStep === conversionSteps.upload })} onClick={onClick}
            aria-label={t('select.upload.step')}>
      <div className={stepTitle}>
        <Icon status={status} />
        {t('package.upload')}
      </div>
      <span className={stepTimer}>{elapsedTime}</span>
    </button>
  );
};

export default UploadButton;