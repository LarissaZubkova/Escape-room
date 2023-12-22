import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { MyQuestsProcess } from '../../types/state';
import { fetchMyQuestsAction } from '../api-actions';

const initialState: MyQuestsProcess = {
  myQuests: [],
  isMyQuestsLoading: false,
  hasMyQuestsError: false,
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
      .addCase(fetchMyQuestsAction.rejected, (state) => {
        state.hasMyQuestsError = true;
        state.isMyQuestsLoading = false;
      });
  }
});
