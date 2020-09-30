import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom'
import UserContext from './UserContext';

export default function withAuth(ComponentToProtect) {
  return (props) => {
    const { user } = useContext(UserContext);
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
      if (user) {
        setRedirect(false)
      } else {
        setRedirect(false)
      }
    }, [user])
    if (redirect) {
      return <Redirect to="/login"></Redirect>
    }
    else {
      return (<React.Fragment>
        <ComponentToProtect {...props} />
      </React.Fragment>)
    }
  }
}