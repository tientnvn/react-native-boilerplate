import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import createStore from 'App/Stores'
import RootScreen from './Containers/Root/RootScreen'
import { mapping, dark as lightTheme } from '@eva-design/eva'
import { ApplicationProvider } from 'react-native-ui-kitten'
import SplashScreen from './Containers/SplashScreen/SplashScreen'
import { I18nManager } from 'react-native'
import * as RNLocalize from "react-native-localize";
import i18n from "i18n-js";
import memoize from "lodash.memoize";

const translationGetters = {
  // lazy requires (metro bundler does not support symlinks)
  vi: () => require("App/Languages/vi.json"),
  en: () => require("App/Languages/en.json")
};

const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
);



const setI18nConfig = () => {
  // fallback if no available language fits
  const fallback = { languageTag: "en", isRTL: false };

  const { languageTag, isRTL } =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback;

  // clear translation cache
  translate.cache.clear();
  // update layout direction
  I18nManager.forceRTL(isRTL);
  // set i18n-js config
  i18n.translations = { [languageTag]: translationGetters[languageTag]() };
  i18n.locale = languageTag;
};

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
