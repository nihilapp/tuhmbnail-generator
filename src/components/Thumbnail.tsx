import React, {
  useCallback, useEffect, useRef, useState
} from 'react';
import tw, { css } from 'twin.macro';
import html2canvas from 'html2canvas';
import { useAppDispatch, useAppSelector } from '@/hooks/rtk';
import { initState } from '@/redux';

export function Thumbnail() {
  const [ isClick, setIsClick, ] = useState(false);

  const thRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const {
    title, subTitle, bgType, imgSrc, bgColor, textColor, imageY,
  } = useAppSelector(
    (state) => state.app
  );

  useEffect(() => {
    dispatch(initState());
  }, []);

  const onClickReset = useCallback(
    () => {
      dispatch(initState());
    },
    []
  );

  const onClickDownload = useCallback(
    () => {
      const bodyWidth = document.documentElement.clientWidth;
      const thRefWidth = thRef.current.clientWidth;

      let formula: number;

      if (thRefWidth < bodyWidth) {
        formula = (bodyWidth - thRefWidth) / 2;
      }

      window.scrollTo(0, 0);

      html2canvas(thRef.current, {
        allowTaint: true,
        useCORS: true,
        foreignObjectRendering: true,
        x: thRefWidth < bodyWidth ? -formula : 0,
        backgroundColor: `rgb(${bgColor.red}, ${bgColor.green}, ${bgColor.blue})`,
        logging: true,
      }).then((canvas) => {
        const img = document.createElement('img');
        img.src = canvas.toDataURL('image/png');
        img.style.display = 'block';

        imageRef.current.innerHTML = '';
        imageRef.current.appendChild(img);
      });

      setIsClick(true);
    },
    [ thRef, imageRef, bgColor, ]
  );

  const onClickClose = useCallback(
    () => {
      setIsClick(false);
    },
    []
  );

  const style = {
    container: css([
      tw` mb-5 overflow-hidden w-[1280px] h-[720px] `,
    ]),
    frame: css([
      tw` w-[inherit] h-[inherit] relative overflow-auto `,
      (css`
        color: rgb(${textColor.red}, ${textColor.green}, ${textColor.blue});
      `),
      bgType === 'color' && (css`
        background-color: rgb(${bgColor.red}, ${bgColor.green}, ${bgColor.blue});
      `),
      bgType === 'image' && (css`
        background-image: url(${imgSrc});
        background-size: cover;
        /* background-position-y: -220px; */
        background-position-y: -${imageY}px;
      `),
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
    buttons: css([
      tw` flex gap-5 mb-10 `,
      tw` [button]:( flex-1 shrink-0 bg-blue-400 text-white p-3 hover:( bg-blue-600 ) disabled:(
        bg-black-300 cursor-not-allowed
      ) ) `,
    ]),
    image: css([
      tw` fixed m-0 p-0 left-0 top-0 z-10 bg-black-base/80 w-screen h-screen flex items-center justify-center `,
    ]),
  };

  return (
    <>
      {isClick && (
        <div css={style.image} ref={imageRef} onClick={onClickClose} />
      )}

      <div id='th-container' css={style.container} ref={thRef}>
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
      </div>

      <div css={style.buttons}>
        <button onClick={onClickReset}>초기화</button>
        <button onClick={onClickDownload}>이미지로 저장</button>
      </div>
    </>
  );
}
