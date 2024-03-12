import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import {colors} from '../../utils/commonStyle/colors';

const Typing = () => {
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
      <Text style={{fontSize: 11, color: colors.black}}>Typing{dots}</Text>
    </>
  );
};

export default Typing;
