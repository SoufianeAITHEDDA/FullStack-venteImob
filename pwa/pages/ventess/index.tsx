import { NextComponentType, NextPageContext } from "next";
import { List } from "../../components/ventes/List";
import { PagedCollection } from "../../types/Collection";
import { Ventes } from "../../types/Ventes";
import { fetch } from "../../utils/dataAccess";
import Head from "next/head";

interface Props {
  collection: PagedCollection<Ventes>;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  collection,
}) => (
  <div>
    <div>
      <Head>
        <title>Ventes List</title>
      </Head>
    </div>
    <List ventes={collection["hydra:member"]} />
  </div>
);

Page.getInitialProps = async () => {
  const collection = await fetch("/ventes");
  console.log(collection);

  return { collection };
};

export default Page;
