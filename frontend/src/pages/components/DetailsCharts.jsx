import { Dialog } from "primereact/dialog"
import { useEffect, useRef, useState } from "react"
import fetchApi from "../../helpers/fetchApi";
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import UserImage from "../../../public/images/user.png"
import { SlideMenu } from "primereact/slidemenu"
import { Button } from "primereact/button"
import moment from "moment"
import { Image } from "primereact/image"

    const DetailsCharts = ({openDialogChart, setOpenDialogChart, currentChartID}) => {

    const [articlesByCategories, setArticlesByCategories] = useState([])
    const [inViewMenuItem, setInViewMenuItem] = useState(null)
    const menu = useRef(null);
    const [totalRecords, setTotalRecords] = useState(0)
    const [loading, setLoading] = useState(false)
    const [globalLoading, setGloabalLoading] = useState(false)
    const [selectedItems, setSelectedItems] = useState(null);
    const [selectAll, setSelectAll] = useState(false);

    const [lazyState, setlazyState] = useState({
        first: 0,
        rows: 10,
        page: 1,
        sortField: null,
        sortOrder: null,
        search: "",
    });

    const onPage = (event) => {
        setlazyState(event);
    };

    const onSort = (event) => {
        setlazyState(event);
    };

    const onFilter = (event) => {
        event['first'] = 0;
        setlazyState(event);
    };


    const onSelectionChange = (event) => {
        const value = event.value;
        setSelectedItems(value);
        setSelectAll(value.length === totalRecords);
    };

    const onSelectAllChange = (event) => {
        const selectAll = event.checked;

        if (selectAll) {
            setSelectAll(true);
            setSelectedItems(utilisateurs);
        } else {
            setSelectAll(false);
            setSelectedItems([]);
        }
    };
        useEffect(() => {
            (async () => {
                try {
                    const responseFromArticle = await fetchApi(`/article/all_categories/${currentChartID}`)
                    setArticlesByCategories(responseFromArticle.result)
        // console.log(responseFromArticle)

                } catch (error) {
                    console.log(error);
                }
            })();
        }, [currentChartID]);
  return (
    <Dialog
    
    header = "Details des articles de la categorie"
    visible={openDialogChart}
    onHide={() => setOpenDialogChart(!openDialogChart)}
    style={{width: '120vh'}}
    position="top">
        <div className="content">
                <div className="shadow rounded mt-3 pr-1 bg-white">
                    <DataTable
                        lazy
                        value={articlesByCategories}
                        tableStyle={{ minWidth: '50rem' }}
                        className=""
                        paginator
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate={`Affichage de {first} à {last} dans ${0} éléments`}
                        emptyMessage="Aucun utilisateur trouvé"
                        // paginatorLeft={paginatorLeft}
                        // paginatorRight={paginatorRight}
                        first={lazyState.first}
                        rows={lazyState.rows}
                        totalRecords={totalRecords}
                        onPage={onPage}
                        onSort={onSort}
                        sortField={lazyState.sortField}
                        sortOrder={lazyState.sortOrder}
                        onFilter={onFilter}
                        filters={lazyState.filters}
                        loading={loading}
                        selection={selectedItems}
                        onSelectionChange={onSelectionChange}
                        selectAll={selectAll}
                        onSelectAllChange={onSelectAllChange}
                        reorderableColumns
                        resizableColumns
                        columnResizeMode="expand"
                        paginatorClassName="rounded"
                        scrollable
                    // size="normal"
                    >
                        <Column
                            field="IMAGE"
                            header="Image"
                            frozen
                            body={(item) => {
                                const css = `
                                                                                .p-image-preview-indicator {
                                                                                          border-radius: 50%
                                                                                }`;
                                return (
                                    <>
                                        <Image
                                            src={item.IMAGE || UserImage}
                                            alt="Image"
                                            className="rounded-5"
                                            imageClassName="rounded-5 object-fit-cover"
                                            imageStyle={{ width: "50px", height: "50px" }}
                                            style={{ width: "50px", height: "50px" }}
                                            preview
                                        />
                                        <style>{css}</style>
                                    </>
                                );
                            }}
                        />
                        <Column field="NAME_ARTICLE" frozen header="Article" sortable body={item => {
                            return (
                                <span>{item.NAME_ARTICLE}</span>
                            )
                        }} />
                        <Column field="PRICE" frozen header="Prix" sortable body={item => {
                            return (
                                <span>{item.PRICE_ARTICLE}</span>
                            )
                        }} />
                        <Column field="DESIGNATION" frozen header="Catégorie" sortable body={item => {
                            return (
                                <span>{item.category.DESIGNATION}</span>
                            )
                        }} />
                        <Column field="CREATED_AT" frozen header="DATE INSERTION" sortable body={item => {
                            return (
                                <span>{moment(item.CREATED_AT).format("DD/MM/YYYY HH:mm")}</span>
                            )
                        }} />
                        <Column field="" header="Actions" alignFrozen="right" frozen body={item => {
                            const items = [
                                // {
                                //     label: 'Plus de details',
                                //     icon: (options) => {
                                //         return (
                                //             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16" {...options.iconProps}>
                                //                 <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                                //             </svg>
                                //         )
                                //     }
                                // },
                                // {
                                //     template: (deleteItem, options) => {
                                //         return (
                                //             <Link to={`/article/edit/${inViewMenuItem?.ID_ARTICLE}`} className="p-menuitem-link">
                                //                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16" style={{ marginRight: "0.5rem" }}>
                                //                     <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                //                     <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                //                 </svg>
                                //                 <span className="p-menuitem-text">Modifier</span>
                                //             </Link>
                                //         )
                                //     }
                                // },
                                // {
                                //     template: (deleteItem, options) => {
                                //         return (
                                //             <a href="#" className="p-menuitem-link text-danger" onClick={e => handleDeletePress(e, [inViewMenuItem.ID_ARTICLE])}>
                                //                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16" style={{ marginRight: "0.5rem" }}>
                                //                     <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                //                     <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                //                 </svg>
                                //                 <span className="p-menuitem-text text-danger">Supprimer</span>
                                //             </a>
                                //         )
                                //     }
                                // }
                            ];
                            return (
                                <>
                                    <SlideMenu ref={menu} model={items} popup viewportHeight={150} menuWidth={220} onHide={() => {
                                        setInViewMenuItem(null)
                                    }} />
                                    <Button rounded severity="secondary" text aria-label="Menu" size="small" className="mx-1" onClick={(event) => {
                                        setInViewMenuItem(item)
                                        menu.current.toggle(event)
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                                            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                                        </svg>
                                    </Button>
                                </>
                            )
                        }} />
                    </DataTable>
                </div>
            </div>

    </Dialog>
  )
}

export default DetailsCharts