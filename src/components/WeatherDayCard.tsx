import { Card, CardBody, CardHeader, Image, Text, useColorMode, VStack } from "@chakra-ui/react";
import { format } from "date-fns";
import { ru } from 'date-fns/locale/ru';
import type { Weather } from "../App";

export const WeatherDayCard = ({ date, weather }: { date: Date, weather: Weather }) => {
  const { colorMode } = useColorMode()
  return (<Card>
    <CardHeader>
      <VStack>
        <Text fontSize={'24px'} textAlign={'center'} >{format(date, 'dd.MM')}</Text>
        <Text fontSize={'24px'} textTransform={'capitalize'}>{new Date().getDate() == date.getDate() ? 'Сегодня' : format(date, 'eeeeee', { locale: ru })}</Text>
      </VStack>

    </CardHeader>
    <CardBody width={'230px'}>
      <VStack>
        <Image filter={colorMode === 'dark' ? 'invert(15%)' : 'none'} src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} />
        <Text>{weather.description}</Text>
        <Text fontSize={'28px'} color={'#50B87C'}>{`${Math.round(weather.temp)}\u00B0C`}</Text>
      </VStack>
    </CardBody>
  </Card>)
}