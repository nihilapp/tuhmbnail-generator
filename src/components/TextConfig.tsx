import React, { ChangeEvent, useCallback } from 'react';
import tw, { css } from 'twin.macro';
import { useAppDispatch, useAppSelector } from '@/hooks/rtk';
import { setSubTitle, setTitle } from '@/redux';
import { ColorSlider } from '.';

export function TextConfig() {
  const { title, subTitle, } = useAppSelector(
    (state) => state.app
  );

  const dispatch = useAppDispatch();

  const onChangeTitle = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch(setTitle({
        value: event.target.value,
      }));
    },
    []
  );

  const onChangeSubTitle = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch(setSubTitle({
        value: event.target.value,
      }));
    },
    []
  );

  const style = {
    inputs: css([
      tw` space-y-2 p-5 bg-white border-2 border-t-0 border-black-600 `,
    ]),
    input: css([
      tw` flex flex-col gap-1 `,
      tw` [span]:( font-semibold text-normal text-black-base ) `,
      tw` [input]:( p-2 outline-none text-normal bg-black-100 text-black-base placeholder:text-black-300 border-b-[2px] border-transparent transition-colors duration-200 ) `,
      tw` [input]:( focus:( border-blue-500 ) ) `,
    ]),
    h2: tw` text-h2 text-white font-black p-3 bg-black-600 `,
    span: tw` font-semibold text-normal text-black-base `,
  };

  return (
    <>
      <h2 css={style.h2}>텍스트 설정</h2>
      <div css={style.inputs}>
        <label htmlFor='title' css={style.input}>
          <span>제목</span>
          <input
            type='text'
            id='title'
            placeholder='제목'
            value={title}
            onChange={onChangeTitle}
          />
        </label>
        <label htmlFor='sub-title' css={style.input}>
          <span>부제</span>
          <input
            type='text'
            id='sub-title'
            placeholder='부제'
            value={subTitle}
            onChange={onChangeSubTitle}
          />
        </label>
        <div>
          <span css={style.span}>색상</span>
          <ColorSlider type='text' />
        </div>
      </div>
    </>
  );
}
