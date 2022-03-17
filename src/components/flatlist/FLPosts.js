import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  Image,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {CatPict} from '../../assets/exports';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import Gap from '../Gap';
import {Comments, PostActionButton, PostMenuButton} from '../exports';
import {useDispatch, useSelector} from 'react-redux';
import {likePost} from '../../redux/actions/posts';
import {MENU_PANEL, SWIPEABLE_PANEL} from '../../redux/actionTypes';

export default function FLPosts({
  item,
  index,
  token,
  theme,
  userData,
  posts,
  updater,
}) {
  const {background, postCard, selectedTheme, subtext, text} = theme;
  const dispatch = useDispatch();
  const iconName = item.likes.find(id => id == userData?.id)
    ? 'thumb-up'
    : 'thumb-up-outline';
  const submitLike = (id, index) =>
    dispatch(likePost(id, userData?.id, index, token, posts, updater));
  const openComment = (comments, id) =>
    dispatch({
      type: SWIPEABLE_PANEL,
      payload: {
        active: true,
        comments: comments,
        postId: id,
      },
    });

  function openPostMenu() {
    if (item.creator == userData?.id) {
      dispatch({type: MENU_PANEL, payload: {active: true, post: item}});
    } else console.log('postingan orang');
  }

  return (
    <View style={styles.container}>
      {index == 0 && <Text style={styles.textTitle(text)}>Discover</Text>}
      <TouchableNativeFeedback
        key={item._id}
        useForeground
        onPress={openPostMenu}>
        <View style={styles.viewPost(postCard)}>
          <Image source={{uri: item.selectedFile}} style={styles.img} />
          <Gap height={10} />
          <View style={styles.viewCreator}>
            <View style={styles.viewPPImg}>
              <Icon name="account" size={30} color="white" />
            </View>
            <Gap width={10} />
            <View>
              <Text style={styles.textCreatorName}>{item.name}</Text>
              <Text style={{color: 'grey'}}>
                {moment(item.createdAt).fromNow()}
              </Text>
            </View>
          </View>
          <Gap height={5} />
          <View style={styles.viewPostContent}>
            <View style={{flex: 1}}>
              <Text style={styles.textPostTitle}>{item.title}</Text>
              <Text style={styles.textPostMessage}>{item.message}</Text>
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
                iconName={iconName}
                onPress={() => submitLike(item._id, index)}
              />
              <Gap height={15} />
              <PostActionButton
                iconName="comment-outline"
                onPress={() => openComment(item.comments, item._id)}
              />
            </View>
          </View>
          {item.creator == userData.id && (
            <PostMenuButton onPress={openPostMenu} />
          )}
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  textPostTitle: {
    marginVertical: 10,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
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
  textPostMessage: {
    color: 'white',
    // marginVertical: 10,
  },
  textCreatorName: {
    fontWeight: 'bold',
    color: 'white',
  },
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
});
