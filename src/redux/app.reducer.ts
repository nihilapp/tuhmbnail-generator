import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type Color = {
  red: number;
  green: number;
  blue: number;
}

type AppState = {
  bgType: ('color' | 'image');
  title: string;
  subTitle: string;
  textColor: Color;
  bgColor: Color;
  imgSrc: string;
  imageY: number;
}

const initialState: AppState = {
  bgType: 'color',
  title: '제목을 입력하세요',
  subTitle: '',
  textColor: {
    red: 51,
    green: 51,
    blue: 51,
  },
  bgColor: {
    red: 255,
    green: 255,
    blue: 255,
  },
  imgSrc: '',
  imageY: 0,
};

const appReducer = createSlice({
  name: 'app',
  initialState,
  reducers: {
    initState(state) {
      state.bgType = 'color';
      state.title = '제목을 입력하세요';
      state.subTitle = '';
      state.textColor = {
        red: 51,
        green: 51,
        blue: 51,
      };
      state.bgColor = {
        red: 255,
        green: 255,
        blue: 255,
      };
      state.imgSrc = '';
      state.imageY = 0;
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
      { payload, }: PayloadAction<{value: Color}>
    ) {
      state.textColor = payload.value;
    },
    setBgColor(
      state,
      { payload, }: PayloadAction<{value: Color}>
    ) {
      state.bgColor = payload.value;
    },
    setImg(
      state,
      { payload, }: PayloadAction<{value: string}>
    ) {
      state.imgSrc = payload.value;
    },
    setY(
      state,
      { payload, }: PayloadAction<{value: number}>
    ) {
      state.imageY = payload.value;
    },
  },
});

export const {
  initState, setBgType, setTitle, setSubTitle, setTextColor, setBgColor, setImg, setY,
} = appReducer.actions;
export default appReducer.reducer;
