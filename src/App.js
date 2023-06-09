// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import Users from './components/Users';

function App() {
  // step1 : declare three states here : users, isLoading, error
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // step2 : use useEffect for fetching the data including updating isLoading and error states
  useEffect(()=>{
    fetch("https://jsonplaceholder.typicode.com/users")
    .then((res)=>{
      if(!res.ok){
        throw Error("Fetching is not successfull");
      }
      else {
        return res.json();
      }
    })
    .then((data)=>{
      // console.log(data)
      setUsers(data);
      setIsLoading(false);
      setError(null);
    })
    .catch((error)=>{
      setError(error.message);
      setIsLoading(false);
    })

  }, []);

  const usersElement = users &&  <Users users={users} />;
    

  return (
    <div className="container">
      <h1 className="title">Users Management App</h1>
      {isLoading && <p>Loading users...</p>}
      {error && <p>{error}</p>}
      {
        usersElement
      }
    </div>
  );
}

export default App;
