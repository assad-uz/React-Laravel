import {BrowserRouter,Route,Routes} from 'react-router-dom';
import List from './pages/customer/list';
import Insert from './pages/customer/insert';
import Edit from './pages/customer/edit';


function App() {
  

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
            <Route exact path='/List' element = {<List/>}/>
            <Route exact path='/' element = {<Insert/>}/>
            <Route exact path='/edit/:id' element = {<Edit/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App