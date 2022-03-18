import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  Image,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../../utils/colors';
import {MENU_PANEL, SWIPEABLE_PANEL} from '../../redux/actionTypes';
import {FLPosts, Gap, PostActionButton, PostMenuButton} from '../exports';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import {likePost} from '../../redux/actions/posts';

export default function ProfilePost() {
  const dispatch = useDispatch();
  const {posts, auth, utils} = useSelector(state => state);
  const {id} = auth.userData;
  const filteredPosts = posts.posts.filter(v => v.creator == id);
  const {postCard, text} = colors();

  function openPostMenu(item) {
    if (item.creator == id) {
      dispatch({type: MENU_PANEL, payload: {active: true, post: item}});
    } else console.log('postingan orang');
  }

  const submitLike = (postId, index) =>
    dispatch(
      likePost(postId, id, index, auth.token, filteredPosts, utils.updater),
    );

  const openComment = (comments, id) =>
    dispatch({
      type: SWIPEABLE_PANEL,
      payload: {
        active: true,
        comments: comments,
        postId: id,
      },
    });

  return (
    <View style={{marginBottom: 75}}>
      <Gap height={20} />
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.textTitle2(text)}>Your Recall</Text>
        {utils.loading && <ActivityIndicator color={'white'} />}
      </View>
      {filteredPosts.length < 1 && (
        <Text style={styles.textNoRecall}>Your Recall is empty!</Text>
      )}
      {filteredPosts.map((item, index) => (
        <TouchableNativeFeedback
          key={item._id}
          useForeground
          onPress={() => openPostMenu(item)}>
          <View style={styles.viewPost(postCard)}>
            <Image source={{uri: item.selectedFile}} style={styles.img} />
            <Gap height={10} />
            <View style={styles.viewCreator}>
              <View style={styles.viewPPImg}>
                <Icon name="account" size={30} color="white" />
              </View>
              <Gap width={10} />
              <View>
                <Text style={styles.textCreatorName(text)}>{item.name}</Text>
                <Text style={{color: 'grey'}}>
                  {moment(item.createdAt).fromNow()}
                </Text>
              </View>
            </View>
            <Gap height={5} />
            <View style={styles.viewPostContent}>
              <View style={{flex: 1}}>
                <Text style={styles.textPostTitle(text)}>{item.title}</Text>
                <Text style={{color: text}}>{item.message}</Text>
                <Gap flex={1} marginTop={10} />
                <View style={styles.viewTag}>
                  {item.tags
                    .join(' ')
                    .split(' ')
                    .map((value, index) => (
                      <Text style={styles.textPostTag} key={index}>
                        #{value}
                      </Text>
                    ))}
                </View>
              </View>
              <View>
                <Gap flex={1} />
                <PostActionButton
                  iconName={
                    item.likes.find(LId => LId == id)
                      ? 'thumb-up'
                      : 'thumb-up-outline'
                  }
                  onPress={() => submitLike(item._id, index)}
                />
                <Gap height={15} />
                <PostActionButton
                  iconName="comment-outline"
                  onPress={() => openComment(item.comments, item._id)}
                />
              </View>
            </View>
            {item.creator == id && (
              <PostMenuButton onPress={() => openPostMenu(item)} />
            )}
          </View>
        </TouchableNativeFeedback>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  textNoRecall: {
    color: 'grey',
    textAlign: 'center',
    marginTop: 10,
  },
  textPostTitle: color => ({
    marginVertical: 10,
    color,
    fontWeight: 'bold',
    fontSize: 16,
  }),
  viewPostContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textTitle: color => ({
    color,
    fontSize: 27,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginBottom: 10,
  }),
  container: {
    maxWidth: 500,
    width: '100%',
    alignSelf: 'center',
  },
  textPostTag: {
    marginRight: 5,
    color: '#ababab',
  },
  viewTag: {
    flexDirection: 'row',
  },
  textCreatorName: color => ({
    fontWeight: 'bold',
    color,
  }),
  viewCreator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewPPImg: {
    width: 40,
    height: 40,
    borderRadius: 15,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    height: 150,
    width: '100%',
    borderRadius: 15,
  },
  viewPost: bg => ({
    backgroundColor: bg,
    marginBottom: 20,
    borderRadius: 20,
    padding: 20,
    overflow: 'hidden',
    elevation: 3,
    marginHorizontal: 20,
  }),
  textTitle2: color => ({
    color,
    fontSize: 27,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginBottom: 10,
  }),
});
