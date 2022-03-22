import {
  View,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPosts} from '../../redux/actions/posts';
import {FloatingButton, FLPosts, Comments, Menu, DBHeader} from '../exports';
import colors from '../../utils/colors';
import Gap from '../Gap';

export default function Posts({navigation}) {
  const dispatch = useDispatch();
  const {posts, utils, auth} = useSelector(state => state);
  useEffect(() => {
    dispatch(getPosts());
  }, [utils.updater]);
  const theme = colors();
  const allPosts = posts.posts;

  const renderItem = ({item, index}) => (
    <FLPosts
      item={item}
      index={index}
      token={auth.token}
      userData={auth.userData}
      theme={theme}
      posts={allPosts}
      updater={utils.updater}
    />
  );

  return (
    <View style={{flex: 1}}>
      {utils.loading && (
        <ActivityIndicator
          size="large"
          color={theme.text}
          style={styles.loading(allPosts)}
        />
      )}
      {!allPosts && <DBHeader onPress={() => navigation.navigate('Profile')} />}
      {allPosts && (
        <FlatList
          data={allPosts}
          keyExtractor={post => post._id}
          renderItem={renderItem}
          stickyHeaderIndices={[0]}
          stickyHeaderHiddenOnScroll
          ListFooterComponent={<Gap height={75} />}
          ListHeaderComponent={
            <DBHeader onPress={() => navigation.navigate('Profile')} />
          }
          refreshControl={
            <RefreshControl
              onRefresh={() => dispatch(getPosts())}
              refreshing={false}
            />
          }
        />
      )}
      <FloatingButton onPress={() => navigation.navigate('PostForm')} />
      <Comments />
      <Menu navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  loading: posts => ({
    position: 'absolute',
    alignSelf: 'center',
    top: posts ? 105 : 120,
  }),
});
