// Assume the todos are stored as an object value on Firebase as:
// { name: string, complete: boolean }
import React, { Component } from 'react'
import { View, ListView, Button, Text } from 'react-native'
import firebase from './index'

export default class ToDos extends Component {

    constructor() {
        super();
        this.ref = null;
        this.listView = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });

        this.state = {
            todos: this.listView.cloneWithRows({}),
        };

        // Keep a local reference of the TODO items
        this.todos = {};
    }

    // Load the Todos on mount
    componentDidMount() {
        this.ref = firebase.database().ref('users/1234/todos');
        this.ref.on('value', this.handleToDoUpdate);
    }

    // Unsubscribe from the todos on unmount
    componentWillUnmount() {
        if (this.ref) {
            this.ref.off('value', this.handleToDoUpdate);
        }
    }

    // Handle ToDo updates
    handleToDoUpdate = (snapshot) => {
        this.todos = snapshot.val() || {};

        this.setState({
            todos: this.listView.cloneWithRows(this.todos),
        });
    }

    // Add a new ToDo onto Firebase
    // If offline, this will still trigger an update to handleToDoUpdate
    addToDo() {
        firebase.database()
            .ref('users/1234/todos')
            .set(
                ...this.todos, {
                    name: 'Yet another todos...',
                    complete: false,
                },
            );
    }

// Render a ToDo row
    renderToDo(todo) {
        // Dont render the todo if its complete
        console.log("dfjkldfj", todo);
        if (todo.complete) {
            return null;
        }

        return (
            <View>
                <Text>{todo}</Text>
            </View>
        );
    }

// Render the list of ToDos with a Button
    render() {
        // console.log("dfdfddf", this.state.todos);
        return (
            <View>
                <ListView
                    dataSource={this.state.todos}
                    renderRow={(...args) => this.renderToDo(...args)}
                />

                <Button
                    title={'Add ToDo'}
                    onPress={() => this.addToDo()}
                />
            </View>
        );
    }
}
