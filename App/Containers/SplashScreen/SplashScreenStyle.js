import { StyleSheet } from 'react-native'
import ApplicationStyles from 'App/Theme/ApplicationStyles'

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoContainer: {
    width: '100%',
    height: 300,
    marginBottom: 25,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
})
