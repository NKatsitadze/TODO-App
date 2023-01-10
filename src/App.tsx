import Wrapper from "./components/Wrapper";

import { ThemeProvider } from "styled-components";

import { useState } from "react";


function App() {
  const themes = {
    light: {
      screen: '#F2F2F2',
      listBoxes: '#FFF',
      listTyping: '#494C6B',
      completed: '#D1D2DA',
      listBottomBorder: '#E3E4F1',
      image: 'https://raw.githubusercontent.com/NKatsitadze/Todo-App/main/src/assets/Bitmap.jpg',
    },
    dark: {
      screen: '#171823',
      listBoxes: '#25273D',
      listTyping: '#C8CBE7',
      completed: '#4D5067',
      listBottomBorder: '#393A4B',
      image: 'https://raw.githubusercontent.com/NKatsitadze/Todo-App/main/src/assets/BitmapNight.jpg',
    }
  }

  const [light, setLight] = useState(true);
  const themeToggler = function() {
    setLight(prev => !prev);
  }

  return (
    <ThemeProvider theme={light ? themes.light : themes.dark}>
      <Wrapper light={light} themeToggler={themeToggler} />
    </ThemeProvider>
  )
}

export default App
