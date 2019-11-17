import React from 'react'
import { View, Image } from 'react-native'
import styles from './SplashScreenStyle'
import { Layout, Text } from 'react-native-ui-kitten'
import { Images } from 'App/Theme'

export default class SplashScreen extends React.Component {
  render() {
    return (
      <Layout style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={Images.logo} resizeMode={'contain'} />
        </View>
      </Layout>
    )
  }
}
