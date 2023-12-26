import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { MyQuestsProcess } from '../../types/state';
import { fetchDeleteMyQuestAction, fetchMyQuestsAction } from '../api-actions';

const initialState: MyQuestsProcess = {
  myQuests: [],
  isMyQuestsLoading: false,
  hasMyQuestsError: false,
  hasDeleteMyQuestError: false,
  isDeleting: false,
};

export const myQuestProcess = createSlice({
  name: NameSpace.Quest,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMyQuestsAction.pending, (state) => {
        state.isMyQuestsLoading = true;
        state.hasMyQuestsError = false;
      })
      .addCase(fetchMyQuestsAction.fulfilled, (state, action) => {
        state.myQuests = action.payload;
        state.isMyQuestsLoading = false;
        state.hasMyQuestsError = false;
      })
      .addCase(fetchDeleteMyQuestAction.pending, (state) => {
        state.hasDeleteMyQuestError = false;
        state.isDeleting = true;
      })
      .addCase(fetchDeleteMyQuestAction.fulfilled, (state) => {
        state.hasDeleteMyQuestError = false;
        state.isDeleting = false;
      })
      .addCase(fetchDeleteMyQuestAction.rejected, (state) => {
        state.hasDeleteMyQuestError = true;
        state.isDeleting = false;
      });
  }
});
