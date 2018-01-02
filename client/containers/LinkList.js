import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Link from './Link';

const ALL_LINKS_QUERY = gql`
query AllLinksQuery {
  allLinks {
    id
    createdAt
    url
    description
  }
}  
`

class LinkList extends React.Component {
  Yes = () => {

  }

  render() {
    // const { data: { loading, error, todos } } = this.props;
    // if (loading) {
    //   return <p>Loading...</p>;
    // } else if (error) {
    //   console.log(error);
    //   return <p>Error!</p>;
    // }
    // 1
  if (this.props.allLinksQuery && this.props.allLinksQuery.loading) {
    return <div>Loading</div>
  }

  // 2
  if (this.props.allLinksQuery && this.props.allLinksQuery.error) {
    return <div>Error</div>
  }

    const linksToRender = this.props.allLinksQuery.allLinks
  
    // const linksToRender = [{
      //   id: '1',
      //   description: 'The Coolest GraphQL Backend 😎',
      //   url: 'https://www.graph.cool'
      // }, {
      //   id: '2',
      //   description: 'The Best GraphQL Client',
      //   url: 'http://dev.apollodata.com/'
      // }]

    return (
      <div>
        {linksToRender.map(link => (
          <span key={link.id}>
            <Link link={link}/>
          </span>
        ))}
      </div>
    )
  }
}

export default graphql(ALL_LINKS_QUERY, { name: 'allLinksQuery' })(LinkList);
// export default graphql(ALL_LINKS_QUERY, { name: 'allLinksQuery' }) (LinkList);
