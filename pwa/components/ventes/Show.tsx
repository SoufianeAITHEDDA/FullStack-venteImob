import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { fetch } from "../../utils/dataAccess";
import ReferenceLinks from "../common/ReferenceLinks";
import { Ventes } from "../../types/Ventes";

interface Props {
  ventes: Ventes;
}

export const Show: FunctionComponent<Props> = ({ ventes }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(ventes["@id"], { method: "DELETE" });
      router.push("/ventes");
    } catch (error) {
      setError("Error when deleting the resource.");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>{`Show Ventes ${ventes["@id"]}`}</h1>
      <table className="table table-responsive table-striped table-hover">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">date</th>
            <td>{ventes["date"]}</td>
          </tr>
          <tr>
            <th scope="row">region</th>
            <td>{ventes["region"]}</td>
          </tr>
          <tr>
            <th scope="row">prixMoyenM2</th>
            <td>{ventes["prixMoyenM2"]}</td>
          </tr>
          <tr>
            <th scope="row">nombreVentes</th>
            <td>{ventes["nombreVentes"]}</td>
          </tr>
          <tr>
            <th scope="row">prix_moyen_m2</th>
            <td>{ventes["prix_moyen_m2"]}</td>
          </tr>
          <tr>
            <th scope="row">nombre_ventes</th>
            <td>{ventes["nombre_ventes"]}</td>
          </tr>
        </tbody>
      </table>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <Link href="/ventes">
        <a className="btn btn-primary">Back to list</a>
      </Link>{" "}
      <Link href={`${ventes["@id"]}/edit`}>
        <a className="btn btn-warning">Edit</a>
      </Link>
      <button className="btn btn-danger" onClick={handleDelete}>
        <a>Delete</a>
      </button>
    </div>
  );
};
