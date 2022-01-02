import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import DonutChart from '../components/ventes/pie_chart'
import { fetch } from "../utils/dataAccess";


let container;

beforeEach(() => {
    //global.d3 = require('d3');
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

let d= [{
    "id": 176635,
  "date": "2021-01-04T00:00:00+00:00",
  "region": "Auvergne-Rhône-Alpes",
  "prix_moyen_m2": 357.57422410053,
  "nombre_ventes": 8,
  "prixMoyenM2": 357.57422410053,
  "nombreVentes": 8
}];



  it('DonutChart Tests : ', () => {

    act(() => {    ReactDOM.render(<DonutChart data={d}/>, container);  });
    
    //test title
    const titre = container.querySelector('h1');
    expect(titre.textContent).toBe('Pourcentage de ventre par region : 2021');


    //test if SVG exists
    //test title
    const svg = container.querySelector('#d3-donutChart');
    expect(svg).toBeInTheDocument();

    });