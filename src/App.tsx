
import './App.css';

import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import { Button, Card, Col, Form, FormGroup, Row, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'







export default function App() {
  const [res, setRes] = React.useState([]);
  const [text, setText] = React.useState('');
  const [words, setWords] = React.useState(0);
  const [top, setTop] = React.useState([]);
  const [lorem, setLorem] = React.useState(0);
  const [caracter, setCaracter] = React.useState(0);


  useEffect(() => {
    //getData();
  })
  const getData = async () => {
    const data = await fetch(`https://baconipsum.com/api/?type=all-meat&paras=${text}&start-with-lorem=${lorem}`)
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        setRes(data);
        getTop3(data)
        wordFreq(data)
      })
      .catch(function (error) {
        console.log('Error:' + error.message);
      });
  }

  const handleText = (event: any) => {
    setText(event.target.value)
  }

  const handleLorem = (event: any) => {
    if (event.target.checked) {
      setLorem(1)
    } else {
      setLorem(0)
    }

  }

  const getTop3 = (cadena: any) => {
    let numeroPalabras: number = 0;
    let numeroCaracteres: number= 0;
    for (let index = 0; index < cadena.length; index++) {
      cadena[index] = cadena[index].replace(/(^\s*)|(\s*$)/gi, "");
      cadena[index] = cadena[index].replace(/[ ]{2,}/gi, " ");
      cadena[index] = cadena[index].replace(/\n /, "\n");
      numeroPalabras = numeroPalabras + cadena[index].split(' ').length;
      numeroCaracteres = numeroCaracteres + cadena[index].length;

    }
    setWords(numeroPalabras)
    setCaracter(numeroCaracteres)
    return numeroPalabras;
  }

  function wordFreq(cadena: any) {
    var words: any;
    var freqMap: any = {};
    var sortable = [];
    for (let index = 0; index < cadena.length; index++) {
      words = cadena[index].replace(/[.]/g, '').split(/\s/);
      words.forEach(function (w: any) {
        if (!freqMap[w]) {
          freqMap[w] = 0;
        }
        freqMap[w] += 1;
      });
      for (var element in freqMap) {
        sortable.push([element, freqMap[element]]);
      }
      sortable.sort(function (a, b) {
        return a[1] - b[1];
      });


    }

    let aux = sortable.reverse();
    let aux2: any = [];
    aux2.push(aux[0])
    aux2.push(aux[1])
    aux2.push(aux[2])

    setTop(aux2)
  }

  const data = {
    labels: [top[0] != undefined ? top[0][0] : '', top[1] != undefined ? top[1][0] : '', top[2] != undefined ? top[2][0] : ''],
    datasets: [
      {
        label: 'Total words: ' + words + ' | Total characters: ' + caracter,
        data: [top[0] != undefined ? top[0][1] : 0, top[1] != undefined ? top[1][1] : 0, top[2] != undefined ? top[2][1] : 0],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div className="container">
      <h1>Let's get spicy</h1>
      <p>
        Bacon ipsum generator.
    </p>
      <div style={{ background: "#FFF" }}>
        <Bar type data={data} options={options} />
      </div>
      <br></br>
      <div style={{ background: "#FFF" }}>
        <br></br>
        <div className="form-group">
          <div className="row">
            <div style={{ textAlign: "left" }} className="col-sm">
              <label className="right-inline"># PARAGPHAS: </label>
              <input onChange={handleText} className="input-control" />
            </div>
            <div style={{ textAlign: "center" }} className="col-sm">
              <label className="right-inline">START WITH IPSUM</label>
              <input onChange={handleLorem} className="form-check-input" type="checkbox" id="inlineFormCheck" />
            </div>
            <div style={{ textAlign: "right" }} className="col-sm">
              <button onClick={getData} className="btn btn-primary btn-sm">GENERATE</button>
            </div>
          </div>
        </div>
        <br></br>
      </div>
      <div style={{ background: "#FFF" }}>
        {res.map(element =>
          <p>{element}</p>
        )}
      </div>
      <br></br>

    </div>

  );
}
