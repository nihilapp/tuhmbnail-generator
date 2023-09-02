import React from 'react';
import tw, { css } from 'twin.macro';
import { useAppSelector } from '@/hooks/rtk';

export function Thumbnail() {
  const { title, subTitle, } = useAppSelector((state) => state.app);

  const style = {
    frame: css([
      tw` box-content border border-black-base aspect-video mb-10 relative `,
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
    </>
  );
}
