import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import {colors} from '../../utils/commonStyle/colors';

const Typing = ({
  name = true,
  fontSize,
}: {
  name?: boolean;
  fontSize?: number;
}) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prevDots => {
        if (prevDots === '...') {
          return '';
        }
        return prevDots + '.';
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Text style={{fontSize: fontSize || 11, color: colors.black}}>
        {name ? 'Typing' : ''}
        {dots}
      </Text>
    </>
  );
};

export default Typing;
