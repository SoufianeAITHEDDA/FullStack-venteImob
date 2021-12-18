import { FunctionComponent } from "react";
import Link from "next/link";
import ReferenceLinks from "../../components/common/ReferenceLinks";
import { Ventes } from "../../types/Ventes";

interface Props {
  ventes: Ventes[];
}

export const List: FunctionComponent<Props> = ({ ventes }) => (
  <div>
    <h1>Ventes List</h1>
    <Link href="/ventes/create">
      <a className="btn btn-primary">Create</a>
    </Link>
    <table className="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>date</th>
          <th>region</th>
          <th>prixMoyenM2</th>
          <th>nombreVentes</th>
          <th>prix_moyen_m2</th>
          <th>nombre_ventes</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {ventes &&
          ventes.length !== 0 &&
          ventes.map((ventes) => (
            <tr key={ventes["@id"]}>
              <th scope="row">
                <ReferenceLinks items={ventes["@id"]} type="ventes" />
              </th>
              <td>{ventes["date"]}</td>
              <td>{ventes["region"]}</td>
              <td>{ventes["prixMoyenM2"]}</td>
              <td>{ventes["nombreVentes"]}</td>
              <td>{ventes["prix_moyen_m2"]}</td>
              <td>{ventes["nombre_ventes"]}</td>
              <td>
                <ReferenceLinks
                  items={ventes["@id"]}
                  type="ventes"
                  useIcon={true}
                />
              </td>
              <td>
                <Link href={`${ventes["@id"]}/edit`}>
                  <a>
                    <i className="bi bi-pen" aria-hidden="true" />
                    <span className="sr-only">Edit</span>
                  </a>
                </Link>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
);
