/** @format */
import React, { Component } from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import bgMessaging from './app/bgMessaging'
import bg from './app/bg'
import SyncAdapter from 'react-native-sync-adapter';

const syncInterval = 15; // 1 minute
const syncFlexTime = 1; // 15 seconds

class MyRoot extends Component {
componentDidMount() {
    SyncAdapter.init({
      syncInterval,
      syncFlexTime,
    });

  }
}

AppRegistry.registerComponent(appName, () => App);

AppRegistry.registerHeadlessTask('TASK_SYNC_ADAPTER', () => bg); 

AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging); 