import {LOADING, SWIPEABLE_PANEL, THEME, UPDATER} from '../actionTypes';

export default (
  state = {
    commentPanel: {
      comments: null,
      active: false,
      postId: null,
    },
    loading: false,
    updater: false,
    theme: {
      light: {
        background: 'white',
        text: 'black',
        subtext: 'grey',
        postCard: 'white',
      },
      dark: {
        background: '#3c4043',
        text: 'white',
        subtext: '#ababab',
        postCard: '#4c4f52',
      },
    },
    selectedTheme: 'dark',
  },
  action,
) => {
  switch (action.type) {
    case LOADING:
      return {...state, loading: action.payload};
    case UPDATER:
      return {...state, updater: action.payload};
    case THEME:
      return {...state, selectedTheme: action.payload};
    case SWIPEABLE_PANEL:
      const {active, comments, postId} = action.payload;
      return {...state, commentPanel: {active, comments, postId}};
    default:
      return state;
  }
};
