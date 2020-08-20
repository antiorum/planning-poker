import { ServiceConsumer } from '../service-context';
import React from 'react';

const withService = () => (Wrapped) => {

  return (properties) => {
    return (<ServiceConsumer>
      {
        (service) => {
          return <Wrapped {...properties} service={service} />;
        }
      }
    </ServiceConsumer>);
  };
};

export default withService;
