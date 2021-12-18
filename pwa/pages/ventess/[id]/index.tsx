import { NextComponentType, NextPageContext } from "next";
import { Show } from "../../../components/ventes/Show";
import { Ventes } from "../../../types/Ventes";
import { fetch } from "../../../utils/dataAccess";
import Head from "next/head";

interface Props {
  ventes: Ventes;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({ ventes }) => {
  return (
    <div>
      <div>
        <Head>
          <title>{`Show Ventes ${ventes["@id"]}`}</title>
        </Head>
      </div>
      <Show ventes={ventes} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const ventes = await fetch(asPath);

  return { ventes };
};

export default Page;
