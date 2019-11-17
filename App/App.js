import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import createStore from 'App/Stores'
import RootScreen from './Containers/Root/RootScreen'
import { mapping, dark as lightTheme } from '@eva-design/eva'
import { ApplicationProvider } from 'react-native-ui-kitten'
import SplashScreen from './Containers/SplashScreen/SplashScreen'
import { setI18nConfig } from './I18n'

const { store, persistor } = createStore()

export default class App extends Component {
  onBeforeLift() {
    setI18nConfig(); // set initial config
  }

  render() {
    return (
      /**
       * @see https://github.com/reduxjs/react-redux/blob/master/docs/api/Provider.md
       */
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <Provider store={store}>
          {/**
           * PersistGate delays the rendering of the app's UI until the persisted state has been retrieved
           * and saved to redux.
           * The `loading` prop can be `null` or any react instance to show during loading (e.g. a splash screen),
           * for example `loading={<SplashScreen />}`.
           * @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
           */}
          <PersistGate loading={<SplashScreen />} persistor={persistor}
            onBeforeLift={() => this.onBeforeLift()}>
            <RootScreen />
          </PersistGate>
        </Provider>
      </ApplicationProvider>
    )
  }
}
