import React from 'react';
import tw, { css } from 'twin.macro';

export default function index() {
  const style = {
    default: css([
      tw` w-[1280px] mx-auto `,
    ]),
    frame: css([
      tw` box-content border border-black-base aspect-video mb-10 `,
    ]),
    input: css([
      tw` p-2 text-normal text-blue-600 placeholder:text-blue-400 block bg-blue-50 w-full border border-blue-500 `,
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
  };

  return (
    <>
      <div css={style.default}>
        <div css={style.frame} />
        <input type='text' id='title' placeholder='제목' css={style.input} />
        <input type='text' id='sub-title' placeholder='부제' css={style.input} />

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
