<template>
  <div id="app">

    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">API - TINNOVA</a>
      </div>
    </nav>

    <div class="container">
      <form @submit.prevent="salvar">

          <label>Veiculo</label>
          <input type="text" placeholder="Veiculo" v-model="veiculo.veiculo">
          <label>Marca</label>
          <input type="text" placeholder="Marca" v-model="veiculo.marca">
          <label>Ano</label>
          <input type="number" placeholder="Ano" v-model="veiculo.ano">
          <label>Descricao</label>
          <input type="text" placeholder="Descricao" v-model="veiculo.descricao">
          <label>Vendido</label>
          <input type="text" placeholder="Vendido" v-model="veiculo.vendido">
          

          <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>

      </form>

      <table>

        <thead>

          <tr>
            <th>VEICULO</th>
            <th>MARCA</th>
            <th>ANO</th>
            <th>DESCRIÇÃO</th>
            <th>VENDIDO</th>
            <th>CREATED</th>
            <th>UPDATED</th>
          </tr>

        </thead>

        <tbody>

          <tr v-for="veiculo of veiculos" :key="veiculo.id">

            <td>{{ veiculo.veiculo }}</td>
            <td>{{ veiculo.marca }}</td>
            <td>{{ veiculo.ano }}</td>
            <td>{{ veiculo.descricao }}</td>
            <td>{{ veiculo.vendido }}</td>
            <td>{{ veiculo.created }}</td>
            <td>{{ veiculo.updated }}</td>
            <td>
              <button @click="editar(veiculo)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button @click="remover(veiculo)"  class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>

          </tr>

        </tbody>
      
      </table>
      
    </div>

  </div>
</template>

<script>

import Veiculo from './services/veiculos'

export default {

  data(){
    return{
      veiculo: {
        veiculo: '',
        marca: '',
        ano: '',
        descricao: '',
        vendido: ''
      },
      veiculos : []
    }
  },
  mounted(){
    this.listar()
  },

  methods:{

    listar(){
      Veiculo.listar().then(resposta => {
        this.veiculos = resposta.data
      })
    },

    salvar(){
      
      if(!this.veiculo.id){
        Veiculo.salvar(JSON.parse(JSON.stringify(this.veiculo))).then(resposta => {
          this.veiculo = {}
          this.resposta = resposta
          alert('Cadastrado com sucesso!')
          this.listar()
        })
      
      }else{
        Veiculo.atualizar(JSON.parse(JSON.stringify(this.veiculo))).then(resposta => {
          this.veiculo = {}
          this.resposta = resposta
          alert('Atualizado com sucesso!')
          this.listar()
        })
      }
    },

    editar(veiculo){
      this.veiculo = veiculo
    },

    remover(veiculo){
      console.log(veiculo.id)
      Veiculo.excluir(veiculo.id).then(resposta => {
        this.resposta = resposta
        this.listar()
      })
    }
  }
}

</script>

<style>

</style>