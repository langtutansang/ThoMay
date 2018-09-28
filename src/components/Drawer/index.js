import React from 'react';
import { connect } from 'react-redux'
import { Drawer } from 'native-base';
import Sidebar from './Sidebar'
class DrawerComponent extends React.Component {

  componentDidUpdate(){
    if(this.props.drawer.isOpen) this.drawer._root.close()
    else this.drawer._root.open()
  }
  render() {
    return (
      <Drawer
        tapToClose
        ref={(ref) => { this.drawer = ref; }}
        content={<Sidebar/>}
        onClose={this.closeDrawer} >
        {this.props.children}
      </Drawer>
    );
  }
}

function mapStateToProps ({ drawer }) {
  return {
    drawer
  }
}
export default  connect(mapStateToProps)(DrawerComponent);

