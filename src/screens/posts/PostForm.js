import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableNativeFeedback,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../utils/colors';
import {
  CStatusBar,
  FormInput,
  Header,
  Gap,
  AuthButton,
} from '../../components/exports';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CatPict} from '../../assets/exports';
import {launchImageLibrary} from 'react-native-image-picker';
import {createPost, editPost} from '../../redux/actions/posts';
import {useTranslation} from 'react-i18next';

export default function PostForm({navigation, route}) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {auth, utils} = useSelector(state => state);
  const {token, userData} = auth;
  const isEditing = route.params;
  const {background, postCard, text} = colors();
  const [formData, setFormData] = useState({
    title: null,
    message: null,
    tags: null,
    selectedFile: null,
    name: userData.name,
  });

  useEffect(() => {
    if (isEditing) {
      const {title, message, tags, selectedFile} = route.params.post;
      setFormData({
        ...formData,
        title,
        message,
        tags: tags.join(' '),
        selectedFile,
      });
    }
  }, []);

  const formDataHandler = (property, input) =>
    setFormData({...formData, [property]: input});

  function submitHandler() {
    if (isEditing) {
      dispatch(editPost(formData, token, route.params.post._id, navigation));
    } else {
      const {title, selectedFile} = formData;
      if (!title || !selectedFile) return console.log('isi dengan benar');
      dispatch(createPost(formData, token, navigation));
    }
  }

  async function imageHandler() {
    const {assets} = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
      quality: 0.1,
      includeExtra: true,
    });
    if (assets) {
      const {base64, uri, type} = assets[0];
      setFormData({...formData, selectedFile: `data:${type};base64,${base64}`});
      return;
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: background}}>
      <CStatusBar />
      <Header
        title={isEditing ? t('Edit Recall') : t('Create Recall')}
        leftIcon={'chevron-left'}
        onPressLeft={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={styles.container}>
          <TouchableNativeFeedback useForeground onPress={imageHandler}>
            <View style={styles.viewImage(postCard)}>
              {formData.selectedFile ? (
                <Image
                  source={{uri: formData.selectedFile}}
                  style={styles.img}
                  resizeMethod="resize"
                />
              ) : (
                <Icon
                  name="camera-enhance-outline"
                  style={styles.iconCamera}
                  color={text}
                  size={32}
                />
              )}
            </View>
          </TouchableNativeFeedback>
          <Gap height={10} />
          <FormInput
            placeholder={t('Give it a title..')}
            onChangeText={input => formDataHandler('title', input)}
            defaultValue={formData.title}
          />
          <Gap height={10} />
          <FormInput
            placeholder={t('Give it a description..')}
            height={100}
            onChangeText={input => formDataHandler('message', input)}
            defaultValue={formData.message}
            multiline
          />
          <Gap height={10} />
          <FormInput
            placeholder={t('Tags (seperated by space)')}
            onChangeText={input => formDataHandler('tags', input)}
            defaultValue={formData.tags}
          />
          <Gap height={20} />
        </View>
      </ScrollView>
      <View style={{margin: 20}}>
        <AuthButton
          title={isEditing ? t('Edit') : t('Post')}
          onPress={submitHandler}
          disabled={utils.loading}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconCamera: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  viewImage: backgroundColor => ({
    backgroundColor,
    height: 150,
    elevation: 3,
    borderRadius: 10,
    overflow: 'hidden',
    padding: 10,
  }),
  img: {
    flex: 1,
    width: '100%',
    borderRadius: 5,
  },
  container: {
    width: '100%',
    maxWidth: 520,
    alignSelf: 'center',
    padding: 15,
  },
});
