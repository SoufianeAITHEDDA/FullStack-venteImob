import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../../components/ventes/Form";
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
          <title>{ventes && `Edit Ventes ${ventes["@id"]}`}</title>
        </Head>
      </div>
      <Form ventes={ventes} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const ventes = await fetch(asPath.replace("/edit", ""));

  return { ventes };
};

export default Page;
