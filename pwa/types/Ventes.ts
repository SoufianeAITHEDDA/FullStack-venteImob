export class Ventes {
  public "@id"?: string;

  constructor(
    _id?: string,
    public date?: Date,
    public region?: string,
    public prixMoyenM2?: number,
    public nombreVentes?: number,
    public prix_moyen_m2?: number,
    public nombre_ventes?: number
  ) {
    this["@id"] = _id;
  }
}
