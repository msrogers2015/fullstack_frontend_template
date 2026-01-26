import React from 'react';
import {getUserData} from "../../utils/Auth";
import LogoutButton from "../../components/Buttons/Logout";

function Dashboard() {
  const user = getUserData()
  console.log(user)

  return (
    <>
     Welcome {user.full_name.split(' ')[0]}
      <LogoutButton buttonType={'outline'} />
    </>
  )
}

export default Dashboard;