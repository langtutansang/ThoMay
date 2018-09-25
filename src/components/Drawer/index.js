import React from 'react';
import { Drawer } from 'native-base';
import Sidebar from './Sidebar'
class DrawerComponent extends React.Component {

  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
  };
  render() {
    return (
      <Drawer
        open
        tapToClose
        ref={(ref) => { this.drawer = ref; }}
        content={<Sidebar/>}
        onClose={() => this.closeDrawer()} >
        {this.props.children}
      </Drawer>
    );
  }
}
export default DrawerComponent;


