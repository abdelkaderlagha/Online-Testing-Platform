import React, { Component } from "react";
import { Container, Segment, Item, Divider, Button } from "semantic-ui-react";

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Segment>
          <Item.Group divided>
            <Item>
              <Item.Content>
                <Item.Header>
                  <h1>Open Questions</h1>
                </Item.Header>
                <br />

                <Divider />
                <Item.Extra>
                  <Button
                    primary
                    content="Start Test"
                    onClick={() => this.props.startQuiz()}
                    size="big"
                    icon="play"
                    labelPosition="left"
                  />
                </Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <br />
      </Container>
    );
  }
}

export default Main;
