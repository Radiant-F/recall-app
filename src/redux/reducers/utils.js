import {
  LOADING,
  MENU_PANEL,
  PANEL_LOADING,
  SWIPEABLE_PANEL,
  THEME,
  UPDATER,
} from '../actionTypes';

export default (
  state = {
    loading: false,
    updater: false,
    panelLoading: false,
    commentPanel: {
      active: false,
      postId: null,
      comments: null,
    },
    menuPanel: {
      active: false,
      post: null,
    },
    selectedTheme: 'light',
    theme: {
      light: {
        background: '#e2e2e2',
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
      return {
        ...state,
        commentPanel: {active, comments: comments?.reverse(), postId},
      };
    case MENU_PANEL:
      return {
        ...state,
        menuPanel: {active: action.payload.active, post: action.payload.post},
      };
    case PANEL_LOADING:
      return {...state, panelLoading: action.payload};
    default:
      return state;
  }
};
