import { Dialog } from "primereact/dialog"

const PlusDetail = ({ openDialog, setOpenDialog, selectedArticles }) => {

    return (
        <Dialog
            header="Le pop up"
            visible={openDialog}
            onHide={() => setOpenDialog(!openDialog)}
            style={{ width: '50vw' }}
            position="center"
            
        >
         {selectedArticles?.NAME_ARTICLE} <br/>
         {selectedArticles?.PRICE_ARTICLE}  <br/> 
         {selectedArticles?.category?.DESIGNATION}   


        </Dialog>
    )
}

export default PlusDetail