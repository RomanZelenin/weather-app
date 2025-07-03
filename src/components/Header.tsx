import { Stack, Text, HStack } from '@chakra-ui/react';
import { Time } from './Time';
import { ThemeSwitcher } from './ThemeSwitcher';



export const Header = () => {
  return (<Stack direction={'row'} justify={'center'}>
    <Text fontSize={'28px'}>Погода на неделю</Text>
    <HStack position={'absolute'} right={'16px'}>
      <Time />
      <ThemeSwitcher />
    </HStack>
  </Stack>);
};
