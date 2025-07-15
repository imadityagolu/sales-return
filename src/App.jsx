
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import First from './Pages/First';
import SalesReturn from './Pages/SalesReturn';
import AddSalesReturn from './Pages/AddSalesReturn';

const router = createBrowserRouter([
  {
    path:'/',
    element: <First/>,
    children: [
      {
        index: true,
        element: <SalesReturn/>
      },
      {
        path:'/AddSalesReturn',
        element: <AddSalesReturn/>
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App
