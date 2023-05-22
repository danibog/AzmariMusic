import { ThemeProvider } from 'theme-ui';
import MainHeader from '../src/components/Layout/MainHeader';
import theme from './rebass/theme';
import Musics from './components/Musics/Musics';
import NewMusicForm from './components/Musics/NewMusicForm';
import { useEffect } from 'react';

const DummyMusics = [
  {
    artist: 'The Weekend',
    songName: 'Happy',
    songDescription:
      ' Lorem apiente libero quam tempore exercitationem ex odio maxime fugaodiPariatur quos aliquid quae',
    id: 'm1',
    photoLink:
      'https://www.rollingstone.com/wp-content/uploads/2020/02/TheWeeknd.jpg?w=1581&h=1054&crop=1'
  },
  {
    artist: 'The Weekend',
    songName: 'Drunk',
    songDescription:
      ' Lorem apiente libero quam tempore exercitationem ex odio maxime fugaodiPariatur quos aliquid quae',
    id: 'm2',
    photoLink:
      'https://www.goldderby.com/wp-content/uploads/2020/11/the-weeknd.jpg?w=620&h=360&crop=1'
  }
];

function App() {
  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(
        'https://azmari-e08fd-default-rtdb.firebaseio.com/suggestedMusics.json',
        {
          method: 'PUT',
          body: JSON.stringify(DummyMusics),
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          }
        }
      );
      if (!response.ok) {
        console.log('error 404 , known error on post');
        return;
      }
      const jPostedContent = await response.json();

      console.log(jPostedContent);
    };
    fetchApi();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <MainHeader />
      <Musics DummyMusics={DummyMusics} />

      <NewMusicForm />
    </ThemeProvider>
  );
}

export default App;
