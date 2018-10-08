import React, { Component } from 'react';

import { Footer, FooterTab, Button, Icon, Text, Badge } from 'native-base';
import { TITLE_HOME, TITLE_CATEGORY, TITLE_PRODUCT, TITLE_OTHER} from '@constants/title'
import { withNavigation  } from 'react-navigation';
import navigateReset from '@components/Navigate';

class FooterComponent extends Component {
  render() {
    let { navigation: { state: { routeName, params } } }= this.props;
    let content = [{
      name: TITLE_HOME,
      icon: "home",
      badge: 0,
      router: 'home'

    },
    {
      name: TITLE_CATEGORY,
      icon: "list",
      badge: 0,
      router: 'list'

    },
    {
      name: TITLE_PRODUCT,
      icon: "grid",
      badge: 0,
      router: 'home'

    },
    {
      name: TITLE_OTHER,
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
              active={ (router === routeName || ( !!params && !!params.preRoute && router === params.preRoute) ) ? true : false }
              onPress={()=> navigateReset(this.props.navigation,router)}
              >
              {e.badge !== 0 && <Badge><Text>{badge}</Text></Badge>}
              <Icon name={icon} />
              <Text>{name}</Text>
            </Button>
          })}


        </FooterTab>
      </Footer>
    );
  }
}
export default withNavigation(FooterComponent);


