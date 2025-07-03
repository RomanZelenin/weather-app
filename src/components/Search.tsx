import { CloseIcon } from '@chakra-ui/icons';
import { InputGroup, Input, InputRightElement, Button } from '@chakra-ui/react';
import { useState, useRef } from 'react';


export const Search = ({ onClickSearch }: { onClickSearch: (query: string) => void; }) => {
  const [query, setQuery] = useState('');
  const isSearchActive = query.length >= 3;
  const refSearchBtn = useRef<HTMLButtonElement>(null);
  const refSearchInput = useRef<HTMLInputElement>(null);

  const handleOnKeyDownInputSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter' && isSearchActive) {
      refSearchBtn.current?.click();
    }
  };

  return (<>
    <InputGroup maxW={'400px'}>
      <Input
        ref={refSearchInput}
        _focus={{
          boxShadow: '2px 4px 8px gray',
          borderColor: 'transparent'
        }}
        onKeyDown={handleOnKeyDownInputSearch}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Введите название города...'
        type='text' />
      {query.length > 0 &&
        <InputRightElement>
          <CloseIcon boxSize={'12px'} onClick={() => setQuery('')} />
        </InputRightElement>}
    </InputGroup>
    <Button
      ref={refSearchBtn}
      disabled={!isSearchActive}
      variant='solid'
      onClick={() => {
        onClickSearch(query);
        refSearchInput.current?.blur();
      }}>Поиск</Button>
  </>);
};
