import React from 'react';
import tw, { css } from 'twin.macro';

export function BackgroundConfig() {
  const style = {
    colors: tw` flex mt-10 `,
    colorTab: css([
      tw` [&[data-selected="true"]]:( p-3 flex-1 shrink-0 border border-black-300 border-b-0 bg-white text-black-base text-center ) `,
      tw` [&[data-selected="false"]]:( p-3 flex-1 shrink-0 border border-black-300 border-b-0 bg-black-300 text-black-600 text-center ) `,
    ]),
    colorTabBottom: css([
      tw` border border-black-300 border-t-0 p-3 bg-white mb-10 `,
    ]),
  };

  return (
    <>
      <div css={style.colors}>
        <button css={style.colorTab} data-type='color'>단색 배경</button>
        <button css={style.colorTab} data-type='image'>이미지 배경</button>
      </div>

      <div css={style.colorTabBottom}>
        <input type='range' min={0} max={255} defaultValue={50} id='hex-red' />
        <input type='range' min={0} max={255} defaultValue={50} id='hex-blue' />
        <input type='range' min={0} max={255} defaultValue={50} id='hex-green' />
      </div>

      <div css={style.colorTabBottom}>
        <input type='text' id='image-src' placeholder='이미지 주소를 입력하세요' />
      </div>
    </>
  );
}
