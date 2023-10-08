import React from 'react';
import tw, { css } from 'twin.macro';
import {
  BackgroundConfig, TextConfig, Thumbnail
} from '@/components';

export default function IndexPage() {
  const style = {
    default: css([
      tw` w-[1280px] mx-auto `,
    ]),
  };

  return (
    <>
      <div css={style.default}>
        <Thumbnail />
        <TextConfig />
        <BackgroundConfig />
      </div>
    </>
  );
}
