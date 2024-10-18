import React, { useEffect } from 'react'
import './admin.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../redux/Actions/actionUser'
function Admin() {
  const Users=useSelector(state=>state.userReducer.users)
  const dispatch=useDispatch()
//  console.log(Users);
  useEffect(() => {
    dispatch( getAllUsers()) 
  }, [dispatch])
  
  return (
    <div className="containerAdm">
      <h2 className="titlAdm">Users List</h2>

      <table>
        <tbody>
          <tr className='thead'>
            <th>name</th>
            <th>role</th> 
            <th>Email</th>
          </tr>

          {Users &&
            Users.map((el, index) => (
              <tr className="tr" key={el.id || index}>
                <td>{el.name}</td>
                <td>{el.role}</td>
                <td>{el.email}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin