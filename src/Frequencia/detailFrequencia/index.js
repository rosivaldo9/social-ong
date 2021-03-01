import React, { Component } from 'react';
import api from '../../service/service';//import url base
import createPreview, {downloadPdf, setPdfData} from './templatePdf'

class DetailFrequencia extends Component {
  constructor() {
    super();
    this.state = {
      Turma: {
        nome: ''
      },
      Frequencia: [],
      saveFeedBack: null,
      data: new Date().toLocaleDateString().substr(0, 10)//TODO mudar para props
    }
  }


  handleClick() {
    downloadPdf()
  }

  componentDidMount() {
    this.loadTurma()
    this.loadFrequencia()
  }

  componentDidUpdate() {
    //console.log("ADT", this.state.Frequencia);
    const params = this.props;
    console.log("params", params);
  }

  async loadTurma() {
    const { idTurma, data } = this.props.location.state;
    const response = await api.get(`/Turma/${idTurma}`); //buscar dos dados no banco
    const turma = response.data

    this.setState({
      Turma: turma,
      data
    })
  }

  async loadFrequencia() {
    let { idTurma, data } = this.props.location.state;
    console.log("LOCATION STATE", data, idTurma)
    data = data.replace(/[/]+/g,"-")
    const response = await api.get(`/Frequencia/${idTurma}/${data}`);
    const { docs: frequencia } = response.data

    this.setState({
      Frequencia: frequencia
    })

    console.log("FRQ", frequencia)

    setPdfData(frequencia)
    createPreview()
  }

  render() {
    return (
      <scroll>
      <div className="container">
        <h1>Relatorio</h1>
        <button onClick={this.handleClick}>Download</button>
        <iframe
          frameborder="0"
          width="100%"
          height="700px"
        />
      </div>
    </scroll>
    )
  }

 
}

export default DetailFrequencia;