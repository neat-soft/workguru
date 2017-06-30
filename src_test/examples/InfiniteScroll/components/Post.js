import React, { PropTypes }  from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

/**
 * Stateless component to render a Card/ Post.
 * @param data
 * @returns {XML}
 * @constructor
 */
function Post({ data }) {
  const { title, excerpt, imgUrl, user, avatar } = data;
  return (
    <View
      style={styles.container}
    >
      <View style={styles.userContainer}>
        <Image
          style={styles.avatar}
          source={{ uri: avatar }}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user}</Text>
        </View>
      </View>
      <Image
        style={styles.postImage}
        source={{ uri: imgUrl }}
      />
      <View style={styles.postContentWrapper}>
        <Text style={styles.postTitle}>{title}</Text>
        <Text>{excerpt}</Text>
      </View>
    </View>
  );
}

Post.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    height: 400,
    flex: 1,
    elevation: 4,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
  },
  avatar: {
    flex: 2,
    maxWidth: 60,
    borderRadius: 50,
    height: 60,
  },
  userContainer: {
    padding: 16,
    flexDirection: 'row',
  },
  userInfo: {
    flex: 9,
    marginLeft: 16,
    marginTop: 16,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  postImage: {
    flex: 1,
    maxHeight: 400,
  },
  postContentWrapper: {
    padding: 16,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
});

export default Post;
