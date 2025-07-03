import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const APP_KEY = '34f0b28a302d154cb8a38b60c51a855b'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.openweathermap.org/data/2.5',
  }),

  endpoints: builder => ({
    getWeatherData: builder.query<string, Query>({
      query: (data) => `/weather?q=${data.city}&appid=${data.appid}`
    }),

    getWeekForecast: builder.query<WeatherData, Query>({
      query: (data) => `/forecast/daily?q=${data.city}&units=metric&cnt=7&appid=${data.appid}&lang=ru`
    })

  })
})

export const { useGetWeekForecastQuery, useLazyGetWeekForecastQuery } = apiSlice



type Query = {
  city: string;
  appid: string;
}

type WeatherData = {
  city: {
    id: number;
    name: string;
    coord: {
      lon: number;
      lat: number;
    };
    country: string;
    population: number;
    timezone: number;
  };
  cod: string;
  message: number;
  cnt: number;
  list: Array<{
    dt: number;
    sunrise: number;
    sunset: number;
    temp: {
      day: number;
      min: number;
      max: number;
      night: number;
      eve: number;
      morn: number;
    };
    feels_like: {
      day: number;
      night: number;
      eve: number;
      morn: number;
    };
    pressure: number;
    humidity: number;
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    speed: number;
    deg: number;
    gust: number;
    clouds: number;
    pop: number;
    rain?: number; // Опциональное поле, так как в JSON оно есть не у всех элементов
  }>;
};