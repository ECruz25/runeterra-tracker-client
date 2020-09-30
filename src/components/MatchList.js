import React, { useState, useEffect, useContext } from 'react';
import { getUrl } from '../utils/restClient';
import MatchForm from './MatchForm';
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
  return <div><div>Hi</div><MatchForm onChange={onChange}></MatchForm></div>
}