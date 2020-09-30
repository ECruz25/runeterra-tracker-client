import React, { useState, useEffect, useContext } from 'react';
import { getUrl } from '../utils/restClient';
import MatchForm from './MatchForm';
import Table from './Table';
import UserContext from './UserContext';

export default () => {
  const { user } = useContext(UserContext);
  const [matches, setMatches] = useState([]);
  const [newMatchValues, setNewMatchValues] = useState({})

  useEffect(() => {
    loadMatches()
  }, [])

  const onChange = (field, value) => {
    const newFormValues = {
      ...newMatchValues,
      [field]: value
    };
    setNewMatchValues(newFormValues);
  };


  const loadMatches = async () => {
    if (!user) {
      return
    }
    const response = await fetch(`${getUrl()}/Match/${user.accountid}`);
    const data = await response.json()
    setMatches(data)
  }

  const submitNewMatch = async () => { }

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "70% 30%",
      margin: "60px 100px"
    }}>
      <Table data={matches} columns={[{
        name: 'DeckId',
        index: 1,
        title: 'DeckId',
        dataIndex: 'DeckId',
        key: 'DeckId'
      }]}></Table>
      <MatchForm onChange={onChange}></MatchForm>
    </div>
  );
}