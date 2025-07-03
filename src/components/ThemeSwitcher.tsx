import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useColorMode, IconButton } from '@chakra-ui/react';


export const ThemeSwitcher = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (<IconButton onClick={() => { toggleColorMode(); }}
    backgroundColor={'transparent'}
    icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
    aria-label='settings' />);
};
