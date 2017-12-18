import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

export default class Seller extends React.PureComponent {
  render() {
    const {
      products,
      onAddProductClicked,
      onEditProductClicked,
      onDeleteProductClicked
    } = this.props;

    return (
      <div>
        <div>
          <Paper zDepth={5} rounded={false}>
            {products && products.map((item, index) => (
              <Card key={index}>
                <CardHeader
                  title={item.name}
                  actAsExpander={true}
                  showExpandableButton={true}
                />
                <CardText expandable={true}>
                  Color: {item.price}
                </CardText>
                <CardText expandable={true}>
                  Size: {item.size}
                </CardText>
                <CardText expandable={true}>
                  Price: {item.price}
                </CardText>
                <CardText expandable={true}>
                  Description: {item.description}
                </CardText>
                <CardActions>
                  <FlatButton label="Edit" primary={true} onClick={() => onEditProductClicked(item)} />
                  <FlatButton label="Delete" secondary={true} onClick={() => onDeleteProductClicked(item.id)} />
                </CardActions>
              </Card>
            ))}
          </Paper>
        </div>
        <div>
          <RaisedButton label="Add" primary={true} onClick={() => onAddProductClicked()} />
        </div>
      </div>
    );
  }
}

Seller.propTypes = {
  products: PropTypes.array,
  onAddProductClicked: PropTypes.func.isRequired,
  onEditProductClicked: PropTypes.func.isRequired,
  onDeleteProductClicked: PropTypes.func.isRequired
};
