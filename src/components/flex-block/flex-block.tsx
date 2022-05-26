import * as React from 'react';
import { createElement } from 'react';
import { ResponsiveGrid } from '@alifd/next';
import './index.scss';
import type { ResponsiveGridProps } from '@alifd/next/types/responsive-grid';

export interface FlexBlockProps extends ResponsiveGridProps {
}

const FlexBlock: React.FC<FlexBlockProps> = ({...otherProps}) => (
  <ResponsiveGrid { ...otherProps } />
);

FlexBlock.displayName = 'FlexBlock';

export default FlexBlock;
