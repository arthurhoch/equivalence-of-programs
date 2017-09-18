/*eslint no-multi-str: 2*/
import React, { Component } from 'react';

import {
  ProgressBar,
  Col,
  Row,
  Button
} from 'react-bootstrap';

import Stepper from 'react-stepper-horizontal';

import AceEditor from 'react-ace';

import './css/shared.css';
import 'brace/theme/monokai';


var programas = [
  {
    primeiro: 'faça F vá_para 2\n' +
    'se T então vá_para 1 senão vá_para 4\n' +
    'faça G vá_para 4\n' +
    'se T2 então vá_para 5 senão vá_para 1\n',
    segundo:
    'faça F vá_para 2\n' +
    'se T então vá_para 1 senão vá_para 3\n' +
    'faça G vá_para 4\n' +
    'se T2 então vá_para 5 senão vá_para 1\n'
  }];

class App extends Component {

  constructor() {
    super();
    this.state = {
      steps: [{
        title: 'Programas',
        onClick: (e) => {
          this.setCurrentState(0);
        }
      }, {
        title: 'Passo 1',
        onClick: (e) => {
          this.setCurrentState(1);
        }
      }, {
        title: 'Passo 2',
        onClick: (e) => {
          this.setCurrentState(2);
        }
      }, {
        title: 'Passo 3',
        onClick: (e) => {
          this.setCurrentState(3);
        }
      }, {
        title: 'Passo 4',
        onClick: (e) => {
          this.setCurrentState(4);
        }
      }],
      currentStep: 0,
    };
    this.onClickNext = this.onClickNext.bind(this);
  }

  setCurrentState = (state) => {
    this.setState({
      currentStep: state,
    });
  }

  onClickNext = () => {
    const { currentStep } = this.state;
    if (currentStep < 4) {
      programas.push({ primeiro: "", segundo: "" });
      this.setState({
        currentStep: currentStep + 1,
      });
      this.gerarPasso(currentStep);
    }
  }

  onClickBack = () => {
    const { currentStep } = this.state;
    if (currentStep > 0) {
      programas.slice(1, currentStep);
      this.setState({
        currentStep: currentStep - 1,
      });
    }
  }

  gerarPasso = (passo) => {
    console.log(passo);
    
    switch (++passo) {
      case 1:
        this.passoUm(passo);
        break;
      case 2:
        this.passoDois(passo);
        break;
      case 3:
        this.passoTres(passo);
        break;
      case 4:
        this.passoQuatro(passo);
        break;

      default:
        break;
    }
  }

  passoUm = (passo) => {


    programas[passo].segundo = programas[passo-1].segundo.length.toString();


  }

  passoDois = (passo) => {

  }

  passoTres = (passo) => {

  }

  passoQuatro = (passo) => {

  }

  onChangePrimeiro = (text) => {
    const { currentStep } = this.state;
    programas[currentStep].primeiro = text;
  }

  onChangeSegundo = (text) => {
    const { currentStep } = this.state;
    programas[currentStep].segundo = text;
  }


  render() {
    const { steps, currentStep } = this.state;

    return (

      <div className="wrap">
        <Stepper steps={steps} activeStep={currentStep} />

        <Row >
          <Col className="h-center" sm={12}>
            <Button className="p5" onClick={this.onClickBack}>
              Anterio
            </Button>
            <Button className="p5" onClick={this.onClickNext}>
              Próximo
            </Button>
          </Col>
        </Row>


        <Row>
          <Col mdOffset={1} md={6}>
            <h3>Programa 1</h3>
            <AceEditor className="editor"
              theme={"monokai"}
              fontSize={16}
              value={programas[currentStep].primeiro}
              onChange={this.onChangePrimeiro}
              editorProps={{
                $blockScrolling: Infinity
              }} />
          </Col>
          <Col md={6}>
            <h3>Programa 2</h3>
            <AceEditor className="editor"
              theme={"monokai"}
              fontSize={16}
              value={programas[currentStep].segundo}
              onChange={this.onChangeSegundo}
              editorProps={{
                $blockScrolling: Infinity,
              }} />
          </Col>
        </Row>

        <div className="footer">
          <ProgressBar now={currentStep * 25}></ProgressBar>
          <p>Copyright (c) 2017 Arthur Hoch, William Mehler. MIT Licensed.</p>
        </div>
      </div>

    );
  }
}

export default App;
