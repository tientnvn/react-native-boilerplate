import React from 'react'
import { View, Button, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import ExampleActions from 'App/Stores/Example/Actions'
import { liveInEurope } from 'App/Stores/Example/Selectors'
import Style from './ExampleScreenStyle'
import { Images } from 'App/Theme'
import { Layout, Text } from 'react-native-ui-kitten';
import { translate } from 'App/I18n'
import Icon from 'react-native-vector-icons/FontAwesome';

/**
 * This is an example of a container component.
 *
 * This screen displays a little help message and informations about a fake user.
 * Feel free to remove it.
 */

class ExampleScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout style={Style.container}>
        {this.props.userIsLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
            <View>
              <Text style={Style.instructions}>{translate("welcome")}</Text>
              <Icon name="rocket" size={30} color="#900" />
              {this.props.userErrorMessage ? (
                <Text style={Style.error}>{this.props.userErrorMessage}</Text>
              ) : (
                  <View>
                    <Text style={Style.result}>
                      {"I'm a fake user, my name is "}
                      {this.props.user.name}
                    </Text>
                    <Text style={Style.result}>
                      {this.props.liveInEurope ? 'I live in Europe !' : "I don't live in Europe."}
                    </Text>
                  </View>
                )}
              <Button onPress={() => this._fetchUser()} title="Refresh" />
            </View>
          )}
      </Layout>
    )
  }

  _fetchUser() {
    this.props.fetchUser()
  }
}

ExampleScreen.propTypes = {
  user: PropTypes.object,
  userIsLoading: PropTypes.bool,
  userErrorMessage: PropTypes.string,
  fetchUser: PropTypes.func,
  liveInEurope: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  user: state.example.user,
  userIsLoading: state.example.userIsLoading,
  userErrorMessage: state.example.userErrorMessage,
  liveInEurope: liveInEurope(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(ExampleActions.fetchUser()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExampleScreen)
