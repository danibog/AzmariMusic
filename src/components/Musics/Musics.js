import MusicList from "./MusicList";

import MainSection from "../UI/MainSectionContainer";

const DummyMusics = [
  {
    artist: "The Weekend",
    songName: "Happy",
    songDescription:
      " Lorem apiente libero quam tempore exercitationem ex odio maxime fugaodiPariatur quos aliquid quae",
    id: "m1",
    photoLink:
      "https://www.rollingstone.com/wp-content/uploads/2020/02/TheWeeknd.jpg?w=1581&h=1054&crop=1",
  },
  {
    artist: "The Weekend",
    songName: "Drunk",
    songDescription:
      " Lorem apiente libero quam tempore exercitationem ex odio maxime fugaodiPariatur quos aliquid quae",
    id: "m2",
    photoLink:
      "https://www.goldderby.com/wp-content/uploads/2020/11/the-weeknd.jpg?w=620&h=360&crop=1",
  },
];

const Musics = () => {
  return (
    <MainSection>
      <div>
        <h3>Suggested Music</h3>
        <MusicList type="suggestedMusic" musics={DummyMusics}></MusicList>
      </div>

      <div>
        <h3>Your Musics</h3>
        <MusicList type="userMusic" musics={[]}></MusicList>
      </div>
    </MainSection>
  );
};

export default Musics;
