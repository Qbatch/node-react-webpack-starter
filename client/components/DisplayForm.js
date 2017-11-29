import React from 'react';
// import { injectStripe } from 'react-stripe-elements';
// import { connect } from 'react-redux';

export default class DisplayForm extends React.Component {
  handleSubmit = (ev) => {
    console.log('h');
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();

    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    this.props.stripe.createToken({name: 'Jenny Rosen'}).then(({token}) => {
      console.log('Received Stripe token:', token);
    });

    // However, this line of code will do the same thing:
    // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <button>Confirm order</button>
      </form>   
    );
  }
}

// export default injectStripe(connect(null, {})(DisplayForm));
// export default connect(mapStateToProps, mapDispatchToProps, mergeProps, {
//   pure: false,
// })(injectStripe(_CardForm));

// connect(null, {})
// connect()
