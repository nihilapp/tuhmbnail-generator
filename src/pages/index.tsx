import React, { ChangeEvent, useCallback, useState } from 'react';
import tw, { css } from 'twin.macro';

export default function IndexPage() {
  const [ title, setTitle, ] = useState('제목을 입력하세요.');
  const [ subTitle, setSubTitle, ] = useState('부제');

  const onChangeTitle = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setTitle(event.target.value);
    },
    []
  );

  const onChangeSubTitle = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSubTitle(event.target.value);
    },
    []
  );

  const style = {
    default: css([
      tw` w-[1280px] mx-auto `,
    ]),
    frame: css([
      tw` box-content border border-black-base aspect-video mb-10 relative `,
    ]),
    inputs: css([
      tw` space-y-2 `,
    ]),
    input: css([
      tw` flex flex-col gap-1 `,
      tw` [span]:( font-semibold text-normal text-black-base ) `,
      tw` [input]:( p-2 outline-none text-normal bg-black-100 text-black-base placeholder:text-black-300 border-b-[2px] border-transparent transition-colors duration-200 ) `,
      tw` [input]:( focus:( border-blue-500 ) ) `,
    ]),
    colors: tw` flex mt-10 `,
    colorTab: css([
      tw` [&[data-selected="true"]]:( p-3 flex-1 shrink-0 border border-black-300 border-b-0 bg-white text-black-base text-center ) `,
      tw` [&[data-selected="false"]]:( p-3 flex-1 shrink-0 border border-black-300 border-b-0 bg-black-300 text-black-600 text-center ) `,
    ]),
    colorTabBottom: css([
      tw` border border-black-300 border-t-0 p-3 bg-white mb-10 `,
    ]),
    buttons: css([
      tw` flex gap-5 `,
      tw` [button]:( flex-1 shrink-0 bg-blue-400 text-white p-3 hover:( bg-blue-600 ) ) `,
    ]),
    titles: css([
      tw` absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] text-center w-full `,
    ]),
    title: css([
      tw` text-[4rem] font-black whitespace-pre-line `,
    ]),
    subTitle: css([
      tw` text-[3rem] font-semibold `,
    ]),
  };

  return (
    <>
      <div css={style.default}>
        <div id='th-frame' css={style.frame}>
          <div id='th-titles' css={style.titles}>
            <h1 id='th-title' css={style.title}>
              {title.split('\\n').map((item, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <React.Fragment key={`${item}-${index}`}>{item}<br /></React.Fragment>
              ))}
            </h1>
            <h2 id='th-sub-title' css={style.subTitle}>{subTitle}</h2>
          </div>
        </div>

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

        <div css={style.colors}>
          <button css={style.colorTab} data-selected='true'>단색 배경</button>
          <button css={style.colorTab} data-selected='false'>이미지 배경</button>
        </div>

        <div css={style.colorTabBottom}>
          <input type='range' min={0} max={255} defaultValue={50} id='hex-red' />
          <input type='range' min={0} max={255} defaultValue={50} id='hex-blue' />
          <input type='range' min={0} max={255} defaultValue={50} id='hex-green' />
        </div>

        <div css={style.colorTabBottom}>
          <input type='text' id='image-src' placeholder='이미지 주소를 입력하세요' css={style.input} />
        </div>

        <div css={style.buttons}>
          <button>초기화</button>
          <button>이미지로 저장</button>
        </div>
      </div>
    </>
  );
}
