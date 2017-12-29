import React from 'react';
import PropTypes from 'prop-types';
import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList';
import Paper from 'material-ui/Paper';
import Card, { CardActions, CardHeader, CardContent } from 'material-ui/Card';
import ExpansionPanel, { ExpansionPanelSummary, ExpansionPanelDetails } from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Moment from 'moment';

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
          <GridList cols={2.5}>
          {/* <Paper elevation={5}> */}
            {products && products.map(item => (
              <Card key={item.id}>
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <CardHeader
                      title={item.name}
                      subheader={Moment(item.createdAt).format('DD/MM/YYYY HH:mm')}
                    />
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <CardContent>
                      <Typography>Color: {item.price}</Typography>
                      <Typography>Size: {item.size}</Typography>
                      <Typography>Price: {item.price}</Typography>
                      <Typography>Description: {item.description}</Typography>
                    </CardContent>
                  </ExpansionPanelDetails>
                  <ExpansionPanelDetails>
                    <CardActions>
                      <Button raised onClick={() => onEditProductClicked(item)} >Edit</Button>
                      <Button raised onClick={() => onDeleteProductClicked(item.id)} >Delete</Button>
                    </CardActions>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </Card>
            ))}
          {/* </Paper> */}
          </GridList>
        </div>
        <div>
          <Button raised onClick={() => onAddProductClicked()} >Add</Button>
        </div>
      </div>
    );
  }
}

Seller.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAddProductClicked: PropTypes.func.isRequired,
  onEditProductClicked: PropTypes.func.isRequired,
  onDeleteProductClicked: PropTypes.func.isRequired
};
