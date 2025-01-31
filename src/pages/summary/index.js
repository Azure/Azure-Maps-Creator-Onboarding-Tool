import { cx } from '@emotion/css';
import { MessageBar, MessageBarType } from '@fluentui/react';
import { languages } from 'common/languages';
import { useGeometryStore, useLayersStore, useLevelsStore, useReviewManifestStore } from 'common/store';
import { useValidationStatus } from 'common/store/progress-bar-steps.store';
import { color } from 'common/styles';
import { ColumnLayout, ColumnLayoutItem } from 'components/column-layout';
import CheckedMap from 'pages/georeference/checked-map';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import DownloadConfigButton from './DownloadConfigButton';
import {
  entryCell,
  layerPill,
  noBorder,
  sectionTitle,
  summaryEntry,
  summaryEntryTitle,
  summaryMap,
  summaryMapWrapper,
  summaryPanel,
} from './summary.style';

const reviewManifestSelector = s => s.setManifestReviewed;
const levelsSelector = s => [s.levels, s.facilityName, s.language];
const geometryStoreSelector = s => [s.dwgLayers];
const layersSelector = s => [s.layers, s.categoryLayer, s.categoryMapping.categoryMap];

const SummaryEntry = props => {
  const { title, children } = props;

  return (
    <div className={summaryEntry}>
      <span className={summaryEntryTitle}>{title}</span>
      <span className={entryCell}>{children}</span>
    </div>
  );
};

const SummaryTab = () => {
  const { t } = useTranslation();
  const setManifestReviewed = useReviewManifestStore(reviewManifestSelector);
  const [levels, facilityName, language] = useLevelsStore(levelsSelector);
  const [dwgLayers] = useGeometryStore(geometryStoreSelector);
  const [layers, categoryLayer, categoryMap] = useLayersStore(layersSelector);
  const { success } = useValidationStatus();

  const mappingCount = useMemo(() => Object.keys(categoryMap).length, [categoryMap]);

  const { props, value } = layers[0] || {};

  useEffect(() => {
    setManifestReviewed(true);
  }, [setManifestReviewed]);

  if (!success) return null;

  return (
    <ColumnLayout>
      <ColumnLayoutItem>
        <div className={summaryPanel}>
          <div className={sectionTitle}>{t('building.levels')}</div>
          <SummaryEntry title={t('language')}>{languages[language]}</SummaryEntry>
          <SummaryEntry title={t('building.name')}>{facilityName}</SummaryEntry>
          <table style={{ marginTop: '1rem' }}>
            <tbody>
              <tr>
                <th className={entryCell} style={{ fontWeight: 500 }}>
                  Filename
                </th>
                <th className={entryCell} style={{ fontWeight: 500 }}>
                  Ordinal
                </th>
                <th className={entryCell} style={{ fontWeight: 500 }}>
                  Name
                </th>
              </tr>
              {levels.map((level, id) => (
                <tr key={`${level.filename}${id}`}>
                  <td className={entryCell}>{level.filename}</td>
                  <td className={entryCell}>{level.ordinal}</td>
                  <td className={entryCell}>{level.levelName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={summaryPanel}>
          <div className={sectionTitle}>{t('georeference')}</div>
          <SummaryEntry title={t('footprint')}>
            {dwgLayers.map(layer => (
              <span key={layer} className={layerPill}>
                {layer}
              </span>
            ))}
          </SummaryEntry>
        </div>
        <div className={summaryPanel}>
          <div className={sectionTitle}>{t('dwg.units')}</div>

          <SummaryEntry title={t('unit.feature.layers')}>
            {value.map(layer => (
              <span key={layer} className={layerPill}>
                {layer}
              </span>
            ))}
          </SummaryEntry>
          <SummaryEntry title={t('unit.name.layers')}>
            {props[0]?.value?.map(layer => (
              <span key={layer} className={layerPill}>
                {layer}
              </span>
            ))}
          </SummaryEntry>
          <SummaryEntry title={t('unit.category.layer')}>
            {categoryLayer && <span className={layerPill}>{categoryLayer}</span>}
          </SummaryEntry>
          <SummaryEntry title={t('category.mapping.file')}>
            <i style={{ color: color.granite }}>{`${mappingCount} entries mapped`}</i>
          </SummaryEntry>
        </div>
        <div className={cx(summaryPanel, noBorder)} style={{ maxWidth: '40rem' }}>
          <MessageBar messageBarType={MessageBarType.info} isMultiline>
            You can download the configuration file, which allows you to continue the conversion process at a later
            time. Everthing you have configured so far will be saved in the configuration file.
          </MessageBar>
          <DownloadConfigButton style={{ marginTop: '1rem' }} />
        </div>
      </ColumnLayoutItem>
      <div className={summaryMapWrapper}>
        <div className={sectionTitle}>Map Preview</div>
        <CheckedMap className={summaryMap} readOnly />
      </div>
    </ColumnLayout>
  );
};

export default SummaryTab;
