import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ProgressIndicator } from '@fluentui/react/lib/ProgressIndicator';
import { shallow } from 'zustand/shallow';

import { containerStyle, progressIndicatorLabel, progressIndicatorStyles } from './processing.style';
import { PATHS } from 'common';
import { useResponseStore, useUserStore } from 'common/store';
import { LRO_STATUS } from 'common/store/response.store';

export const API_REQUEST_INTERVAL = 10; // in seconds
export const PAGE_REFRESH_INTERVAL = 1;

const LABEL = {
  UPLOADING: 'processing.label.uploading',
  RUNNING: 'processing.label.processing',
};

const responseStoreSelector = (s) => [s.errorMessage, s.lroStatus, s.refreshStatus];
const subKeySelector = (s) => s.subscriptionKey;

const ProcessingPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [lastUpdated, setLastUpdated] = useState(0);
  const [label, setLabel] = useState();

  const subscriptionKey = useUserStore(subKeySelector);
  const [errorMessage, lroStatus, refreshStatus] = useResponseStore(responseStoreSelector, shallow);

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated((seconds) => (seconds + PAGE_REFRESH_INTERVAL) % API_REQUEST_INTERVAL);
    }, PAGE_REFRESH_INTERVAL * 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (lastUpdated !== API_REQUEST_INTERVAL - 1) return;
    refreshStatus(subscriptionKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- we only care about lastUpdated
  }, [lastUpdated]);

  useEffect(() => {
    switch (lroStatus) {
      case LRO_STATUS.UPLOADING:
        setLabel(LABEL.UPLOADING);
        break;
      case LRO_STATUS.UPLOADED:
      case LRO_STATUS.ACCEPTED:
      case LRO_STATUS.RUNNING:
      case LRO_STATUS.FETCHING_DATA:
        setLabel(LABEL.RUNNING);
        break;
      case LRO_STATUS.SUCCEEDED:
        navigate(PATHS.LEVELS);
        break;
      default:
        navigate(PATHS.INDEX);
        break;
    }

    setLastUpdated(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lroStatus]);

  useEffect(() => {
    if (errorMessage === '') {
      return;
    }
    navigate(PATHS.INDEX);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMessage]);

  return (
    <div className={containerStyle}>
      <ProgressIndicator label={t(label)} className={progressIndicatorStyles} styles={progressIndicatorLabel}
                         description={t('processing.last.checked', { seconds: lastUpdated })} />
    </div>
  );
};

export default ProcessingPage;