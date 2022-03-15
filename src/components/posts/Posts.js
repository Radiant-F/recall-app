import {View, ActivityIndicator, FlatList, RefreshControl} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPosts} from '../../redux/actions/posts';
import {FLPosts} from '../exports';
import DBHeader from '../DBHeader';
import colors from '../../utils/colors';
import Comments from './Comments';

export default function Posts() {
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
          style={{
            position: 'absolute',
            alignSelf: 'center',
            marginVertical: 40,
          }}
        />
      )}
      {allPosts && (
        <FlatList
          data={allPosts}
          keyExtractor={post => post._id}
          renderItem={renderItem}
          maxToRenderPerBatch={8}
          stickyHeaderIndices={[0]}
          ListHeaderComponent={<DBHeader />}
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
    </View>
  );
}
