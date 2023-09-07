import React, { useCallback } from 'react';
import tw, { css } from 'twin.macro';
import { useAppDispatch, useAppSelector } from '@/hooks/rtk';
import { setBgType } from '@/redux';
import { ColorSlider } from '.';

export function BackgroundConfig() {
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

  const style = {
    colors: tw` flex mt-10 border border-b-0 border-black-200 divide-x divide-black-200 `,
    bgTypeTab: (type: string) => {
      return css([
        tw` p-3 flex-1 shrink-0 `,
        bgType === type
          ? tw` bg-white text-black-base `
          : tw` bg-black-200 text-black-400 `,
      ]);
    },
    tabBottom: css([
      tw` flex flex-row border border-black-200 border-t-0 p-5 bg-white mb-10 `,
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
          {/* <input type='text' id='image-src' placeholder='이미지 주소를 입력하세요' /> */}
        </div>
      )}
    </>
  );
}
