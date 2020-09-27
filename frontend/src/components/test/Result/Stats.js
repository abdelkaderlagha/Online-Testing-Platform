import React from 'react';
import { Segment, Header, Button } from 'semantic-ui-react';
import ShareButton from '../ShareButton';

import { calculateGrade } from '../utils/calculateGrade';
import { timeConverter } from '../utils/timeConverter';

const Stats = props => {
  

  
 
  

  return (
    <Segment>
      <Header as="h1" textAlign="center" block>
        
      </Header>
      <Header as="h2" textAlign="center" block>
        Grade: 
      </Header>
      <Header as="h3" textAlign="center" block>
        Total Questions: 
      </Header>
      <Header as="h3" textAlign="center" block>
        Correct Answers: 
      </Header>
      <Header as="h3" textAlign="center" block>
        Your Score: %
      </Header>
      <Header as="h3" textAlign="center" block>
        Passing Score: 60%
      </Header>
      <Header as="h3" textAlign="center" block>
        Time Takes: 
      </Header>
      <div style={{ marginTop: 35 }}>
       
        <ShareButton />
      </div>
    </Segment>
  );
};

export default Stats;