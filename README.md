# Weather App

A React-based weather forecast application that displays weekly weather data for selected cities using the OpenWeatherMap API.

<img width="2390" height="1170" alt="main screen" src="https://github.com/user-attachments/assets/4b49c149-6335-4e00-b0c5-ca0156e4bef5" />

## Features

- Search for cities and view their weekly weather forecast
- Save favorite cities to local storage
- Switch between light and dark themes
- Responsive design for desktop and mobile
- Built with Chakra UI and Redux Toolkit Query

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/RomanZelenin/weather-app.git
   cd weather-app
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

### Running the App

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
# or
yarn build
```

## Configuration

The app uses the OpenWeatherMap API. The API key is set in `src/query/weather-api.ts` as `APP_KEY`. Replace it with your own key if needed.

## Project Structure

- `src/` - Main source code
  - `components/` - React components
  - `query/` - API logic using Redux Toolkit Query
  - `App.tsx` - Main application component
  - `main.tsx` - Entry point
- `public/` - Static assets

## License

MIT

