import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';

import { Footer, FooterTab, Button, Icon, Text, Badge } from 'native-base';
class FooterComponent extends Component {
  render() {
    let { routeName } = this.props;
    let content = [{
      name: "Bảng",
      icon: "home",
      badge: 0,
      router: 'home'

    },
    {
      name: "Danh mục",
      icon: "list",
      badge: 0,
      router: 'list'

    },
    {
      name: "Sản phẩm",
      icon: "grid",
      badge: 0,
      router: 'home'

    },
    {
      name: "Khác",
      icon: "md-cloud-circle",
      badge: 0,
      router: 'home'
    }
    ]
    return (
      <Footer>
        <FooterTab>
          {content.map((e, key) => {
            let {icon, name, badge, router } = e
            return <Button 
              badge={e.badge !== 0 ? true : false} 
              vertical key={ key } 
              active={router === routeName ? true: false}
              onPress={()=> Actions[router]({type: 'replace'})}
              >
              {e.badge !== 0 && <Badge><Text>{badge}</Text></Badge>}
              <Icon active={router === routeName ? true: false} name={icon} />
              <Text>{name}</Text>
            </Button>
          })}


        </FooterTab>
      </Footer>
    );
  }
}
export default FooterComponent;


