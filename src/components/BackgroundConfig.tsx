import React, {
  ChangeEvent, useCallback, useState
} from 'react';
import tw, { css } from 'twin.macro';
import { useAppDispatch, useAppSelector } from '@/hooks/rtk';
import { setBgType, setImg } from '@/redux';
import { ColorSlider } from '.';

export function BackgroundConfig() {
  const [ srcValue, setSrcValue, ] = useState('');

  const bgType = useAppSelector(
    (state) => state.app.bgType
  );
  const dispatch = useAppDispatch();

  const onClickColor = useCallback(
    () => {
      dispatch(setBgType({
        value: 'color',
      }));
    },
    []
  );

  const onClickImage = useCallback(
    () => {
      dispatch(setBgType({
        value: 'image',
      }));
    },
    []
  );

  const onChangeSrc = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSrcValue(event.target.value);
      dispatch(setImg({
        value: event.target.value,
      }));
    },
    []
  );

  const style = {
    colors: tw` flex mt-10 `,
    bgTypeTab: (type: string) => {
      return css([
        tw` p-3 flex-1 shrink-0 text-h2 font-black border-2 border-b-0 `,
        bgType === type
          ? tw` bg-black-600 text-white border-black-600 `
          : tw` bg-black-200 text-black-400 border-black-200 `,
      ]);
    },
    tabBottom: css([
      tw` flex flex-row border-2 border-black-600 p-5 bg-white mb-10 `,
    ]),
    input: css([
      tw` flex flex-col gap-1 w-full `,
      tw` [span]:( font-semibold text-normal text-black-base ) `,
      tw` [input]:( p-2 outline-none text-normal bg-black-100 text-black-base placeholder:text-black-300 border-b-[2px] border-transparent transition-colors duration-200 ) `,
      tw` [input]:( focus:( border-blue-500 ) ) `,
    ]),
  };

  return (
    <>
      <div css={style.colors}>
        <button css={style.bgTypeTab('color')} onClick={onClickColor}>단색 배경</button>
        <button css={style.bgTypeTab('image')} onClick={onClickImage}>이미지 배경</button>
      </div>

      {bgType === 'color' && (
        <div css={style.tabBottom}>
          <ColorSlider type='background' align='vertical' />
        </div>
      )}

      {bgType === 'image' && (
        <div css={style.tabBottom}>
          <label htmlFor='image-src' css={style.input}>
            <span>이미지 주소</span>
            <input
              type='text'
              id='image-src'
              placeholder='이미지 주소를 입력하세요'
              value={srcValue}
              onChange={onChangeSrc}
            />
          </label>
        </div>
      )}
    </>
  );
}
