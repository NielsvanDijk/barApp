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


var roster = React.createClass({

    getInitialState: function(){
        return{
            dataSource: new ListView.DataSource({
              rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            version: [],
            rosters: [],
            loaded: false,
            rosterD: null,
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
            rosters: responseData.rostersD
          })
        })
        .catch(function(err) {
          AlertIOS.alert('Error','kan de data niet vinden')
        })
        .done()
    },

    getCurrentRoster:function(){
        var rosterD = this.state.rosterD;

        return (
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}/>
        );
    },

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
                            Barrooster
                        </Text>
                        <TouchableHighlight onPress={this._onPressButton}>
                            <Text style={styles.version}>v0.0.1</Text>
                        </TouchableHighlight>
                    </View>
                    <View>
                        {this.getCurrentRoster()}
                    </View>
                </ScrollView>
            </View>
        );
    },

    _renderRow: function(rowData){
        return (
            <View style={styles.row}>
                <View style={styles.datum}>
                    <Text style={styles.dag}>27</Text>
                    <Text style={styles.maand}>NOV</Text>
                </View>
                <View style={styles.wie}>
                    <Text style={styles.groep}>{questions.name}</Text>
                    <Text style={styles.extra}>Extra: Het schoonmaken van de koelkasten in de keuken</Text>
                </View>
                {/*<Text>{rowData}</Text>*/}
            </View>
        );
    },

    _createRow: function(pressData: {[key: number]: boolean}): Array<string>{
        var dataBlob = [];
        for (var ii = 0; ii < 11; ii++){
            var pressedText = pressData[ii] ? '(pressed)' : '';
            dataBlob.push('Rij ' + ii + pressedText);
        }
        return dataBlob;
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
