import {useSelector} from 'react-redux';

export default function colors() {
  const {selectedTheme, theme} = useSelector(state => state.utils);
  const {background, text, subtext, postCard} =
    selectedTheme == 'dark' ? theme.dark : theme.light;
  return {
    background,
    text,
    subtext,
    postCard,
    selectedTheme,
  };
}
