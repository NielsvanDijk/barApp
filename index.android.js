/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
    Navigator,
    AppRegistry,
} = React;

var StatusBarAndroid = require('react-native-android-statusbar');

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

StatusBarAndroid.hideStatusBar();

AppRegistry.registerComponent('BA', () => BA);
