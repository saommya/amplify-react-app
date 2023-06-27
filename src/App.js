import logo from './logo.svg';
import './App.css';
import { Amplify, Storage, Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsconfig from './aws-exports';
import { API, graphqlOperation } from 'aws-amplify';
import { listNotes } from './graphql/queries';

import { createNote } from './graphql/mutations';

Amplify.configure(awsconfig);

function App() {

async function Test()
{
  const todos = await API.graphql(graphqlOperation(listNotes));
  console.log(todos);

  // Auth.currentAuthenticatedUser({
  //   bypassCache: false // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
  // })
  //   .then((user) => console.log(user))
  //   .catch((err) => console.log(err));

}

async function Test2()
{
  const todo = {name: "My first todo", description: "Hello world!", image: "img.png"};

  /* create a todo */
  const todoResult = await API.graphql(graphqlOperation(createNote, {input: todo}));

  console.log(todoResult);
}

async function storeS3()
{
  //const result = await Storage.put("test.txt", "Hello");

  const result = await Storage.put("test3.txt", "Private Content", {
    level: "private",
    contentType: "text/plain",
  });
  console.log(result);
}
async function getS3Files()
{

  // To get other users' objects
  const result = await Storage.get('test2.txt', {
    level: 'protected',
    identityId: 'us-east-1:9ec437fa-d427-411a-9781-3e4ebfd381f0' // the identityId of that user
  });

  console.log(result);
}

  return (
    <div className="App">
      <header className="App-header">
       <p> Hello</p>
        <button onClick={() => Test()}> Tokens </button>
        <button onClick={() => Test2()}> CreateNote </button>
        <button onClick={() => storeS3()}> Storage </button>
        <button onClick={() => getS3Files()}> GetOtherStorage </button>
      </header>
    </div>
  );
}

export default withAuthenticator(App);
//export default App;