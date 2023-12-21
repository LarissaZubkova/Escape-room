import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { QuestProcess } from '../../types/state';
import { fetchQuestByIdAction } from '../api-actions';

const initialState: QuestProcess = {
  questCard: null,
  isQuestCardLoading: false,
  hasQuestCardError: false,
};

export const questProcess = createSlice({
  name: NameSpace.Quest,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchQuestByIdAction.pending, (state) => {
        state.isQuestCardLoading = true;
        state.hasQuestCardError = false;
      })
      .addCase(fetchQuestByIdAction.fulfilled, (state, action) => {
        state.questCard = action.payload;
        state.isQuestCardLoading = false;
        state.hasQuestCardError = false;
      })
      .addCase(fetchQuestByIdAction.rejected, (state) => {
        state.hasQuestCardError = true;
        state.isQuestCardLoading = false;
      });
  }
});
