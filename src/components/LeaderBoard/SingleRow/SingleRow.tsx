import React from 'react';
import { useSelector } from 'react-redux';
import { selectName } from 'redux/auth/selectors';

interface IProps {
  name: string;
  score: number;
}

export const SingleRow = ({ name, score }: IProps) => {
  const currentUserName = useSelector(selectName);

  const style = {
    backgroundColor: currentUserName === name ? '#8dbf8c' : 'none',
  };

  return (
    <tr style={style}>
      <th>{name}</th>
      <th>{score}</th>
    </tr>
  );
};
