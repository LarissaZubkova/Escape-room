import { createSlice } from '@reduxjs/toolkit';
import { QuestsProcess } from '../../types/state';
import { NameSpace } from '../../consts';
import { fetchQuestsAction } from '../api-actions';

const initialState: QuestsProcess = {
  quests: [],
  isQuestsLoading: false,
  hasQuestsError: false,
};

export const questsProcess = createSlice({
  name: NameSpace.Quests,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchQuestsAction.pending, (state) => {
        state.hasQuestsError = false;
        state.isQuestsLoading = true;
      })
      .addCase(fetchQuestsAction.fulfilled, (state, action) => {
        state.quests = action.payload;
        state.isQuestsLoading = false;
        state.hasQuestsError = false;
      })
      .addCase(fetchQuestsAction.rejected, (state) => {
        state.hasQuestsError = true;
        state.isQuestsLoading = false;
      });
  }
});
