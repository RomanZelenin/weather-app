import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { configureStore, createSlice } from '@reduxjs/toolkit/react'
import { apiSlice } from './query/weather-api.ts'
import { ColorModeScript, theme } from '@chakra-ui/react'



const mySlice = createSlice({
  name: 'test',
  initialState: {},
  reducers: {

  }
});

const store = configureStore({
  reducer: {
    my: mySlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware()
      .concat(apiSlice.middleware)
  },
})


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </Provider>
  </StrictMode>,
)
