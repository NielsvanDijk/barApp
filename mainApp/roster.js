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
    RefreshControl,
    View,
    ScrollView,
    AlertIOS,
    TouchableHighlight,
    StatusBarIOS
} = React;

var Version = require('./version');

// Components
var GiftedSpinner = require('react-native-gifted-spinner');
var Moment = require('moment');

var roster = React.createClass({

    getInitialState: function(){
        return{
            isRefreshing: false,
            rosterDates: null,
            dataSource: new ListView.DataSource({
              rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            groups: [],
            loaded: false,
        };
    },

    componentWillMount: function(){
        this.fetchData((err) => {
            if (err) console.error(err)
        });
    },

    componentDidMount: function() {
        StatusBarIOS.setStyle('default');
    },

    fetchData: function(cb) {
        this._getRosterDates((err, rows) => {
            if (err) return cb(err)

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(rows),
            })

            if (this.state.loaded) {
                return cb()
            }

            this._getGroups((err, groups) => {
                if (err) return cb(err)

                this.setState({
                    groups,
                    loaded: true,
                })

                cb()
            })
        })
    },

    _getRosterDates (cb) {
      var date = new Date();
      var stringify = date.toISOString();

      var where = JSON.stringify({
          "date":{
              "$gte": {
                  "__type": "Date",
                  "iso": stringify
              }
          }
      })

      var url = `https://api.parse.com/1/classes/rosterDates?order=date&where=${where}`
      fetch(url, {
            headers: {
              "X-Parse-Application-Id": "k0IqFxo8oa2n1FkjFJs6TV7CBJ2BonnC0oSVI6jc",
              "X-Parse-REST-API-Key": "DHbRDhhAcRncAFgspTgecn6DlecXEmeTIVpIgUk1"
          }
      })
        .then((response) => response.json())
        .then((responseData) => {
          cb(null, responseData.results)
        })
        .catch(function(err) {
          AlertIOS.alert('Error','Kan geen internet connectie maken A')
          console.log(err)
          cb(err)
        })
        .done()
    },

    _getGroups (cb) {
      var url = `https://api.parse.com/1/classes/barGroups`
      fetch(url, {
            headers: {
              "X-Parse-Application-Id": "k0IqFxo8oa2n1FkjFJs6TV7CBJ2BonnC0oSVI6jc",
              "X-Parse-REST-API-Key": "DHbRDhhAcRncAFgspTgecn6DlecXEmeTIVpIgUk1"
          }
      })
        .then((response) => response.json())
        .then((responseData) => {
          cb(null, responseData.results)
        })
        .catch(function(err) {
          AlertIOS.alert('Error','Kan geen internet connectie maken B')
          cb(err)
        })
        .done()
    },

    getCurrentRoster:function(){
        if (!this.state.loaded) {
          return this.renderLoadingView();
        }
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
                    Barroosters
                </Text>
            </View>

            <View style={styles.welcome}>
                <Text style={styles.subTitle}>
                    Welkom, gebruiker
                </Text>
            </View>

            <ScrollView
                style={styles.scrollview}
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.isRefreshing}
                    onRefresh={this._onRefresh}
                    tintColor="#247a91"
                    title="Nieuwe roosters ophalen..."
                    colors={['#247a91', '#00ff00', '#0000ff']}
                    progressBackgroundColor="#ffff00"
                  />
              }

            >
                <View style={styles.bottom}>
                    {this.getCurrentRoster()}
                </View>
            </ScrollView>
            </View>
        );
    },

    renderRow (rosters) {
        return (
            <View style={styles.row}>
                <View style={styles.inner}>
                    <View style={styles.datum}>
                        <Text style={styles.dag}>{Moment(rosters.date.iso).format('DD')}</Text>
                        <Text style={styles.maand}>{Moment(rosters.date.iso).format('MMM')}</Text>
                    </View>
                    <View style={styles.wie}>
                        <Text style={styles.groep}>{this._getGroupById(rosters.barGroup).name}</Text>
                        <Text style={styles.extra}>Wat: bardienst</Text>
                    </View>
                </View>
            </View>
        );
    },
    _getGroupById (id) {
        return this.state.groups.find((group) => group.barMemberId == id)
    },

    _onRefresh() {
        this.setState({ isRefreshing: true });

        this.fetchData(() => {
            this.setState({ isRefreshing: false })
        })
    },

    _onPressButton: function(){
        this.props.navigator.replace({
            component: Version,
        });
    },
});

var styles = StyleSheet.create({

  container: {
    padding: 0,
    flex: 0,
    height: 70,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ececec',
  },

  row: {
    borderColor: 'grey',
    borderWidth: 1,
    padding: 20,
    backgroundColor: '#3a5795',
    margin: 5,
  },
  text: {
    alignSelf: 'center',
    color: '#fff',
  },

  scrollview: {
    flex: 1,
  },

  welcome: {
    padding: 0,
    flex: 0,
    height: 65,
    flexDirection: 'row',
    backgroundColor: '#fbfbfb',
  },

  flex: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'stretch',
      backgroundColor: '#efefef',
  },

  activeTitle: {
    color: '#000029',
    fontSize: 18,
    marginTop: 30,
    fontWeight: '600',
    textAlign: 'center',
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
  },

  subTitle: {
    color: '#acacac',
    fontSize: 16,
    marginTop: 22,
    fontWeight: '100',
    textAlign: 'center',
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
  },

  v: {
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold',
    alignItems: 'stretch',
  },

  row: {
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  },

  inner: {
    backgroundColor: '#fff',
    padding: 15,
    flex: 1,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'stretch',
  },

  wie:{
      width: 210,
      marginTop: 7,
  },

  datum:{
      backgroundColor: '#000029',
      paddingTop: 6,
      paddingRight: 18,
      paddingBottom: 7,
      width: 50,
      height: 50,
      borderRadius: 25,
      paddingLeft: 18,
      alignItems: 'center',
      marginRight: 15,
  },

  horizontal: {
    flexDirection: 'row',
  },

  dag:{
      color: 'white',
      fontSize: 16,
      textAlign: 'center',
      width: 26,
      marginTop: 4,
      fontWeight: 'bold',
  },

  maand:{
      color: 'white',
      fontSize: 10,
      textAlign: 'center',
      width: 26,
      marginTop: -2,
      alignItems: "center"
  },

  bottom:{
      paddingBottom: 15,
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
      fontWeight: '600',
      color: '#696969'
  },

  extra:{
      fontSize: 12,
      color: '#ababab'
  },

});


module.exports = roster;
