import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PageName } from '@src/application/models/enums/pageName.enum';
import { AbsoluteCommonRoutes } from '@src/application/models/enums/routes.enum';
import { RootState } from '@src/application/redux/store';
import { ReactNode } from 'react';

export type BreadcrumbMenuItem = {
    title: PageName | ReactNode;
    href?: AbsoluteCommonRoutes;
};

const initialState: BreadcrumbMenuItem[] = [
    {
        title: PageName.Home,
    },
];

export const breadcrumbSlice = createSlice({
    name: 'breadcrumb',
    initialState,
    reducers: {
        setBreadcrumb: (
            state: BreadcrumbMenuItem[],
            action: PayloadAction<BreadcrumbMenuItem[]>
        ) => {
            if (action.payload.length) {
                return [...action.payload];
            }
            return state;
        },
    },
});

export const { setBreadcrumb } = breadcrumbSlice.actions;

export const selectBreadcrumb = (state: RootState) =>
    state[breadcrumbSlice.name];
