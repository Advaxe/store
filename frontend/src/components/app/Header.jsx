import "../../styles/app/header.css"
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import moment from 'moment'
import Image from '../../../public/images/advaxe.jpg'
import { Badge } from 'primereact/badge';
import BreadCrumb from "./BreadCrumb";

export default function Header() {
          const items = [{  label: 'Computer' }, { label: 'Notebook' }, { label: 'Accessories' }, { label: 'Backpacks' }, { label: 'Item' }];
          const home = { icon: 'pi pi-home', url: 'https://primereact.org' }

          return (
                    <header className="d-flex align-items-center justify-content-between px-4">
                              <div className="d-flex align-items-center">
                                        <div className="text-muted">
                                                  { moment().format("dddd DD MMM YYYY HH:mm")}
                                        </div>
                                        <BreadCrumb />
                              </div>
                              <div className="flex align-items-center py-2">
                                        <Button rounded text aria-label="Messages" size="small" className="mx-1">
                                                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-chat-left-text" viewBox="0 0 16 16">
                                                  <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                                  <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                                                  </svg>
                                        </Button>
                                        <Button rounded text aria-label="Notifications" size="small" className="mx-1">
                                                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                                                  <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
                                                  </svg>
                                                  <Badge size={'normal'} value="9" severity="success" style={{
                                                            position: 'absolute',
                                                            top: -1,
                                                  }}></Badge>
                                        </Button>
                                        <button className="btn p-0 avatar mx-2">
                                                  <img src={Image} alt="Profile"  className=""/>
                                        </button>
                              </div>
                    </header>
          )
}