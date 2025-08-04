import { Dialog } from "primereact/dialog"

const Pop1 = ({ openDialog, setOpenDialog }) => {

    const variable = "Terry"
    return (
        <Dialog
            header="Mon second modal"
            visible={openDialog}
            onHide={() => setOpenDialog(!openDialog)}
            style={{ width: '50vw' }}
            position="center"
            
        > 
            <h1>Le premier pop Advaxe</h1>
            <div>hello mucatcha</div>

            {variable}
        </Dialog>
    )
}

export default Pop1