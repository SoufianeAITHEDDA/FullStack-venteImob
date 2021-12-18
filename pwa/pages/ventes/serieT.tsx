import { NextComponentType, NextPageContext } from "next";
import { Serie } from "../../components/ventes/Serie_temp";
import { PagedCollection } from "../../types/Collection";
import { Ventes } from "../../types/Ventes";
import { fetch } from "../../utils/dataAccess";
import Head from "next/head";


interface Props {
  collection: Ventes[];
}

const Page: NextComponentType<NextPageContext, Props, Props>  = ({
  collection,
}) => (
    <div>
      <div>
        <Head>
          <title>test</title>
        </Head>
      </div>
      <Serie ventes ={ collection["hydra:member"] } />
    </div>
  );


  Page.getInitialProps = async () => {
    const collection = await fetch("/ventes");
    console.log(collection);
    return { collection };
  };
  
  export default Page;