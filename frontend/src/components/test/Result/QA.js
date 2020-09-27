import React from 'react';
import { Table } from 'semantic-ui-react';

const QA = ({ questionsAndAnswers }) => (
  <Table celled striped>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>No.</Table.HeaderCell>
        <Table.HeaderCell>Questions</Table.HeaderCell>
        <Table.HeaderCell>Your Answers</Table.HeaderCell>
        <Table.HeaderCell>Correct Answers</Table.HeaderCell>
        <Table.HeaderCell>Points</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
        <Table.Row >
          <Table.Cell></Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell></Table.Cell>
        </Table.Row>
    </Table.Body>
  </Table>
);

export default QA;