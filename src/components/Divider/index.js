import React from 'react';
import { Text, View } from 'react-native';

import styles from './styles';
 
class Divider extends React.Component {

  render() {
    defaultProps = {
      dashed: false,
      orientation: 'left',
      color: 'rgba(0,0,0,.85)',
      borderColor: '#e8e8e8'
    };

    props = {...defaultProps, ...this.props}
    return (
      <View style={styles.container}>
        <View
            style={[
                styles.line,
                { borderColor: props.borderColor },
                props.dashed && styles.dashed,
                props.orientation === 'left' ? styles.shortWidth : { flex: 1 }
            ]}
        />
        <Text style={[styles.text, { color: props.color }]}>{props.children}</Text>
        <View
            style={[
                styles.line,
                { borderColor: props.borderColor },
                props.dashed && styles.dashed,
                props.orientation === 'right' ? styles.shortWidth : { flex: 1 }
            ]}
        />
    </View>
    )
  }
}


export default Divider;