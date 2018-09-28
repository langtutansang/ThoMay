import React, {Component} from 'react';
// import codePush from 'react-native-code-push';
import scenes from '@scenes';
import {Router} from 'react-native-router-flux';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Drawer from '@components/Drawer'

import { StyleProvider } from 'native-base';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     showDownloadingModal: false,
  //     showInstalling: false,
  //     downloadProgress: 0,
  //   };
  // }
  // componentDidMount() {
  //   CodePush.sync({ updateDialog: true, installMode: CodePush.InstallMode.IMMEDIATE },
  //     (status) => {
  //       switch (status) {
  //         case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
  //           this.setState({ showDownloadingModal: true });
  //           this._modal.open();
  //           break;
  //         case CodePush.SyncStatus.INSTALLING_UPDATE:
  //           this.setState({ showInstalling: true });
  //           break;
  //         case CodePush.SyncStatus.UPDATE_INSTALLED:
  //           this._modal.close();
  //           this.setState({ showDownloadingModal: false });
  //           break;
  //         default:
  //           break;
  //       }
  //     },
  //     ({ receivedBytes, totalBytes }) => {
  //       this.setState({ downloadProgress: (receivedBytes / totalBytes) * 100 });
  //     }
  //   );
  // }

  componentDidUpdate(){
    this.props.drawer.isOpen ? this.drawer._root.close() : this.drawer._root.open()
  }
  render() {

    const store =configureStore();
    return (
      <StyleProvider style={getTheme(material)}>
        <Provider store={store}>
          <Drawer>
            <Router scenes={scenes}/>
          </Drawer>
        </Provider>
      </StyleProvider>
    );
  }
}

// export default codePush(App);
export default (App);
