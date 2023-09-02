import React from 'react';
import tw, { css } from 'twin.macro';
import { BackgroundConfig, TextConfig, Thumbnail } from '@/components';

export default function IndexPage() {
  const style = {
    default: css([
      tw` w-[1280px] mx-auto `,
    ]),
    buttons: css([
      tw` flex gap-5 `,
      tw` [button]:( flex-1 shrink-0 bg-blue-400 text-white p-3 hover:( bg-blue-600 ) ) `,
    ]),
  };

  return (
    <>
      <div css={style.default}>
        <Thumbnail />
        <TextConfig />
        <BackgroundConfig />

        <div css={style.buttons}>
          <button>초기화</button>
          <button>이미지로 저장</button>
        </div>
      </div>
    </>
  );
}
