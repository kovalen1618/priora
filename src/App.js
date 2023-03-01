// Firebase
import { projectFirestore } from './firebase/config';

// Styles
import './App.css';

function App() {
  // Fetch snapshot of tasks collection and log to console
  projectFirestore.collection('tasks').get().then((snapshot) => {
    console.log(snapshot);
  })

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
