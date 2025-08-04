import { useCallback, useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { setBreadCrumbItemsAction, setToastAction } from "../../store/actions/appActions"
import { administration_routes_items } from "../../routes/admin/administration_routes"
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { useForm } from "../../hooks/useForm";
import { useFormErrorsHandle } from "../../hooks/useFormErrorsHandle";
import moment from "moment";
import fetchApi from "../../helpers/fetchApi";
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { FileUpload } from 'primereact/fileupload';
import wait from "../../helpers/wait";
import Loading from "../../components/app/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { Image } from 'primereact/image';

const initialForm = {
          nom: '',
          prenom: '',
          date_naissance: null,
          province: null,
          commune: null,
          zone: null,
          colline: null,
          image: null
}

export default function EditUtilisateurPage() {
          const dispacth = useDispatch()
          const [data, handleChange, setData, setValue] = useForm(initialForm)
          const [showCalendar, setShowCalendar] = useState(false);
          const [provinces, setProvinces] = useState([])
          const [communes, setCommunes] = useState([])
          const [zones, setZones] = useState([])
          const [collines, setCollines] = useState([])
          const [isSubmitting, setIsSubmitting] = useState(false)
          const navigate = useNavigate()
          const { idUtilisateur } = useParams()
          const [utilisateur, setUtilisateur] = useState(null)
          const [loadingUtilisateur, setLoadingUtilisateur] = useState(true)

          const { hasError, getError, setErrors, checkFieldData, isValidate, setError } = useFormErrorsHandle(data, {
                    nom: {
                              required: true,
                              alpha: true,
                              length: [2, 50]
                    },
                    prenom: {
                              required: true,
                              alpha: true,
                              length: [2, 50]
                    },
                    date_naissance: {
                              required: true
                    },
                    province: {
                              required: true
                    },
                    commune: {
                              required: true
                    },
                    zone: {
                              required: true
                    },
                    colline: {
                              required: true
                    },
                    image: {
                              required: true,
                              image: 4000000
                    }
          })
          const handleVisibility = (e) => {
                    setShowCalendar(!showCalendar);
          };

          const handleSubmit = async (e) => {
                    try {
                              e.preventDefault()
                              if (!isValidate()) return false
                              setIsSubmitting(true)
                              const form = new FormData()
                              form.append("nom", data.nom)
                              form.append("prenom", data.prenom)
                              form.append("id_colline", data.colline.code)
                              form.append("date_naissance", moment(data.date_naissance).format("YYYY-MM-DD"))
                              form.append("image", data.image)
                              const res = await fetchApi('/administration/utilisateurs', {
                                        method: 'POST',
                                        body: form
                              })
                              dispacth(setToastAction({ severity: 'success', summary: 'Utilisateur enregistré', detail: "L'utilisateur a été enregistré avec succès", life: 3000 }))
                              navigate('/utilisateurs')
                    } catch (error) {
                              console.log(error)
                              if (error.httpStatus == "UNPROCESSABLE_ENTITY") {
                                        setErrors(error.result)
                              } else {
                                        dispacth(setToastAction({ severity: 'error', summary: 'Erreur du système', detail: 'Erreur du système, réessayez plus tard', life: 3000 }));
                              }
                    } finally {
                              setIsSubmitting(false)
                    }
          }

          const fetchProvinces = useCallback(async () => {
                    try {
                              const res = await fetchApi("/system/provinces")
                              setProvinces(res.map(prov => {
                                        return {
                                                  name: prov.PROVINCE_NAME,
                                                  code: prov.PROVINCE_ID
                                        }
                              }))
                    } catch (error) {
                              console.log(error)
                    }
          }, [])

          useEffect(() => {
                    (async () => {
                              try {
                                        const res = await fetchApi(`/administration/utilisateurs/${idUtilisateur}`)
                                        const uti = res.result
                                        setUtilisateur(uti)
                                        setData({
                                                  nom: uti.nom,
                                                  prenom: uti.prenom,
                                                  date_naissance: uti.date_naissance,
                                                  province: { name: uti.colline.zone.commune.province.PROVINCE_NAME, code: uti.colline.zone.commune.province.PROVINCE_ID },
                                                  commune: { name: uti.colline.zone.commune.COMMUNE_NAME, code: uti.colline.zone.commune.COMMUNE_ID },
                                                  zone: { name: uti.colline.zone.ZONE_NAME, code: uti.colline.zone.ZONE_ID },
                                                  colline: { name: uti.colline.COLLINE_NAME, code: uti.colline.COLLINE_ID },
                                                  image: uti.image
                                        })
                              } catch (error) {
                                        console.log(error)
                              } finally {
                                        setLoadingUtilisateur(false)
                              }
                    })()
          }, [])

          useEffect(() => {
                    dispacth(setBreadCrumbItemsAction([
                              administration_routes_items.utilisateurs,
                              administration_routes_items.edit_utilisateurs
                    ]))
                    return () => {
                              dispacth(setBreadCrumbItemsAction([]))
                    }
          }, [])

          useEffect(() => {
                    fetchProvinces()
          }, [])

          useEffect(() => {
                    (async () => {
                              if (data.province) {
                                        try {
                                                  const res = await fetchApi(`/system/communes/${data.province.code}`)
                                                  setCommunes(res.map(comm => {
                                                            return {
                                                                      name: comm.COMMUNE_NAME,
                                                                      code: comm.COMMUNE_ID
                                                            }
                                                  }))
                                        } catch (error) {
                                                  console.log(error)
                                        }
                              }
                    })()
          }, [data.province])
          useEffect(() => {
                    (async () => {
                              if (data.commune) {
                                        try {
                                                  const res = await fetchApi(`/system/zones/${data.commune.code}`)
                                                  setZones(res.map(comm => {
                                                            return {
                                                                      name: comm.ZONE_NAME,
                                                                      code: comm.ZONE_ID
                                                            }
                                                  }))
                                        } catch (error) {
                                                  console.log(error)
                                        }
                              }
                    })()
          }, [data.commune])
          useEffect(() => {
                    (async () => {
                              if (data.zone) {
                                        try {
                                                  const res = await fetchApi(`/system/collines/${data.zone.code}`)
                                                  setCollines(res.map(coll => {
                                                            return {
                                                                      name: coll.COLLINE_NAME,
                                                                      code: coll.COLLINE_ID
                                                            }
                                                  }))
                                        } catch (error) {
                                                  console.log(error)
                                        }
                              }
                    })()
          }, [data.zone])

          useEffect(() => {
                    if (data.image) {
                              checkFieldData({ target: { name: "image" } })
                    }
          }, [data.image])

          const invalidClass = name => hasError(name) ? 'is-invalid' : ''
          if (loadingUtilisateur) {
                    return <div className="d-flex justify-content-center align-items-center h-100 w-100">
                              <div className="spinner-border" role="status" />
                    </div>
          }
          return (
                    <>
                              {isSubmitting ? <Loading /> : null}
                              <div className="px-4 py-3 main_content bg-white has_footer">
                                        <div className="">
                                                  <h1 className="mb-3">{utilisateur.nom} {utilisateur.prenom}</h1>
                                                  <hr className="w-100" />
                                        </div>
                                        <form className="form w-75 mt-5" onSubmit={handleSubmit}>
                                                  <div className="form-group col-sm">
                                                            <div className="row">
                                                                      <div className="col-md-4">
                                                                                <label htmlFor="nom" className="label mb-1">Nom</label>
                                                                      </div>
                                                                      <div className="col-sm">
                                                                                <InputText type="text" placeholder="Ecrire le nom" id="nom" name="nom" value={data.nom} onChange={handleChange} onBlur={checkFieldData} className={`w-100 is-invalid ${hasError('nom') ? 'p-invalid' : ''}`} />
                                                                                <div className="invalid-feedback" style={{ minHeight: 21, display: 'block' }}>
                                                                                          {hasError('nom') ? getError('nom') : ""}
                                                                                </div>
                                                                      </div>
                                                            </div>
                                                  </div>
                                                  <div className="form-group col-sm mt-5">
                                                            <div className="row">
                                                                      <div className="col-md-4">
                                                                                <label htmlFor="prenom" className="label mb-1">Prenom</label>
                                                                      </div>
                                                                      <div className="col-sm">
                                                                                <InputText type="text" placeholder="Ecrire le prenom" name="prenom" value={data.prenom} onChange={handleChange} onBlur={checkFieldData} className={`w-100 is-invalid ${hasError('prenom') ? 'p-invalid' : ''}`} />
                                                                                <div className="invalid-feedback" style={{ minHeight: 21, display: 'block' }}>
                                                                                          {hasError('prenom') ? getError('prenom') : ""}
                                                                                </div>
                                                                      </div>
                                                            </div>
                                                  </div>
                                                  <div className="form-group mt-5">
                                                            <div className="row">
                                                                      <div className="col-md-4">
                                                                                <label htmlFor="date_naissance" className="label mb-1">Date de naissance</label>
                                                                      </div>
                                                                      <div className="col-sm">
                                                                                <Calendar
                                                                                          value={data.date_naissance}
                                                                                          name="date_naissance"
                                                                                          onChange={e => {
                                                                                                    setValue("date_naissance", e.value)
                                                                                                    setError("date_naissance", {})
                                                                                          }}
                                                                                          placeholder="Choisir la date de naissance"
                                                                                          inputClassName="w-100"
                                                                                          onHide={() => {
                                                                                                    checkFieldData({ target: { name: "date_naissance" } })
                                                                                          }}
                                                                                          className={`d-block w-100 ${hasError('date_naissance') ? 'p-invalid' : ''}`}
                                                                                />
                                                                                <div className="invalid-feedback" style={{ minHeight: 21, display: 'block' }}>
                                                                                          {hasError('date_naissance') ? getError('date_naissance') : ""}
                                                                                </div>
                                                                      </div>
                                                            </div>
                                                  </div>
                                                  <div className="form-group mt-5">
                                                            <div className="row">
                                                                      <div className="col-md-4">
                                                                                <label htmlFor="province" className="label mb-1">Province</label>
                                                                      </div>
                                                                      <div className="col-sm">
                                                                                <Dropdown
                                                                                          value={data.province}
                                                                                          options={provinces}
                                                                                          onChange={e => setValue("province", e.value)}
                                                                                          optionLabel="name"
                                                                                          id="province"
                                                                                          filter
                                                                                          filterBy="name"
                                                                                          placeholder="Selectionner la province"
                                                                                          emptyFilterMessage="Aucun élément trouvé"
                                                                                          emptyMessage="Aucun élément trouvé"
                                                                                          name="province"
                                                                                          onHide={() => {
                                                                                                    checkFieldData({ target: { name: "province" } })
                                                                                          }}
                                                                                          className={`w-100 ${hasError('province') ? 'p-invalid' : ''}`}
                                                                                          showClear
                                                                                // valueTemplate={this.selectedCountryTemplate}
                                                                                // itemTemplate={this.countryOptionTemplate}
                                                                                />
                                                                                <div className="invalid-feedback" style={{ minHeight: 21, display: 'block' }}>
                                                                                          {hasError('province') ? getError('province') : ""}
                                                                                </div>
                                                                      </div>
                                                            </div>
                                                  </div>
                                                  {data.province ? <div className="form-group mt-5">
                                                            <div className="row">
                                                                      <div className="col-md-4">
                                                                                <label htmlFor="commune" className="label mb-1">Commune</label>
                                                                      </div>
                                                                      <div className="col-sm">
                                                                                <div className="w-100">
                                                                                          <Dropdown
                                                                                                    value={data.commune}
                                                                                                    options={communes}
                                                                                                    onChange={e => setValue("commune", e.value)}
                                                                                                    optionLabel="name"
                                                                                                    id="commune"
                                                                                                    filter
                                                                                                    showClear
                                                                                                    filterBy="name"
                                                                                                    placeholder="Selectionner la commune"
                                                                                                    emptyFilterMessage="Aucun élément trouvé"
                                                                                                    emptyMessage="Aucun élément trouvé"
                                                                                                    name="commune"
                                                                                                    onHide={() => {
                                                                                                              checkFieldData({ target: { name: "commune" } })
                                                                                                    }}
                                                                                                    className={`w-100 ${hasError('commune') ? 'p-invalid' : ''}`}
                                                                                          />
                                                                                          <div className="invalid-feedback" style={{ minHeight: 21, display: 'block' }}>
                                                                                                    {hasError('commune') ? getError('commune') : ""}
                                                                                          </div>
                                                                                </div>
                                                                      </div>
                                                            </div>
                                                  </div> : null}
                                                  {data.commune ? <div className="form-group mt-5">
                                                            <div className="row">
                                                                      <div className="col-md-4">
                                                                                <label htmlFor="zone" className="label mb-1">Zone</label>
                                                                      </div>
                                                                      <div className="col-sm">
                                                                                <div className="w-100">
                                                                                          <Dropdown
                                                                                                    value={data.zone}
                                                                                                    options={zones}
                                                                                                    onChange={e => setValue("zone", e.value)}
                                                                                                    optionLabel="name"
                                                                                                    id="zone"
                                                                                                    filter
                                                                                                    showClear
                                                                                                    filterBy="name"
                                                                                                    placeholder="Selectionner la zone"
                                                                                                    emptyFilterMessage="Aucun élément trouvé"
                                                                                                    emptyMessage="Aucun élément trouvé"
                                                                                                    name="zone"
                                                                                                    onHide={() => {
                                                                                                              checkFieldData({ target: { name: "zone" } })
                                                                                                    }}
                                                                                                    className={`w-100 ${hasError('zone') ? 'p-invalid' : ''}`}
                                                                                          />
                                                                                          <div className="invalid-feedback" style={{ minHeight: 21, display: 'block' }}>
                                                                                                    {hasError('zone') ? getError('zone') : ""}
                                                                                          </div>
                                                                                </div>
                                                                      </div>
                                                            </div>
                                                  </div> : null}
                                                  {data.zone ? <div className="form-group mt-5">
                                                            <div className="row">
                                                                      <div className="col-md-4">
                                                                                <label htmlFor="colline" className="label mb-1">Colline</label>
                                                                      </div>
                                                                      <div className="col-sm">
                                                                                <div className="w-100">
                                                                                          <Dropdown
                                                                                                    value={data.colline}
                                                                                                    options={collines}
                                                                                                    onChange={e => setValue("colline", e.value)}
                                                                                                    optionLabel="name"
                                                                                                    id="colline"
                                                                                                    filter
                                                                                                    showClear
                                                                                                    filterBy="name"
                                                                                                    placeholder="Selectionner la colline"
                                                                                                    emptyFilterMessage="Aucun élément trouvé"
                                                                                                    emptyMessage="Aucun élément trouvé"
                                                                                                    name="colline"
                                                                                                    onHide={() => {
                                                                                                              checkFieldData({ target: { name: "colline" } })
                                                                                                    }}
                                                                                                    className={`w-100 ${hasError('colline') ? 'p-invalid' : ''}`}
                                                                                          />
                                                                                          <div className="invalid-feedback" style={{ minHeight: 21, display: 'block' }}>
                                                                                                    {hasError('colline') ? getError('colline') : ""}
                                                                                          </div>
                                                                                </div>
                                                                      </div>
                                                            </div>
                                                  </div> : null}
                                                  <div className="form-group mt-5">
                                                            <div className="row">
                                                                      <div className="col-md-4">
                                                                                <label htmlFor="zone" className="label mb-1">Image</label>
                                                                      </div>
                                                                      <div className="col-sm">
                                                                                <div className="w-max mb-2">
                                                                                          <Image src={utilisateur.image} alt="Image" className="rounded" imageClassName="rounded " width="250" height="250" imageStyle={{objectFit: 'cover'}} preview />
                                                                                </div>
                                                                                <FileUpload
                                                                                          chooseLabel="Choisir l'image"
                                                                                          cancelLabel="Annuler"
                                                                                          name="image"
                                                                                          uploadOptions={{
                                                                                                    style: { display: 'none' }
                                                                                          }}
                                                                                          className="p-invalid"
                                                                                          accept="image/*"
                                                                                          maxFileSize={4000000}
                                                                                          invalidFileSizeMessageDetail="Image trop lourde(max: 4Mo)"
                                                                                          emptyTemplate={<p className="m-0">Glisser et déposez l'image ici.</p>}
                                                                                          onSelect={async e => {
                                                                                                    const file = e.files[0]
                                                                                                    setValue('image', file)
                                                                                          }}
                                                                                          onClear={() => {
                                                                                                    setError("image", {})
                                                                                          }}
                                                                                />
                                                                                <div className="invalid-feedback" style={{ minHeight: 21, display: 'block' }}>
                                                                                          {hasError('image') ? getError('image') : ""}
                                                                                </div>
                                                                      </div>
                                                            </div>
                                                  </div>
                                                  <div style={{ position: 'absolute', bottom: 0, right: 0 }} className="w-100 d-flex justify-content-end shadow-4 pb-3 pr-5 bg-white">
                                                            <Button label="Annuler" type="reset" outlined className="mt-3" size="small" onClick={e => {
                                                                      navigate("/utilisateurs")
                                                            }} />
                                                            <Button label="Modifier" type="submit" className="mt-3 ml-3" size="small" disabled={!isValidate() || isSubmitting} />
                                                  </div>
                                        </form>
                              </div>
                    </>
          )
}