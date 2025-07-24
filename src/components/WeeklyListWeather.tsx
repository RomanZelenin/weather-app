import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { Stack, Text, Flex, Tooltip, IconButton, HStack } from '@chakra-ui/react';
import { useMemo } from 'react';
import { WeatherDayCard } from './WeatherDayCard';
import type { Weather } from '../App';



export const WeeklyListWeather = ({ item, onClickDelete, isSave }: { item: { city: string; weather: Weather[]; }; onClickDelete: () => void; isSave: boolean; }) => {
  const week = useMemo(() => {
    const currentDate = new Date();
    const week = [currentDate] as Date[];
    for (let i = 1; i < 7; i++) {
      const date = new Date();
      date.setDate(currentDate.getDate() + i);
      week.push(date);
    }
    return week;
  }, []);
  return (
    <>
      <Stack>
        <HStack justify={"center"}>
          <Text fontSize={"24px"} alignSelf={"center"}>
            {item.city}
          </Text>
          <Tooltip label={isSave ? "Сохранить" : "Удалить"}>
            <IconButton
              variant={"ghost"}
              icon={isSave ? <AddIcon /> : <DeleteIcon />}
              aria-label={isSave ? "add city" : "delete city"}
              onClick={() => {
                const cities = localStorage.getItem("cities");
                if (isSave) {
                  if (cities === null) {
                    localStorage.setItem("cities", item.city);
                  } else {
                    if (!cities.split(",").includes(item.city)) {
                      localStorage.setItem("cities", cities + "," + item.city);
                    }
                  }
                } else {
                  if (cities) {
                    const filteredCitites = cities!
                      .split(",")
                      .filter((city) => city !== item.city);
                    if (filteredCitites.length > 0) {
                      localStorage.setItem("cities", filteredCitites.join(","));
                    } else {
                      localStorage.removeItem("cities");
                    }
                  }
                }
                onClickDelete();
              }}
            />
          </Tooltip>
        </HStack>
        <Flex justify={"center"} gap={"8px"} flexWrap={"wrap"}>
          {item.weather.map((w, idx) => (
            <WeatherDayCard key={idx} weather={w} date={week[idx]} />
          ))}
        </Flex>
      </Stack>
    </>
  );
};
