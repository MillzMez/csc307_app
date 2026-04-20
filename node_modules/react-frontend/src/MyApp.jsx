// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index, id) {
  fetch(`http://localhost:8000/users/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (res.status === 200 || res.status === 204) {
        const updated = characters.filter((_, i) => i !== index);
        setCharacters(updated);
      }
    })
    .catch((error) => console.log(error));
  }

  /*function updateList(person) {
  postUser(person)
    .then(() => {
      setCharacters([...characters, person]);
    })
    .catch((error) => console.log(error));
  }*/
 function updateList(person) {
  postUser(person)
    .then((res) => {
      if (res.status !== 201) throw new Error();
      return res.json();
    })
    .then((newUser) => {
      setCharacters((prev) => [...prev, newUser]);
    })
    .catch(console.log);
}

  function postUser(person) {
  return fetch("http://localhost:8000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(person),
  });
  }

  function fetchUsers() {
    return fetch("http://localhost:8000/users");
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json.users_list))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}


// function MyApp() {
//   return (
//     <div>
//       <h1>Hello, React!</h1>
//     </div>
//   );
// }
export default MyApp;