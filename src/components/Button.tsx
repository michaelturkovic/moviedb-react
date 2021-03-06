import React, { FC } from 'react';

type ButtonProps = {
  label?: string;
  classname: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const Button: FC<ButtonProps> = ({
  label,
  classname,
  onClick,
}): JSX.Element => (
  <button className={`button ${classname}`} onClick={onClick}>
    {label}
  </button>
);
