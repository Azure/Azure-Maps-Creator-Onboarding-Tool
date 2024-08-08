import React, { useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { PrimaryButton } from '@fluentui/react';

export const DownloadEditsButton = ({ imdfPackageLocation, units, levels, footprint }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateZip = () => {
    setIsLoading(true);
    fetch(imdfPackageLocation)
      .then(response => response.arrayBuffer())
      .then(data => {
        const zip = new JSZip();
        return zip.loadAsync(data);
      })
      .then(zip => {
        zip.file('unit.geojson', JSON.stringify(units, null, 2));
        zip.file('level.geojson', JSON.stringify(levels, null, 2));
        zip.file('footprint.geojson', JSON.stringify(footprint, null, 2));
        return zip.generateAsync({ type: 'blob' });
      })
      .then(updatedZip => {
        saveAs(updatedZip, 'updated_imdf_package.zip');
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <div style={{ cursor: isLoading ? 'wait' : 'default' }}>
      <PrimaryButton onClick={handleUpdateZip} disabled={isLoading}>
        {isLoading ? 'Downloading..' : 'Download Updated IMDF'}
      </PrimaryButton>
    </div>
  );
};