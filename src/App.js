import React, { useState, useEffect } from "react";
import "./App.css";
import userdata from "./data";

function App() {
  const [mydata, setUserData] = useState({ users: [] });
  const [count, setCount] = useState(0);
  const [showPopUp, setShowPopUp] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState("");
  const [password, setPassword] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [rerender, setRerender] = useState(false);
  const [editId, setEditId] = useState(55);
  const [rollbackUser, setRollbackUser] = useState(null);

  const addUser = () => {
    if (
      userName === "" ||
      lastName === "" ||
      firstName === "" ||
      email === "" ||
      password === "" ||
      profile === ""
    ) {
      alert("Please Enter all the fields including profile");
      return;
    }
    setShowEdit(false);
    var user = {
      firstName,
      lastName,
      userName,
      email,
      profile,
      password,
      id: Math.random().toFixed(2) * 100,
    };
    setEditId(user.id);
    var userObject = mydata;
    userObject.users.push(user);
    setUserData(userObject);
  };

  const deleteUser = (myid) => {
    for (var i = 0; i < mydata.users.length; i++) {
      if (mydata.users[i].id == myid) {
        mydata.users.splice(i, 1);
        break;
      }
    }
    setRerender(!rerender);
  };

  const editUser = (myid) => {
    setEditId(myid);
    var editUser = mydata.users.find((item) => item.id === myid);
    setFirstName(editUser.firstName);
    setLastName(editUser.lastName);
    setEmail(editUser.email);
    setPassword(editUser.password);
    setUserName(editUser.username);
    setShowPopUp(false);
    setShowEdit(true);
  };

  const editMyUser = () => {
    if (
      userName === "" ||
      lastName === "" ||
      firstName === "" ||
      email === "" ||
      password === "" ||
      profile === ""
    ) {
      alert("Please Enter all the fields including profile");
      return;
    }

    var rollback = mydata.users.find((item) => item.id === editId);
    setRollbackUser(JSON.parse(JSON.stringify(rollback)));
    mydata.users.map((item) => {
      if (item.id === editId) {
        item.userName = userName;
        item.lastName = lastName;
        item.firstName = firstName;
        item.email = email;
        item.password = password;
        item.profile = profile;
        return item;
      } else {
        return item;
      }
    });
  };

  const cancelUser = () => {
    if(rollbackUser !== null){
    mydata.users.map((item) => {
      if (item.id === editId) {
        item.userName = rollbackUser.userName;
        item.lastName = rollbackUser.lastName;
        item.firstName = rollbackUser.firstName;
        item.email = rollbackUser.email;
        item.password = rollbackUser.password;
        item.profile = rollbackUser.profile;
        return item;
      } else {
        return item;
      }
    });
    }
    console.log(mydata.users);
  };

  const clearField = () => {
    setFirstName("");
    setLastName("");
    setUserName("");
    setEmail("");
    setProfile("");
    setPassword("");
    for (var i = 0; i < mydata.users.length; i++) {
      if (mydata.users[i].id == editId) {
        mydata.users.splice(i, 1);
        break;
      }
    }
    setEditId(0);
    setRerender(!rerender);
  };

  const closePopUp = () => {
    setShowPopUp(false);
    setFirstName("");
    setLastName("");
    setUserName("");
    setEmail("");
    setProfile("");
    setPassword("");
  };

  useEffect(() => {
    if (count === 0) {
      setUserData(userdata);
      setCount(1);
    }
  }, [mydata.users, mydata]);

  return (
    <div className="container">
      <div className="user_container">
        {mydata.users.map((item, index) => {
          return (
            <div className="card">
              <div className="card-header">
                <img
                  src="./images/edit.png"
                  style={{ height: "30px", width: "30" }}
                  onClick={() => editUser(item.id)}
                />
                <img
                  src="./images/bin.png"
                  style={{ height: "25px", width: "25px" }}
                  onClick={() => deleteUser(item.id)}
                />
              </div>
              <div className="card-body">
                <span
                  className="profile"
                  style={{ backgroundColor: item.profile }}
                >
                  {item.firstName.charAt(0).toUpperCase()}
                </span>
                <span>
                  {`${item.firstName} ${item.lastName}`.toUpperCase()}
                </span>
              </div>
              <div className="card_details">
                <span>
                  {item.username}
                </span>
                <span>
                  {item.email}
                </span>
              </div>
            </div>
          );
        })}
      </div>


      {showPopUp ? (
        <div className="add_user_container">
          <div className="add_user_header">
            <h3>Add User</h3>
            <img
              src="./images/cancel.png"
              style={{ height: "30px", width: "30", borderRadius: "15px" }}
              onClick={closePopUp}
            />
          </div>
          <div className="add_user_body">
            <form>
              <div className="input_body">
                <label className="label" htmlFor="firstname">
                  First Name
                </label>
                <input
                  type="text"
                  className="firstname"
                  value={firstName}
                  id="firstname"
                  placeholder="Enter your firstname"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="input_body">
                <label className="label" htmlFor="lastname">
                  Last Name
                </label>
                <input
                  type="text"
                  className="lastname"
                  value={lastName}
                  id="lastname"
                  placeholder="Enter your lastname"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="input_body">
                <label className="label" htmlFor="profile">
                  Profiles
                </label>
                <select
                  onChange={(e) => setProfile(e.target.value)}
                  value={profile}
                >
                  <option selected>cyan</option>
                  <option>green</option>
                  <option>red</option>
                  <option>silver</option>
                  <option>gray</option>
                  <option>yellow</option>
                  <option>yime</option>
                  <option>blue</option>
                  <option>navy</option>
                </select>
              </div>

              <div className="input_body">
                <label className="label" htmlFor="username">
                  User Name
                </label>
                <input
                  type="text"
                  className="username"
                  value={userName}
                  id="username"
                  placeholder="Enter your username"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="input_body">
                <label className="label" htmlFor="passwprd">
                  Password
                </label>
                <input
                  type="password"
                  className="password"
                  value={password}
                  id="password"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="input_body">
                <label className="label" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  className="email"
                  value={email}
                  id="email"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </form>
          </div>

          <div className="add_user_footer">
            <button className="btncancel" onClick={clearField}>
              Cancel
            </button>
            <button className="btnadd" onClick={addUser}>
              Add
            </button>
          </div>
        </div>
      ) : null}



      {showEdit ? (
        <div className="add_user_container">
          <div className="add_user_header">
            <h3>Edit User</h3>
            <img
              src="./images/cancel.png"
              style={{ height: "30px", width: "30", borderRadius: "15px" }}
              onClick={() => setShowEdit(false)}
            />
          </div>
          <div className="add_user_body">
            <form>
              <div className="input_body">
                <label className="label" htmlFor="firstname">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  className="firstname"
                  id="firstname"
                  placeholder="Enter your firstname"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="input_body">
                <label className="label" htmlFor="lastname">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  className="lastname"
                  id="lastname"
                  placeholder="Enter your lastname"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="input_body">
                <label className="label" htmlFor="profile">
                  Profiles
                </label>
                <select onChange={(e) => setProfile(e.target.value)}>
                  <option selected>cyan</option>
                  <option>green</option>
                  <option>red</option>
                  <option>silver</option>
                  <option>gray</option>
                  <option>yellow</option>
                  <option>lime</option>
                  <option>blue</option>
                  <option>navy</option>
                </select>
              </div>

              <div className="input_body">
                <label className="label" htmlFor="username">
                  User Name
                </label>
                <input
                  type="text"
                  value={userName}
                  className="username"
                  id="username"
                  placeholder="Enter your username"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="input_body">
                <label className="label" htmlFor="passwprd">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  className="password"
                  id="password"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="input_body">
                <label className="label" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  className="email"
                  id="email"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </form>
          </div>

          <div className="add_user_footer">
            <button className="btncancel" onClick={cancelUser}>
              Cancel
            </button>
            <button className="btnadd" onClick={editMyUser}>
              Edit
            </button>
          </div>
        </div>
      ) : null}

      <button className="btnshow" onClick={() => setShowPopUp(true)}>
        Add User
      </button>
    </div>
  );
}

export default App;
