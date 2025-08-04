import { useEffect, useRef, useState } from 'react'
import './App.css'

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";
import { AutoComplete } from "primereact/autocomplete";
import SideBar from './components/app/SideBar';
import './styles/app/style.css';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'primeicons/primeicons.css';
import Header from './components/app/Header';
import RoutesProvider from './routes/RoutesProvider';
import "/node_modules/primeflex/primeflex.css"
import { Toast } from 'primereact/toast';
import { useDispatch, useSelector } from 'react-redux';
import { toastSelector } from './store/selectors/appSelectors';
import { setToastAction } from './store/actions/appActions';

function App() {
          const [value, setValue] = useState('');
          const [items, setItems] = useState([]);
          const toast = useRef(null);
          const appToast = useSelector(toastSelector)
          const dispacth = useDispatch()

          const search = (event) => {
                    setItems([...Array(10).keys()].map(item => event.query + '-' + item));
          }
          useEffect(() => {
                    if(appToast) {
                              toast.current.show(appToast);
                    }
          }, [appToast])
          return (
                    <div className="d-flex">
                              <SideBar />
                              <Toast ref={toast} position='top-center' onHide={() => {
                                        dispacth(setToastAction(null))
                              }} />
                              <div className="main w-100" style={{ maxWidth: "calc(100% - 300px)"}}>
                                        <Header />
                                        <RoutesProvider />
                              </div>
                    </div>
          )
}
export default App
