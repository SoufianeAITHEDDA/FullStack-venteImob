import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { fetch } from "../../utils/dataAccess";
import { Ventes } from "../../types/Ventes";

interface Props {
  ventes?: Ventes;
}

export const Form: FunctionComponent<Props> = ({ ventes }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(ventes["@id"], { method: "DELETE" });
      router.push("/ventes");
    } catch (error) {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    }
  };

  return (
    <div>
      <h1>{ventes ? `Edit Ventes ${ventes["@id"]}` : `Create Ventes`}</h1>
      <Formik
        initialValues={ventes ? { ...ventes } : new Ventes()}
        validate={(values) => {
          const errors = {};
          // add your validation logic here
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setStatus, setErrors }) => {
          const isCreation = !values["@id"];
          try {
            await fetch(isCreation ? "/ventes" : values["@id"], {
              method: isCreation ? "POST" : "PUT",
              body: JSON.stringify(values),
            });
            setStatus({
              isValid: true,
              msg: `Element ${isCreation ? "created" : "updated"}.`,
            });
            router.push("/ventes");
          } catch (error) {
            setStatus({
              isValid: false,
              msg: `${error.defaultErrorMsg}`,
            });
            setErrors(error.fields);
          }
          setSubmitting(false);
        }}
      >
        {({
          values,
          status,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-control-label" htmlFor="_date">
                date
              </label>
              <input
                name="date"
                id="_date"
                value={values.date ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.date && touched.date ? " is-invalid" : ""
                }`}
                aria-invalid={errors.date && touched.date}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage className="text-danger" component="div" name="date" />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_region">
                region
              </label>
              <input
                name="region"
                id="_region"
                value={values.region ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.region && touched.region ? " is-invalid" : ""
                }`}
                aria-invalid={errors.region && touched.region}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="region"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_prixMoyenM2">
                prixMoyenM2
              </label>
              <input
                name="prixMoyenM2"
                id="_prixMoyenM2"
                value={values.prixMoyenM2 ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.prixMoyenM2 && touched.prixMoyenM2 ? " is-invalid" : ""
                }`}
                aria-invalid={errors.prixMoyenM2 && touched.prixMoyenM2}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="prixMoyenM2"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_nombreVentes">
                nombreVentes
              </label>
              <input
                name="nombreVentes"
                id="_nombreVentes"
                value={values.nombreVentes ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.nombreVentes && touched.nombreVentes
                    ? " is-invalid"
                    : ""
                }`}
                aria-invalid={errors.nombreVentes && touched.nombreVentes}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="nombreVentes"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_prix_moyen_m2">
                prix_moyen_m2
              </label>
              <input
                name="prix_moyen_m2"
                id="_prix_moyen_m2"
                value={values.prix_moyen_m2 ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.prix_moyen_m2 && touched.prix_moyen_m2
                    ? " is-invalid"
                    : ""
                }`}
                aria-invalid={errors.prix_moyen_m2 && touched.prix_moyen_m2}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="prix_moyen_m2"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_nombre_ventes">
                nombre_ventes
              </label>
              <input
                name="nombre_ventes"
                id="_nombre_ventes"
                value={values.nombre_ventes ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.nombre_ventes && touched.nombre_ventes
                    ? " is-invalid"
                    : ""
                }`}
                aria-invalid={errors.nombre_ventes && touched.nombre_ventes}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="nombre_ventes"
            />

            {status && status.msg && (
              <div
                className={`alert ${
                  status.isValid ? "alert-success" : "alert-danger"
                }`}
                role="alert"
              >
                {status.msg}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-success"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
      <Link href="/ventes">
        <a className="btn btn-primary">Back to list</a>
      </Link>
      {ventes && (
        <button className="btn btn-danger" onClick={handleDelete}>
          <a>Delete</a>
        </button>
      )}
    </div>
  );
};
