import React, { Component } from 'react';
import { ListView, StyleSheet, ActivityIndicator, RefreshControl, Text } from 'react-native';
import firebase from '../../firebase';
import Post from './components/Post';

const REF = 'examples/infiniteScroll';

/**
 * Infinite scrolling ListView implemented using Firebase
 */

class InfiniteScroll extends Component {
  /**
   * Build the dataSource using the method from ListView
   * Open the subscription to the posts ref in firebase
   * Init state
   */
  constructor() {
    super();
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2),
    });
    this.postsRef = firebase.database()
      .ref(`${REF}/posts`);
    this.posts = {};
    this.state = {
      refreshing: false,
      dataSource: this.dataSource.cloneWithRows({}),
    };
  }
  
  /**
   * Get the first 5 posts from firebase
   */
  componentDidMount() {
    this.postsRef.orderByKey().limitToFirst(5).once('value', this.onPosts);
  }
  
  /**
   * When pull to refresh happens, refresh the currently loaded posts.
   */
  onRefresh() {
    this.setState({ refreshing: true });
    this.postsRef.orderByKey().limitToFirst(Object.keys(this.posts).length).once('value', this.onPosts);
  }
  
  /**
   * Pass a snapshot of the data returned from our firebase calls, loop
   * over the keys and add them to add them to dataSource
   * @param snapshot
   */
  onPosts = (snapshot) => {
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        this.posts = {
          ...this.posts || {},
          [childSnapshot.key]: childSnapshot.value,
        };
      });
      this.setState({
        refreshing: false,
        dataSource: this.dataSource.cloneWithRows(this.posts),
      });
    }
  };
  
  /**
   * Get the next posts from Firebase, add them to the dataSource and render them using that logic.
   */
  getNextPosts() {
    const postKeys = Object.keys(this.posts);
    const lastItemRenderedInList = postKeys[postKeys.length - 1];
    this.postsRef.startAt(lastItemRenderedInList).orderByKey().limitToFirst(5).once('value', this.onPosts);
  }
  
  /**
   * Renders the Activity Indicator that is displayed under the last card.
   * @returns {XML}
   */
  renderFooter() {
    return <ActivityIndicator style={{ marginVertical: 20 }}/>;
  }
  
  render() {
    if (!Object.keys(this.posts).length) return <Text>no posts</Text>;
    return (
      <ListView
        style={styles.listStyle}
        enableEmptySections
        dataSource={this.state.dataSource}
        renderRow={(data) => <Post data={data}/>}
        renderFooter={this.renderFooter}
        onEndReached={this.getNextPosts.bind(this)}
        onEndReachedThreshold={20}
        refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
      />
    );
  }
}

const styles = StyleSheet.create({
  listStyle: {
    flex: 1,
    backgroundColor: '#dadada',
  },
});

export default InfiniteScroll;
