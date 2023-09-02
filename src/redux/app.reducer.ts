import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type AppState = {
  bgType: ('color' | 'image');
  title: string;
  subTitle: string;
  textColor: string;
  bgColor: string;
  imgSrc: string;
}

const initialState: AppState = {
  bgType: 'color',
  title: '제목을 입력하세요',
  subTitle: '',
  textColor: '#ffffff',
  bgColor: '#333333',
  imgSrc: '',
};

const appReducer = createSlice({
  name: 'app',
  initialState,
  reducers: {
    initState(state) {
      state.bgType = 'color';
      state.title = '제목을 입력하세요';
      state.subTitle = '';
      state.textColor = '#ffffff';
      state.bgColor = '#333333';
      state.imgSrc = '';
    },
    setBgType(
      state,
      { payload, }: PayloadAction<{value: ('color' | 'image')}>
    ) {
      state.bgType = payload.value;
    },
    setTitle(
      state,
      { payload, }: PayloadAction<{value: string}>
    ) {
      state.title = payload.value;
    },
    setSubTitle(
      state,
      { payload, }: PayloadAction<{value: string}>
    ) {
      state.subTitle = payload.value;
    },
    setTextColor(
      state,
      { payload, }: PayloadAction<{value: string}>
    ) {
      state.textColor = payload.value;
    },
    setBgColor(
      state,
      { payload, }: PayloadAction<{value: string}>
    ) {
      state.bgColor = payload.value;
    },
    setImg(
      state,
      { payload, }: PayloadAction<{value: string}>
    ) {
      state.imgSrc = payload.value;
    },
  },
});

export const {
  initState, setBgType, setTitle, setSubTitle, setTextColor, setBgColor, setImg,
} = appReducer.actions;
export default appReducer.reducer;
