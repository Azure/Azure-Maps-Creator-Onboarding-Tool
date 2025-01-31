import { css } from '@emotion/css';
import { color, fontSize, fontWeight } from 'common/styles';

export const barStyle = css`
  background: ${color.accent.primary};
  color: white;
  height: 2.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 0px 0.625rem ${color.shadow};
`;

export const deprecationBarStyle = css`
  background: #efd9fd;
  color: red;
  height: 2rem;
  border-radius: 0.625rem;
  margin: 0.625rem;
  padding: 0.125rem;
  padding-left: 2rem;
  padding-right: 2rem;
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const deprecationTextStyle = css`
  font-size: ${fontSize.xl};
`;

export const deprecationLinkStyle = css`
  color: red;
`;

export const msftAzureTextStyle = css`
  font-weight: ${fontWeight.semibold};
  font-size: ${fontSize.lg};
  margin: 0 1.25rem;
`;

export const splitterStyle = css`
  width: 1px;
  height: 1.25rem;
  background: white;
`;

export const azMapsCreatorTextStyle = css`
  font-size: ${fontSize.md};
  margin: 0 1.25rem;
`;

export const logoContainer = css`
  display: flex;
  align-items: center;
`;

export const docLink = css`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const linksContainer = css`
  display: flex;
  gap: 1rem;
  margin-right: 1.25rem;
`;
