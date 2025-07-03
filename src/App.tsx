import { Center, ChakraProvider, extendTheme, HStack, Spinner, Stack, Text, VStack, type ThemeConfig } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import './App.css';
import { APP_KEY, useLazyGetWeekForecastQuery } from './query/weather-api';

import { Search } from './components/Search';

import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { WeeklyListWeather } from './components/WeeklyListWeather';

export type Weather = {
  temp: number,
  icon: string,
  description: string,
}

const breakpoints = {
  base: '320px',
  sm: '360px',
  md: '768px',
  lg: '1440px',
  xl: '1920px',
  '2xl': '1920px',
}
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

function App() {
  const theme = extendTheme({ breakpoints, config })
  const currentCity = useRef('')
  const [fetchWeekForecastQuery, { isLoading: isLoadingQuery, isSuccess: isSuccessQuery, isError: isErrorQuery, isFetching: isFetchingQuery, data: dataQuery }] = useLazyGetWeekForecastQuery()
  const [fetchWeekForecast] = useLazyGetWeekForecastQuery()
  const [isLoading, setIsLoading] = useState(false)
  const [deleteCurrent, setDeleteCurrent] = useState(false)
  const [weather, setWeather] = useState<Weather[]>([])
  const [weatherSavedCities, setWeatherSavedCities] = useState<{ city: string, weather: Weather[] }[]>([])

  useEffect(() => {
    if (isSuccessQuery) {
      setWeather(dataQuery.list.map(it => ({ temp: it.temp.day, icon: it.weather[0].icon, description: it.weather[0].description })))
      currentCity.current = dataQuery!.city.name;
      setDeleteCurrent(false)
    }
  }, [isLoadingQuery, isSuccessQuery, isErrorQuery, isFetchingQuery, dataQuery]);


  useEffect(() => {
    (async () => {
      setIsLoading(true)
      const savedCities = await Promise.all((localStorage.getItem('cities')?.split(',')
        .map(async (city) => {
          const data = await fetchWeekForecast({ appid: APP_KEY, city: city }).unwrap()
          const weather = data.list
            .map(it => ({ temp: it.temp.day, icon: it.weather[0].icon, description: it.weather[0].description })) as Weather[];
          return { city, weather }
        }) ?? []))
      return savedCities
    })()
      .then(it => setWeatherSavedCities(it))
      .finally(() => { setIsLoading(false) })
  }, []);

  const isShowLoading = isLoadingQuery || isFetchingQuery || isLoading;

  return (<>
    <ChakraProvider theme={theme}>
      <Header />
      <Stack filter={isShowLoading ? 'blur(2px)' : 'none'} p={'16px'} flex={1}>
        <HStack justify={'center'}>
          <Search isError={isErrorQuery} onClickSearch={(query) => fetchWeekForecastQuery({ appid: APP_KEY, city: query })} />
        </HStack>
        {!isShowLoading && weather.length === 0 && weatherSavedCities.length === 0 &&
          <Center flex={1}>
            <Text fontSize={'34px'}>Отсутствуют избранные города</Text>
          </Center>}
        {isSuccessQuery && !deleteCurrent &&
          <VStack>
            <WeeklyListWeather
              e={{ city: currentCity.current, weather: weather }}
              isSave={true}
              onClickDelete={() => {
                setDeleteCurrent(true);
                setWeatherSavedCities([{ city: currentCity.current, weather }, ...weatherSavedCities])
              }} />
          </VStack>}
        {weatherSavedCities.map((it, idx) => {
          return (
            <WeeklyListWeather
              isSave={false}
              key={`${it.city}`}
              e={it}
              onClickDelete={() => setWeatherSavedCities(weatherSavedCities.filter((_it, i) => i !== idx))} />)
        })}
      </Stack>
      <Footer />
      {isShowLoading &&
        <Center
          position={'fixed'}
          top={'50%'}
          left={'50%'}>
          <Spinner size={'xl'} />
        </Center>}
    </ChakraProvider>
  </>)
}

export default App



