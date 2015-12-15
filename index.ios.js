/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  StatusBarIOS
} = React;

var Start = require('./mainApp/roster');

var BA = React.createClass({
    render: function() {
        return (
            <Navigator
              initialRoute={{component: Start}}
              renderScene={(route, navigator) => {
                if(route.component) {
                  return React.createElement(route.component, {navigator,route} );
                }
              }}/>
        );
    }
});

StatusBarIOS.setHidden(false);
StatusBarIOS.setStyle('light-content');

AppRegistry.registerComponent('BA', () => BA);
