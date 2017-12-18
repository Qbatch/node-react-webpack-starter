import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
  return class SelectableList extends Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
      defaultValue: PropTypes.number.isRequired,
    };

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
      });
    }

    handleRequestChange = (event, index) => {
      this.setState({
        selectedIndex: index,
      });
    };

    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

SelectableList = wrapState(SelectableList);

export default function SignUp(props) {
  return (
    <div>
      <h1>
        Sign Up
      </h1>
      <div>
        <TextField id="name-text-field" value={props.name} onChange={props.onNameValueChanged} />
      </div>
      <div>
        <TextField id="age-text-field" value={props.age} onChange={props.onAgeValueChanged} />
      </div>
      <div>
        <TextField id="username-text-field" value={props.username} onChange={props.onUsernameValueChanged} />
      </div>
      <div>
        <TextField id="email-text-field" value={props.email} onChange={props.onEmailValueChanged} />
      </div>
      <div>
        <TextField id="password-text-field" value={props.password} onChange={props.onPasswordValueChanged} />
      </div>
      <div>
        <SelectableList defaultValue={1}>
          <ListItem
            value={1}
            primaryText="Role"
            nestedItems={[
              <ListItem
                value={2}
                primaryText="Seller"
                onClick={() => props.onRoleChanged('Seller')}
              />,
              <ListItem
                value={3}
                primaryText="Buyer"
                onClick={() => props.onRoleChanged('Buyer')}
              />
            ]}
          />
        </SelectableList>
      </div>
      <div>
        <h3>{props.validation.error}</h3>
      </div>
      <div>
        <RaisedButton label="SignUp" onClick={props.onSignUpClicked} />
      </div>
    </div>
  );
}

SignUp.propTypes = {
  name: PropTypes.string,
  age: PropTypes.string,
  username: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  validation: PropTypes.object,
  onNameValueChanged: PropTypes.func.isRequired,
  onAgeValueChanged: PropTypes.func.isRequired,
  onUsernameValueChanged: PropTypes.func.isRequired,
  onEmailValueChanged: PropTypes.func.isRequired,
  onPasswordValueChanged: PropTypes.func.isRequired,
  onRoleChanged: PropTypes.func.isRequired,
  onSignUpClicked: PropTypes.func.isRequired
};
