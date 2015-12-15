/*----------------
   | Roster.js |
------------------*/

'use strict';

var React = require('react-native');

var {
    AppRegistry,
    ListView,
    StyleSheet,
    Text,
    Image,
    TextInput,
    View,
    ScrollView,
    AlertIOS,
    TouchableHighlight,
} = React;

var Version = require('./version');

// Components
var GiftedSpinner = require('react-native-gifted-spinner');

var roster = React.createClass({

    getInitialState: function(){
        return{
            version: [],
            // rosterDates: [],
            rosterDates: null,
            dataSource: new ListView.DataSource({
              rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loaded: false,
        };
    },

    componentDidMount: function() {
        this.fetchData();
    },

    fetchData: function() {

      var that = this;

      fetch("https://api.parse.com/1/classes/rosterDates", {
        headers: {
          "X-Parse-Application-Id": "k0IqFxo8oa2n1FkjFJs6TV7CBJ2BonnC0oSVI6jc",
          "X-Parse-REST-API-Key": "DHbRDhhAcRncAFgspTgecn6DlecXEmeTIVpIgUk1"
        }
      })
        .then((response) => response.json())
        .then((responseData) => {
          console.log(responseData);
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData.results),
            loaded: true,
          })
        })
        .catch(function(err) {
          AlertIOS.alert('Error','kan de data niet vinden')
        })
        .done()
    },

    getCurrentRoster:function(){

        if (!this.state.loaded) {
          return this.renderLoadingView();
        }

        var rosterDates = this.state.rosterDates;
        console.log(rosterDates)

        return (
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}/>
        );
    },

    renderLoadingView: function() {
      return (
       <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <GiftedSpinner />
        </View>
      );
    },

    render: function() {
        return (
            <View style={styles.flex}>

            <View style={styles.container}>
                <Text style={styles.activeTitle}>
                    Test
                </Text>
                <TouchableHighlight onPress={this._onPressButton}>
                    <Text style={styles.version}>v0.1</Text>
                </TouchableHighlight>
            </View>

            <ScrollView
                horizontal={false}
                onScroll={() => { console.log('onScroll!'); }}
                showsVerticalScrollIndicator={false}
            >
                <View>
                    {this.getCurrentRoster()}
                </View>
            </ScrollView>
            </View>
        );
    },

    renderRow: function(rosters){
        return (
            <View style={styles.row}>
                <View style={styles.datum}>
                    <Text style={styles.dag}>{rosters.date.iso.substring('8','10')}</Text>
                    <Text style={styles.maand}>{rosters.date.iso.substring('5','7')}</Text>
                </View>
                <View style={styles.wie}>
                    <Text style={styles.groep}>{rosters.barGroup}</Text>
                    {/*}<Text style={styles.extra}>Extra: Het schoonmaken van de koelkasten in de keuken</Text>*/}
                </View>
                {/*<Text>{rowData}</Text>*/}
            </View>
        );
    },

    _onPressButton: function(){
        this.props.navigator.replace({
            component: Version,
        });
    },
});

var smallImage = require('image!beer');

var styles = StyleSheet.create({

  container: {
    padding: 30,
    flex: 0,
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

  v: {
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold',
    alignItems: 'stretch',
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
  horizontal: {
    flexDirection: 'row',
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

    base: {
        width: 16,
        height: 30,
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
