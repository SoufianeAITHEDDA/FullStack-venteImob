
import { NextComponentType, NextPageContext } from "next";
import { Serie } from "../../components/ventes/Serie_temp";
import { PagedCollection } from "../../types/Collection";
import { fetch } from "../../utils/dataAccess";
import Head from "next/head";
import  DonutChart  from "../../components/ventes/pie_chart";
import { BarChart } from "../../components/ventes/bar_chart";
import React, { useState, useEffect } from 'react';

const donutData = [
  {name: "region 1", value: 19},
  {name: "region 2", value: 20},
  {name: "V 3", value: 19},
  {name: "15-19", value: 24},
  {name: "20-24", value: 22},
  {name: "25-29", value: 29},
  {name: "30-34", value: 22},
  {name: "35-39", value: 18}];

function Page ( { collection , collectionSerie, collectionbars }

  ) {

  const [type, settype] = useState("month")
  const [debut, setdebut] = useState("01-01-1999")
  const [fin, setfin] = useState("05-01-2021")
  const [data, setdata] = useState(collectionbars["hydra:member"])

  useEffect( async () => {
    var collectionbars = await fetch("/ventes/find?type="+type+"&date_debut="+debut+"&date_fin="+fin)
    console.log("collectionBars"+ collectionbars);

    setdata(collectionbars["hydra:member"])
  }, [type,debut,fin]);

  const handleChangeYear = (test) => {
    settype(test)
  }

  const handleChangeDebut = (test) => {
    setdebut(test)
  }
  const handleChangeFin = (test) => {
    setfin(test)

  }



  return (
    <div >
      <div>
        <Head>
        <script src="https://d3js.org/d3.v7.min.js"></script>
        <link rel="stylesheet" href="https://bootswatch.com/5/lux/bootstrap.min.css"/>
          <title>test</title>
        </Head>
      </div>

      <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" >
        <div class="container-fluid"  >

            <ul class="nav navbar-nav flex-fill justify-content-center">
              <li class="nav-item">
                <a class="nav-link active" href="#serie">Série Temporelle
                  <span class="visually-hidden">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#piechart">Diagramme Circulaire</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#barchart">Diagramme à Barre</a>
              </li>
            </ul>
          </div>

      </nav>

      <div className="container" style={{'margin-top': '60px' , 'text-align': 'center' }} >
        <div id ="serie">
          <h1>Prix moyen du m² : </h1>
          <Serie ventes ={ collectionSerie["hydra:member"] } />
        </div>
        <div id ="piechart">
          <DonutChart data={collection["hydra:member"]}  />
        </div>

        <div id ="barchart">
          <div>
            <h1>Nombres de ventes par {type} : </h1>
            <select className="form-select " onChange={e => handleChangeYear(e.target.value)}  >
              <option value="day">Day</option>
              <option value="month" selected="true" >Month</option>
              <option value="year" >Year</option>
            </select>
            <input className="form-control " onChange={e => handleChangeDebut(e.target.value)} type="date" id="start" name="trip-start"/>
            <input className="form-control " type="date" onChange={e => handleChangeFin(e.target.value)} id="end" name="trip-start"/>
          </div>

          <BarChart bars={data} test={type}/>
        </div>



      </div>

    </div>
  );
}

  Page.getInitialProps = async () => {
    const collection = await fetch("/ventes");
    const collectionSerie = await fetch("/ventes/months");
    const collectionbars = await fetch("/ventes/find?type=month&date_debut=01-01-1999&date_fin=05-01-2021");
    return {
      collection : collection,
      collectionSerie : collectionSerie,
      collectionbars : collectionbars}
    }



  export default Page;
