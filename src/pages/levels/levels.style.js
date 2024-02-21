import { css } from '@emotion/css';

import { color, fontSize } from 'common/styles';

export const fileContainer = css`
  max-width: 45rem;
  border-bottom: 1px solid ${color.darkGray};
  padding-top: 1.25rem;
  &:first-child {
    padding-top: 0;
  }
  &:last-child {
    border-bottom: none;
  }
`;

export const fieldsRow = css`
  display: flex;
  margin-bottom: 1.25rem;
  align-items: flex-start;
`;

export const fieldLabel = css`
  width: 15.625rem;
  display: flex;
`;

export const inputClass = css`
  width: 100%;
  max-width: 30rem;
`;

export const dropdownInputClass = css`
  width: 100%;
  max-width: 30rem;
`;

export const inputStyles = {
  fieldGroup: [{ height: '1.5rem' }],
  field: [{ fontSize: fontSize.sm }],
};

export const readOnlyInput = {
  fieldGroup: [{ height: '1.5rem', borderColor: `${color.grayBorder}` }],
  field: [{ fontSize: fontSize.sm }],
};
