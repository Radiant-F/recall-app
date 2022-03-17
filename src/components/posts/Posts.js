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

export default function Posts({navigation}) {
  const {posts, utils, auth} = useSelector(state => state);
  const dispatch = useDispatch();
  const theme = colors();
  useEffect(() => {
    dispatch(getPosts());
  }, [utils.updater]);
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
          color="white"
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
          ListHeaderComponent={
            <DBHeader onPress={() => navigation.navigate('Profile')} />
          }
          stickyHeaderHiddenOnScroll
          refreshControl={
            <RefreshControl
              onRefresh={() => dispatch(getPosts())}
              refreshing={false}
            />
          }
        />
      )}
      <Comments />
      <Menu navigation={navigation} />
      <FloatingButton onPress={() => navigation.navigate('PostForm')} />
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
