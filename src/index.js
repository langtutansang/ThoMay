import React, {Component} from 'react';
// import codePush from 'react-native-code-push';
import Scenes from '@scenes';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Drawer from '@components/Drawer'
import { Root, StyleProvider } from 'native-base';
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
      <Root>
        <StyleProvider style={getTheme(material)}>
          <Provider store={store}>

            <Drawer>
              <Scenes/>
            </Drawer>
          </Provider>
        </StyleProvider>
      </Root>

    );
  }
}

// export default codePush(App);
export default (App);
