import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../components/ventes/Form";
import Head from "next/head";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create Ventes </title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
