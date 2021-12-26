
import { NextComponentType, NextPageContext } from "next";
import { Serie } from "../../components/ventes/Serie_temp";
import { PagedCollection } from "../../types/Collection";
import { fetch } from "../../utils/dataAccess";
import Head from "next/head";
import  DonutChart  from "../../components/ventes/pie_chart";


const donutData = [
  {name: "region 1", value: 19},
  {name: "region 2", value: 20},
  {name: "V 3", value: 19},
  {name: "15-19", value: 24},
  {name: "20-24", value: 22},
  {name: "25-29", value: 29},
  {name: "30-34", value: 22},
  {name: "35-39", value: 18}];

function Page ( { collection , collectionSerie }
  
  ) {  return (
    <div>
      <div>
        <Head>
        <script src="https://d3js.org/d3.v7.min.js"></script>

          <title>test</title>
        </Head>
      </div>
      <Serie ventes ={ collectionSerie["hydra:member"] } />
      <DonutChart data={collection["hydra:member"]}  />
    </div>
  );
}

  Page.getInitialProps = async () => {
    const collection = await fetch("/ventes");
    const collectionSerie = await fetch("/ventes/months");
    return { collection : collection,
             collectionSerie : collectionSerie}
    }
              

  
  export default Page;