import { CloseIcon } from '@chakra-ui/icons';
import { Button, Input, InputGroup, InputRightElement, useColorMode, useToast, type ToastId } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';


export const Search = ({ onClickSearch, isError }: { onClickSearch: (query: string) => void, isError: boolean }) => {
  const [query, setQuery] = useState('');
  const isSearchActive = query.length >= 3;
  const refSearchBtn = useRef<HTMLButtonElement>(null);
  const refSearchInput = useRef<HTMLInputElement>(null);
  const toastIdRef = useRef<ToastId>(null)
  const [localError, setIsLocalError] = useState(isError);
  const toast = useToast();
  const { colorMode } = useColorMode();

  useEffect(() => setIsLocalError(isError), [isError])
  useEffect(() => setIsLocalError(false), [query])
  useEffect(() => {
    if (localError) {
      toastIdRef.current = toast({
        title: `Ничего не найдено`,
        description: 'Попробуйте изменить запрос',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }, [localError])
  const handleOnKeyDownInputSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter' && isSearchActive) {
      refSearchBtn.current?.click();
    }
  };

  return (<>
    <InputGroup maxW={'400px'}>
      <Input
        ref={refSearchInput}
        borderColor={localError ? 'red' : colorMode==='dark' ? 'whiteAlpha.500' : 'blackAlpha.500'}
        _focus={{
          boxShadow: '2px 4px 8px gray',
          borderColor: localError ? 'red' : 'blackAlpha.500'
        }}
        _hover={{ borderColor: localError ? 'red' : 'blackAlpha.500' }}
        onKeyDown={handleOnKeyDownInputSearch}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Введите название города...'
        type='text' />
      {query.length > 0 &&
        <InputRightElement>
          <CloseIcon boxSize={'10px'} onClick={() => setQuery('')} _hover={{ boxSize: '12px' }} />
        </InputRightElement>}
    </InputGroup>
    <Button
      ref={refSearchBtn}
      disabled={!isSearchActive}
      variant='solid'
      onClick={() => {
        onClickSearch(query);
        refSearchInput.current?.blur();
        if (toastIdRef.current) {
          toast.close(toastIdRef.current)
        }
      }}>Поиск</Button>
  </>);
};
