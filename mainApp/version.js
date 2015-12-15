/*----------------
   | versie.js |
------------------*/

'use strict';

var React = require('react-native');

var {
    AppRegistry,
    ListView,
    StyleSheet,
    Text,
    TextInput,
    View,
    ScrollView,
} = React;


var roster = React.createClass({
    // getInitialState: function(){
    //     return(
    //
    //     ),
    // },

    render: function() {
        return (
            <View style={styles.flex}>
                <ScrollView
                    horizontal={false}
                    onScroll={() => { console.log('onScroll!'); }}
                    showsVerticalScrollIndicator={true}
                >
                    <View style={styles.container}>
                        <Text style={styles.activeTitle}>
                            Versie
                        </Text>
                        <Text style={styles.version}>v0.0.1</Text>
                    </View>
                    <View style={styles.textBox}>
                            <View style={styles.Header}>
                                <Text style={styles.titels}>Versie 0.1</Text>
                            </View>
                            <View>
                                <Text style={styles.text}>
                                    Inloggen
                                    Barrooster ophalen
                                    Bekijken van 06- nummers
                                </Text>
                            </View>
                    </View>
                </ScrollView>

            </View>
        );
    },
});

var styles = StyleSheet.create({

  container: {
    padding: 30,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#004079',
  },

  flex: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'stretch',
  },

  activeTitle: {
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold',
  },

  text: {
    fontSize: 14,
    lineHeight: 26,
  },

  textBox: {
    padding: 25,
  },

  row: {
    padding: 15,
    backgroundColor: '#fafafa',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  },

  wie:{
      width: 210,
  },

  datum:{
      backgroundColor: '#004079',
      paddingTop: 5,
      paddingRight: 18,
      paddingBottom: 10,
      paddingLeft: 18,
      alignItems: 'center',
      marginRight: 15,
  },

  titels:{
      fontSize: 22,
      fontWeight: 'bold',
  },

  dag:{
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
  },

  maand:{
      color: 'white',
      fontSize: 14,
      fontWeight: 'bold',
  },

  version:{
      color: 'white',
      marginTop:10,
      marginLeft: 5,
      fontSize: 10,
  },

  groep:{
      fontSize: 18,
      fontWeight: 'bold',
      color: '#696969'
  },

  extra:{
      fontSize: 12,
      color: '#ababab'
  },

});


module.exports = roster;
