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
import {Comments, PostActionButton} from '../exports';
import {useDispatch, useSelector} from 'react-redux';
import {likePost} from '../../redux/actions/posts';
import {SWIPEABLE_PANEL} from '../../redux/actionTypes';

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
  const iconName = item.likes.find(id => id == userData.id)
    ? 'thumb-up'
    : 'thumb-up-outline';
  return (
    <View style={styles.container}>
      {index == 0 && <Text style={styles.textTitle(text)}>Discover</Text>}
      <TouchableNativeFeedback key={item._id} useForeground>
        <View style={styles.viewPost(postCard)}>
          <Image source={CatPict} style={styles.img} />
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
          <View style={styles.viewPostContent}>
            <View style={{flex: 1}}>
              <Text style={styles.textPostTitle}>{item.title}</Text>
              <Text style={styles.textPostMessage}>
                {item.message} kenangan yang panjang banget waaaa
              </Text>
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
                onPress={() =>
                  dispatch(
                    likePost(
                      item._id,
                      userData.id,
                      index,
                      token,
                      posts,
                      updater,
                    ),
                  )
                }
              />
              <Gap height={15} />
              <PostActionButton
                iconName="comment-outline"
                onPress={() =>
                  dispatch({
                    type: SWIPEABLE_PANEL,
                    payload: {
                      active: true,
                      comments: item.comments,
                      postId: item._id,
                    },
                  })
                }
              />
            </View>
          </View>
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
