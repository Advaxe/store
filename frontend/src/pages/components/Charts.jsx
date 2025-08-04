import HighchartsReact from "highcharts-react-official";
import * as Highcharts from "highcharts";
import { useEffect, useState } from "react";
import fetchApi from "../../helpers/fetchApi"
import DetailsCharts from "./DetailsCharts";

const Charts = () => {

    const [articles, setArticles] = useState([])
    const [totalRecordsArticle, setTotalRecordsArticles] = useState(0)
    const [openDialogChart, setOpenDialogChart] = useState(false)
    const [currentChartID, setCurrentChartID] = useState(0)
    // const handleOpenDetailsCharts = () =>{
    //     setOpenDialogChart(!openDialogChart)
    // }
    const currentPropsCharts ={
        openDialogChart,
        setOpenDialogChart,
        currentChartID
    }
    useEffect(() => {
        (async () => {
            try {
                const responseFromArticle = await fetchApi("/article/all_chart")
                setArticles(responseFromArticle.result.result)
                setTotalRecordsArticles(responseFromArticle.result.totalRecords)
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);


    const articleParCategorieDataArray = articles.map((item) => ({
        name: item.name || "Article non trouvé",
        y: item.nbr || 0,
        id_category: item.ID_CATEGORY || 0,
    }));

    const totalArticles = articles.reduce((accumulator, record) => {
        return accumulator + Number(record.nbr);
    }, 0);
    // initialisation du line chart pour article
    const rapportArticle = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: "pie",
        },
        title: {
            text: 'Article par categorie',
            align: 'center'
        },
        tooltip: {
            pointFormat: "{series.name}: <b>{point.y:.0f}</b>",
        },
        subtitle: {
            text: `Total des articles ${totalArticles}`
        },
        accessibility: {
            point: {
                valueSuffix: "",
            },
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: "pointer",
                dataLabels: {
                    enabled: true,
                    format:
                        '<span style="font-size: 1.2em"><b>{point.name}</b></span><br>' +
                        '<span style="opacity: 0.8">({point.y})</span>',
                    connectorColor: "rgba(128,128,128,0.5)",
                },
                events: {
                    click: async function (event) {
                        // Handle the click event here
                        const ID = await event?.point?.id_category
                        console.log('Chart clicked:', ID);
                         setCurrentChartID(ID)
                        setOpenDialogChart(!openDialogChart)
                    }
                }
            },
        },
        series: [{
            enableMouseTracking: true,
            animation: {
                duration: 2000
            },
            colorByPoint: true,
            name: "",
            data: articleParCategorieDataArray
        }]
    }


    return (
        <div className="m-10">
            <div className="col-md-12">
                <HighchartsReact
                    highcharts={Highcharts}
                    options={rapportArticle}
                />
            </div>
            <DetailsCharts
            {...currentPropsCharts}
            
            />
        </div>
    )
}

export default Charts