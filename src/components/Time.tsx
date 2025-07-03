import { Text } from '@chakra-ui/react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useState, useEffect } from 'react';


export const Time = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    setInterval(() => setTime(new Date()), 1000);
  }, []);

  return (<>
    <Text fontSize={'20px'}>{format(time, 'pp', { locale: ru })}</Text>
  </>);
};
