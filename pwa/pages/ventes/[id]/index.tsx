import { NextComponentType, NextPageContext } from "next";
import { Show } from "../../../components/ventes/Show";
import { Ventes } from "../../../types/Ventes";
import { fetch } from "../../../utils/dataAccess";
import Head from "next/head";
import {useRouter} from 'next/router'


interface Props {
  ventes: Ventes;
  test : String;
}



const Page: NextComponentType<NextPageContext, Props, Props> = ({ ventes , test }) => {

  return (
    <div>
      <div>
        <Head>
          <title>{`Show Ventes ${ventes["@id"]}`}</title>
        </Head>
      </div>
      {console.log(test)}
      <Show ventes={ventes} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {

  const ventes = await fetch(asPath);
  return { ventes : ventes , test : asPath };
};

export default Page;
