import React, { ChangeEvent, useCallback } from 'react';
import tw, { css } from 'twin.macro';
import { useAppDispatch, useAppSelector } from '@/hooks/rtk';
import { setSubTitle, setTitle } from '@/redux';

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

  // const [ title, setTitle, ] = useState('제목을 입력하세요.');
  // const [ subTitle, setSubTitle, ] = useState('부제');

  // const onChangeTitle = useCallback(
  //   (event: ChangeEvent<HTMLInputElement>) => {
  //     setTitle(event.target.value);
  //   },
  //   []
  // );

  // const onChangeSubTitle = useCallback(
  //   (event: ChangeEvent<HTMLInputElement>) => {
  //     setSubTitle(event.target.value);
  //   },
  //   []
  // );

  const style = {
    inputs: css([
      tw` space-y-2 `,
    ]),
    input: css([
      tw` flex flex-col gap-1 `,
      tw` [span]:( font-semibold text-normal text-black-base ) `,
      tw` [input]:( p-2 outline-none text-normal bg-black-100 text-black-base placeholder:text-black-300 border-b-[2px] border-transparent transition-colors duration-200 ) `,
      tw` [input]:( focus:( border-blue-500 ) ) `,
    ]),
  };

  return (
    <>
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
      </div>
    </>
  );
}
