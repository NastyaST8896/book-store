import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch,RootState, RootDispatch } from './store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppRootDispatch = useDispatch.withTypes<RootDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>();
