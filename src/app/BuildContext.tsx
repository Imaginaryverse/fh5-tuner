/* eslint-disable @typescript-eslint/no-empty-function */
import { useContext } from 'react';
import { BuildContext } from './BuildProvider';

export const useBuild = () => useContext(BuildContext);
