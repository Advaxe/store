import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import Loading from "../../../components/app/Loading"
import fetchApi from "../../../helpers/fetchApi"
import { useForm } from "../../../hooks/useForm"
import { useFormErrorsHandle } from "../../../hooks/useFormErrorsHandle"
import { setBreadCrumbItemsAction, setToastAction } from "../../../store/actions/appActions"

// formulaire à soumettre
const initialForm = {
  PILL: '',
  PRICE: '',
}

const AddPill = () => {
//ici commence le style css du formulaire
  const divStyle = {
    backgroundColor: 'blue',
    padding: '20px',
    border: '2px dashed gray',
};

const formular = {
  backgroundColor: 'lightgray',
  padding: '20px',
  border: '2px dashed blue',
};
//ici se termine le style css du formulaire
  const dispacth = useDispatch()
  const [data, handleChange, setData, setValue] = useForm(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()


  // pour la gestion du formulaire 
  const { hasError, getError, setErrors, checkFieldData, run, isValidate, setError } = useFormErrorsHandle(data, {
    DESIGNATION: {
      required: true,
      alpha: true,
      length: [2, 20]
    },
    PRICE: {
        length: [4, 6],
        required: true
    },
  })

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      if (!isValidate()) return false
      setIsSubmitting(true)
      const form = new FormData()
      form.append("DESIGNATION", data.DESIGNATION)
      form.append("PRICE", data.PRICE)

      await fetchApi('/pill/create', {
        method: 'POST',
        body: form
      })

      dispacth(setToastAction({ severity: 'success', summary: 'Pill saved', detail: "Pill saved successfully, CONGRANTS", life: 5000 }))
      navigate('../../utilisateurs')
    } catch (error) {
      console.log(error)
      if (error.httpStatus == "UNPROCESSABLE_ENTITY") {
        setErrors(error.result)
      } else {
        dispacth(setToastAction({ severity: 'error', summary: 'Internal error', detail: 'An internal error occured, PLEASE RETRY', life: 5000 }));
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    dispacth(setBreadCrumbItemsAction([
      // administration_routes_items.utilisateurs,
      // administration_routes_items.new_utilisateurs
    ]))
    return () => {
      dispacth(setBreadCrumbItemsAction([]))
    }
  }, [])



  return (
    <>
      {isSubmitting ? <Loading /> : null}
      <div className="px-4 py-3 main_content bg-lightgray has_footer" style={formular}>
        <div className="">
        <div style={divStyle}>
          <center> <h1> Form to add new pills</h1></center>
        </div>
          <hr className="w-100" />
        </div>
        <form className="form w-75 mt-5" onSubmit={handleSubmit}>
          <div className="form-group col-sm">
            <div className="row">
              <div className="col-md-3">
                <label htmlFor="DESIGNATION" className="label mb-1">DESIGNATION</label>
              </div>
            
              <div className="col-md-3">
                <InputText autoFocus type="text" placeholder="The pill" id="DESIGNATION" name="DESIGNATION" value={data.DESIGNATION} onChange={handleChange} onBlur={checkFieldData} className={`w-100 is-invalid ${hasError('DESIGNATION') ? 'p-invalid' : ''} `} />
                <div className="invalid-feedback" style={{ minHeight: 21, display: 'block' }}>
                  {hasError('DESIGNATION') ? getError('DESIGNATION') : ""}
                </div>
              </div>

              <div className="col-md-3">
                <label htmlFor="PRICE" className="label mb-1">PRICE</label>
              </div>
              <div className="col-md-3">
                <InputText  type="text" placeholder="The price" id="PRICE" name="PRICE" value={data.PRICE} onChange={handleChange} onBlur={checkFieldData} className={`w-100 is-invalid ${hasError('PRICE') ? 'p-invalid' : ''} `} />
                <div className="invalid-feedback" style={{ minHeight: 21, display: 'block' }}>
                  {hasError('PRICE') ? getError('PRICE') : ""}
                </div>
              </div>
              </div>

              
          </div>
          <div style={{ position: 'absolute', bottom: 0, right: 0 }} className="w-100 d-flex justify-content-end shadow-4 pb-3 pr-5 bg-white">
            <Button label="Reinitialiser" type="reset" outlined className="mt-3" size="small" onClick={e => {
              e.preventDefault()
              setData(initialForm)
              setErrors({})
            }} />
            <Button label="Envoyer" type="submit" className="mt-3 ml-3" size="small" disabled={!isValidate() || isSubmitting} />
          </div>
        </form>
      </div>


    </>
  )
}

export default AddPill