import * as React from 'react';
import { createElement } from 'react';
import { ResponsiveGrid } from '@alifd/next';
import type { CellProps } from '@alifd/next/types/responsive-grid';

export interface FlexBlockCellProps extends CellProps {
}

const FlexBlockCell: React.FC<FlexBlockCellProps> = ({...otherProps}) => (
  <ResponsiveGrid.Cell { ...otherProps } />
);

FlexBlockCell.displayName = 'FlexBlockCell';

export default FlexBlockCell;
