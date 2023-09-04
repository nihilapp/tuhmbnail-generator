import React, {
  ChangeEvent, useCallback, useMemo, useState
} from 'react';
import tw, { css } from 'twin.macro';
import { useAppDispatch } from '@/hooks/rtk';
import { setBgColor, setTextColor } from '@/redux';

interface Props {
  align?: ('horizontal' | 'vertical');
  type?: ('text' | 'background');
}

export function ColorSlider({ align = 'vertical', type = 'background', }: Props) {
  const [ red, setRed, ] = useState(50);
  const [ green, setGreen, ] = useState(50);
  const [ blue, setBlue, ] = useState(50);

  const dispatch = useAppDispatch();

  const onChangeRed = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setRed(+event.target.value);
      setColor([ +event.target.value, green, blue, ]);
    },
    [ green, blue, ]
  );

  const onChangeGreen = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setGreen(+event.target.value);
      setColor([ red, +event.target.value, blue, ]);
    },
    [ red, blue, ]
  );

  const onChangeBlue = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setBlue(+event.target.value);
      setColor([ red, green, +event.target.value, ]);
    },
    [ red, green, ]
  );

  function convertHex(number: number) {
    const hex = number.toString(16).toUpperCase();

    return hex.length > 1
      ? hex
      : `0${hex}`;
  }

  function setColor(colors: number[]) {
    const hex = colors.map((color) => convertHex(color));

    if (type === 'background') {
      dispatch(setBgColor({
        value: `#${hex.join('')}`,
      }));
    } else {
      dispatch(setTextColor({
        value: `#${hex.join('')}`,
      }));
    }
  }

  const hexCode = useMemo(() => {
    const hex = [ red, green, blue, ]
      .map((color) => convertHex(color));

    return `#${hex.join('')}`;
  }, [ red, green, blue, ]);

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
        background-color: ${hexCode};
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
              value={red}
              onChange={onChangeRed}
              css={style.slider}
            />
            <span>{red}</span>
          </div>
          <div>
            <input
              type='range'
              min={0}
              max={255}
              value={green}
              onChange={onChangeGreen}
              css={style.slider}
            />
            <span>{green}</span>
          </div>
          <div>
            <input
              type='range'
              min={0}
              max={255}
              value={blue}
              onChange={onChangeBlue}
              css={style.slider}
            />
            <span>{blue}</span>
          </div>
        </div>
        <div css={style.colorView} />
      </div>
    </>
  );
}
