// Firebase
import { projectFirestore } from './firebase/config';

// Components
import CountdownTimer from './components/CountdownTimer';

// Styles
import './App.css';
import Home from './pages/Home';

function App() {
  // // Fetch snapshot of tasks collection and log to console
  // const time = projectFirestore.collection('tasks').get().then((snapshot) => {
  //   snapshot.docs.data(time);
  // })

  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
