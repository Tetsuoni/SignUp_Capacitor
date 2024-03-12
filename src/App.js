import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

function App() {

  const [ user, setUser ] = useState({});

  function handleCallBackResponse(response) {
    console.log("Enconced JWT ID token:" + response.credential);
    var userObject = jwtDecode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event){
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "935845557923-s1pbkltk8ls1nkfnu3ur4to5dmb6td74.apps.googleusercontent.com",
      callback: handleCallBackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large"}
    );

    google.accounts.id.prompt();
  }, []); //Como queremos que solo se ejecute una vez, se deja vacío

  //Si no hay usuario, mostramos el botón de inicio de sesión
  //Si tenemos usuario, mostramos el botón de cerrar sesión

  return (
    <div className="App">
      <div id="signInDiv"></div>
      {Object.keys(user).length !== 0 &&
        <button onClick={ (e) => handleSignOut(e)}>Sign Out</button>
      }
      
    {user &&
      <div>
        <img src={user.picture}></img>
        <h3>{user.name}</h3>
      </div>
    }
    </div>
  );
}

export default App;
