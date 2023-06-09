import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Box, Card, Image } from 'theme-ui';
import ModifyIcon from '../../Images/edit-svgrepo-com.svg';
import SaveSongIcon from '../../Images/heart-check-svgrepo-com (1).svg';
import DeleteIcon from '../../Images/delete-svgrepo-com.svg';
import { useDispatch, useSelector } from 'react-redux';
import { updateSuggestedSongsAction, updateUserSongAction } from '../../store/Redux-saga/sagas';
import { uiSliceActions } from '../../store/ui-slice';

const StyledBox = styled(Box)`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));

  &:hover {
    transition: all 0.5s;
  }
`;

const StyledCard = styled(Card)`
  cursor: pointer;
  border-radius: 5px;
  padding: 0.6rem;
  color: white;
  overflow: hidden;
  -webkit-box-shadow: 2px 10px 30px -11px rgba(0, 0, 0, 0.78);
  -moz-box-shadow: 2px 10px 30px -11px rgba(0, 0, 0, 0.78);
  box-shadow: 2px 10px 30px -11px rgba(0, 0, 0, 0.78);
  #artist-name {
    margin-bottom: 0;
    margin-top: 0.5rem;
  }
  #song-name {
    display: inline-block;
    margin: 0 auto;
    font-weight: 100;
  }

  & p {
    display: -webkit-box;
    max-width: 400px;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: all 0.2s;
  }
  ${(props) => css`
    background-color: ${props.theme.colors.black5};
    &:hover {
      background-color: ${props.theme.colors.black1};
      transform: scale(1.01);
      transition: all 0.2s;
    }
  `}

  &:hover #action-icon {
    display: block;
  }
`;

const CoverImageContainer = styled(Box)`
  position: relative;
  overflow: hidden;
`;

const StyledMusicCoverImage = styled(Image)`
  object-fit: cover;
  border-radius: 5px;
  width: 100%;
  height: 18rem;
  border-radius: 8px;
  filter: drop-shadow(5px 5px 20px #0000004a);
`;

const ModifyMusicIcon = styled(Image)`
  display: none;
  position: absolute;
  width: 3rem;
  height: 3rem;
  right: 0.7rem;
  top: 0.7rem;
  border-radius: 10px;
  background-color: #ffffff84;
  backdrop-filter: blur(10px);
  padding: 0.3rem;
  border-top-right-radius: 0;
  ${(props) =>
    props.type === 'suggestedMusic' &&
    css`
      & {
        left: 0.7rem;
        border-radius: 10px;
        border-top-left-radius: 0;
        transform: scale(1.18);
      }
      &::after {
        display: inline-block;
        background-color: white;
        position: absolute;
        width: 2rem;
        height: 1rem;
        content: 'add Music';
      }
    `}
  ${(props) =>
    props.variant === 'delete' &&
    css`
      top: 4.5rem;
      padding: 0.2rem;
      transform: scale(1.07);
    `}

  &:hover {
    background-color: #ffffffca;
  }
`;

const MusicList = (props) => {
  const suggestedSongs = useSelector((state) => state.suggestedSongs.songs);
  const userSongs = useSelector((state) => state.userSongs.songs);
  const dispatch = useDispatch();

  const saveSongHandler = (song) => {
    let prevSongs = [];
    if (userSongs) {
      prevSongs = userSongs.slice();
    }
    const savedSongid = song.id;
    const existingSong = prevSongs.find((song) => song.id === savedSongid);
    if (existingSong) {
      return;
    }
    prevSongs.push(song);
    dispatch(updateUserSongAction(prevSongs));
    const filteredSongs = suggestedSongs.filter((music) => {
      return music.id !== song.id;
    });
    dispatch(updateSuggestedSongsAction(filteredSongs));
  };

  const deleteSongHandler = (songId) => {
    const filteredSongs = userSongs.slice().filter((song) => song.id !== songId);
    dispatch(updateUserSongAction(filteredSongs));
  };

  const editToggleHandler = (songIndex) => {
    dispatch(uiSliceActions.toggleEditCard(songIndex));
  };

  let cartContents =
    props.type === 'suggestedMusic' ? 'No Suggestion for now' : 'No Music is added';

  let musics = suggestedSongs;
  if (props.type !== 'suggestedMusic') {
    musics = userSongs;
  }

  if (musics?.length > 0) {
    cartContents = musics.map((music, index) => {
      return (
        <StyledCard type={props.type} key={music.id}>
          <CoverImageContainer id="image-container">
            <StyledMusicCoverImage src={music.photoLink} />
            {props.type === 'userMusic' && (
              <ModifyMusicIcon
                onClick={editToggleHandler.bind(this, index)}
                type={props.type}
                src={ModifyIcon}
                id="action-icon"></ModifyMusicIcon>
            )}
            {props.type === 'userMusic' && (
              <ModifyMusicIcon
                onClick={deleteSongHandler.bind(this, music.id)}
                type={props.type}
                variant="delete"
                src={DeleteIcon}
                id="action-icon"></ModifyMusicIcon>
            )}

            {props.type === 'suggestedMusic' && (
              <ModifyMusicIcon
                onClick={saveSongHandler.bind(this, music)}
                type={props.type}
                src={SaveSongIcon}
                id="action-icon"></ModifyMusicIcon>
            )}
          </CoverImageContainer>
          <h3 id="artist-name">{music.artist}</h3>
          <h4 id="song-name">{music.songName}</h4>
          <p id="song-discription">{music.songDescription}</p>
        </StyledCard>
      );
    });
  }

  return (
    <>
      <StyledBox>{cartContents}</StyledBox>
    </>
  );
};

export default MusicList;
