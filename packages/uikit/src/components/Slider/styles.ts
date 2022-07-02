import { InputHTMLAttributes } from "react";
import styled from "styled-components";
import Text from "../Text/Text";

interface SliderLabelProps {
  progress: string;
}

interface StyledInputProps extends InputHTMLAttributes<HTMLInputElement> {
  isMax: boolean;
}

interface DisabledProp {
  disabled?: boolean;
}

const getCursorStyle = ({ disabled = false }: DisabledProp) => {
  return disabled ? "not-allowed" : "cursor";
};

const bunnyHeadMax = `"data:image/svg+xml,%3Csvg width='24' height='32' viewBox='0 0 28 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%231FC7D4' d='M1 19h17v11H1z'/%3E%3Cpath d='M1.034 24.506v-5.472H18V29.977H1.034z' fill='%2300f' fill-rule='evenodd'/%3E%3Cellipse cx='18.46' cy='23.862' rx='8.897' ry='10.023' fill='%2300f' fill-rule='evenodd'/%3E%3C/svg%3E"`;
const bunnyHeadMain = `"data:image/svg+xml,%3Csvg width='24' height='32' viewBox='0 0 28 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%231FC7D4' d='M1 19h17v11H1z'/%3E%3Cpath d='M1.034 24.506v-5.472H18V29.977H1.034z' fill='%2300f' fill-rule='evenodd'/%3E%3Cellipse cx='17.77' cy='22.874' rx='9.586' ry='10.46' fill='%2300f' fill-rule='evenodd'/%3E%3C/svg%3E"`;
const bunnyButt = `"data:image/svg+xml,%3Csvg width='15' height='32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10.121 20.791c-.18.002-.359.026-.533.072v.002c-1.86.498-1.563 3.167-.824 5.924.738 2.756 1.816 5.217 3.675 4.719 1.86-.498 2.793-3.498 2.055-6.254-.67-2.498-2.628-4.483-4.373-4.463zm2.701 8.352h.008c.138 0-.156.64.107.404.014-.012.03-.024.042-.037l.015-.037a.34.34 0 01-.012.033l-.003.004-.004.011c-.182.394-.419.76-.698 1.092-.26.31-.58.058-.32-.252.258-.306.48-.646.647-1.011.023-.076.078-.117.138-.163a.214.214 0 01.08-.044z'/%3E%3Cpath d='M1 24.452A6.452 6.452 0 017.452 18H15v10H4.548A3.548 3.548 0 011 24.452z' fill='%231FC7D4'/%3E%3Cpath d='M3.82 16.023a2.846 2.846 0 00-1.373.354c.279.017.54.17.776.3.354.196.166.551-.192.362-.292-.155-.323-.203-.625-.26-.084-.016-.238.055-.318.086-.077.03-.154.058-.23.086l-.178.065c-.707.844-.927 2.076-.397 2.996.686 1.188 1.994.766 3.244.043 1.25-.72 2.27-1.643 1.584-2.83-.45-.78-1.363-1.205-2.29-1.202zM3.543 22.955c-.759.012-1.429.237-1.897.705-1.36 1.36.23 3.525 2.249 5.543 2.018 2.018 4.181 3.61 5.543 2.248.06-.06.115-.126.167-.193a.145.145 0 01-.048-.03l-.108.022c-.226.045-.451.09-.681.11-.09.009-.272.03-.38.036-.292.018-.589 0-.876.07-.393.098-.46-.307-.067-.404.303-.074.614-.054.922-.074.097-.006.286-.027.358-.035.217-.017.432-.061.646-.103l.172-.036.035-.007c.007-.039.015-.062.022-.053a.167.167 0 01.01.047l.011-.002c.03-.003.059.001.088.002 0 .165-.004.258-.006.322.985-1.478.258-4.246-1.611-6.115-1.325-1.325-3.1-2.076-4.549-2.053z'/%3E%3Cpath d='M4.092 27.948a3.559 3.559 0 01-2.027-1.017c-.787-.788-1.106-1.709-1.018-2.944a6.39 6.39 0 011.05-3.083c.947-1.426 2.378-2.386 4.13-2.769.384-.084.501-.087 4.572-.1l4.18-.015V27.995l-5.303-.005c-2.917-.003-5.43-.022-5.584-.042z' fill='%2300f'/%3E%3C/svg%3E"`;

const getBaseThumbStyles = ({ isMax, disabled }: StyledInputProps) => `
  -webkit-appearance: none;
  background-image: url(${isMax ? bunnyHeadMax : bunnyHeadMain});
  background-color: transparent;
  box-shadow: none;
  border: 0;
  cursor: ${getCursorStyle};
  width: 24px;
  height: 32px;
  filter: ${disabled ? "grayscale(100%)" : "none"};
  transform: translate(-2px, -2px);
  transition: 200ms transform;
  &:hover {
    transform: ${disabled ? "scale(1) translate(-2px, -2px)" : "scale(1.1) translate(-3px, -3px)"};
  }
`;

export const SliderLabelContainer = styled.div`
  bottom: 0;
  position: absolute;
  left: 14px;
  width: calc(100% - 30px);
`;

export const SliderLabel = styled(Text)<SliderLabelProps>`
  bottom: 0;
  font-size: 12px;
  left: ${({ progress }) => progress};
  position: absolute;
  text-align: center;
  min-width: 24px; // Slider thumb size
`;

export const BunnyButt = styled.div<DisabledProp>`
  background: url(${bunnyButt}) no-repeat;
  height: 32px;
  filter: ${({ disabled }) => (disabled ? "grayscale(100%)" : "none")};
  position: absolute;
  width: 15px;
`;

export const BunnySlider = styled.div`
  position: absolute;
  left: 14px;
  width: calc(100% - 14px);
`;

export const StyledInput = styled.input<StyledInputProps>`
  cursor: ${getCursorStyle};
  height: 32px;
  position: relative;
  ::-webkit-slider-thumb {
    ${getBaseThumbStyles}
  }
  ::-moz-range-thumb {
    ${getBaseThumbStyles}
  }
  ::-ms-thumb {
    ${getBaseThumbStyles}
  }
`;

export const BarBackground = styled.div<DisabledProp>`
  background-color: ${({ theme, disabled }) => theme.colors[disabled ? "textDisabled" : "inputSecondary"]};
  height: 2px;
  position: absolute;
  top: 18px;
  width: 100%;
`;

export const BarProgress = styled.div<DisabledProp>`
  background-color: #231FC7D4;
  filter: ${({ disabled }) => (disabled ? "grayscale(100%)" : "none")};
  height: 10px;
  position: absolute;
  top: 18px;
`;
