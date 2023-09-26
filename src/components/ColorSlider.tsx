import React, {
  ChangeEvent, useCallback, useEffect, useMemo
} from 'react';
import tw, { css } from 'twin.macro';
import { useAppDispatch, useAppSelector } from '@/hooks/rtk';
import { setBgColor, setTextColor } from '@/redux';

interface Props {
  align?: ('horizontal' | 'vertical');
  type?: ('text' | 'background');
}

export function ColorSlider({ align = 'vertical', type = 'background', }: Props) {
  const { textColor, bgColor, } = useAppSelector(
    (state) => state.app
  );

  const color = useMemo(() => {
    return type === 'text'
      ? textColor
      : bgColor;
  }, [ textColor, bgColor, ]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setColor([ color.red, color.green, color.blue, ]);
  }, []);

  const onChangeRed = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setColor([ +event.target.value, color.green, color.blue, ]);
    },
    [ color.green, color.blue, ]
  );

  const onChangeGreen = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setColor([ color.red, +event.target.value, color.blue, ]);
    },
    [ color.red, color.blue, ]
  );

  const onChangeBlue = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setColor([ color.red, color.green, +event.target.value, ]);
    },
    [ color.red, color.green, ]
  );

  function setColor(colors: number[]) {
    if (type === 'background') {
      dispatch(setBgColor({
        value: {
          red: colors[0],
          green: colors[1],
          blue: colors[2],
        },
      }));
    } else {
      dispatch(setTextColor({
        value: {
          red: colors[0],
          green: colors[1],
          blue: colors[2],
        },
      }));
    }
  }

  const style = {
    container: css([
      align === 'vertical' && tw` flex w-full `,
      align === 'horizontal' && tw` flex flex-col gap-2 w-full `,
    ]),
    colorSliders: css([
      align === 'vertical' && tw` flex flex-col justify-between flex-1 shrink-0 `,
      align === 'horizontal' && tw` order-2 flex flex-row `,
      tw` [>div]:( flex flex-row items-center flex-1 shrink-0 ) `,
      tw` [span]:( shrink-0 basis-[100px] text-center font-black text-black-base text-big ) `,
    ]),
    slider: css([
      tw` appearance-none bg-black-100 outline-none h-10 flex-1 shrink-0 overflow-hidden `,
      tw` [&::-webkit-slider-thumb]:( appearance-none w-10 aspect-square bg-blue-500 cursor-pointer shadow-[-520px_0_0_500px] shadow-blue-300 ) `,
    ]),
    colorView: css([
      (css`
        background-color: rgb(${color.red}, ${color.green}, ${color.blue});
      `),
      align === 'vertical' && tw` w-[150px] aspect-square border-2 border-[black] `,
      align === 'horizontal' && tw` w-full h-20 border-2 border-[black] order-1 `,
    ]),
  };

  return (
    <>
      <div css={style.container}>
        <div css={style.colorSliders}>
          <div>
            <input
              type='range'
              min={0}
              max={255}
              value={color.red}
              onChange={onChangeRed}
              css={style.slider}
            />
            <span>{color.red}</span>
          </div>
          <div>
            <input
              type='range'
              min={0}
              max={255}
              value={color.green}
              onChange={onChangeGreen}
              css={style.slider}
            />
            <span>{color.green}</span>
          </div>
          <div>
            <input
              type='range'
              min={0}
              max={255}
              value={color.blue}
              onChange={onChangeBlue}
              css={style.slider}
            />
            <span>{color.blue}</span>
          </div>
        </div>
        <div css={style.colorView} />
      </div>
    </>
  );
}
