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
        <input type="text" placeholder="Veiculo" v-model="veiculo.veiculo" />
        <label>Marca</label>
        <input type="text" placeholder="Marca" v-model="veiculo.marca" />
        <label>Ano</label>
        <input type="number" placeholder="Ano" v-model="veiculo.ano" />
        <label>Descricao</label>
        <input
          type="text"
          placeholder="Descricao"
          v-model="veiculo.descricao"
        />
        <label>Vendido</label>
        <input type="text" placeholder="Vendido" v-model="veiculo.vendido" />

        <button class="waves-effect waves-light btn-small">
          Salvar<i class="material-icons left">save</i>
        </button>
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
              <button
                @click="editar(veiculo)"
                class="waves-effect btn-small blue darken-1"
              >
                <i class="material-icons">create</i>
              </button>
              <button
                @click="remover(veiculo)"
                class="waves-effect btn-small red darken-1"
              >
                <i class="material-icons">delete_sweep</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <h3>Quantidade de Veiculos Não vendidos</h3>
      <div class="collection">
        <a href="#!" class="collection-item"
          ><span class="badge"></span>{{ quantidadeVeiculosNaoVendidos }}</a
        >
      </div>

      <h3>Veiculos Por decada</h3>
      <table>
        <thead>
          <tr>
            <th>DECADA</th>
            <th>QUANTIDADE VEICULOS</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="veiculo of veiculosPorDecada" :key="veiculo.id">
            <td>{{ veiculo.decada }}</td>
            <td>{{ veiculo.quantidadeVeiculos }}</td>
          </tr>
        </tbody>
      </table>

      <h3>Veiculos Por fabricante</h3>
      <table>
        <thead>
          <tr>
            <th>FABRICANTE</th>
            <th>QUANTIDADE VEICULOS</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="veiculo of veiculosPorFabricante" :key="veiculo.id">
            <td>{{ veiculo.fabricante }}</td>
            <td>{{ veiculo.quantidadeVeiculos }}</td>
          </tr>
        </tbody>
      </table>

      <h3>Veiculos da última semana</h3>
      <table>
        <thead>
          <tr>
            <th>CARRO</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="veiculo of veiculosUltimaSemana" :key="veiculo.id">
            <td>{{ veiculo }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>



<script>
import Veiculo from "./services/veiculos";

export default {
  data() {
    return {
      veiculo: {
        veiculo: "",
        marca: "",
        ano: "",
        descricao: "",
        vendido: "",
      },
      veiculos: [],
      quantidadeVeiculosNaoVendidos: 0,
      veiculosPorDecada: [],
      veiculosPorFabricante: [],
      veiculosUltimaSemana: [],
    };
  },
  mounted() {
    this.listar();
    this.listarVeiculosNaoVendidos();
    this.listarVeiculosPorDecada();
    this.listarVeiculosPorFabricante();
    this.listarVeiculosUltimaSemana();
  },

  methods: {
    listar() {
      Veiculo.listar().then((resposta) => {
        this.veiculos = resposta.data;
      });
    },

    salvar() {
      if (!this.veiculo.id) {
        Veiculo.salvar(JSON.parse(JSON.stringify(this.veiculo)))
          .then((resposta) => {
            this.veiculo = {};
            this.resposta = resposta;
            alert("Cadastrado com sucesso!");
            this.listar();
            this.listarVeiculosNaoVendidos();
            this.listarVeiculosPorDecada();
            this.listarVeiculosPorFabricante();
            this.listarVeiculosUltimaSemana();
          })
          .catch((e) => {
            alert(e.response.data);
            this.veiculo = {};
          });
      } else {
        Veiculo.atualizar(JSON.parse(JSON.stringify(this.veiculo))).then(
          (resposta) => {
            this.veiculo = {};
            this.resposta = resposta;
            alert("Atualizado com sucesso!");
            this.listar();
            this.listarVeiculosNaoVendidos();
            this.listarVeiculosPorDecada();
            this.listarVeiculosPorFabricante();
            this.listarVeiculosUltimaSemana();
          }
        );
      }
    },

    editar(veiculo) {
      this.veiculo = veiculo;
    },

    remover(veiculo) {
      console.log(veiculo.id);
      Veiculo.excluir(veiculo.id).then((resposta) => {
        this.resposta = resposta;
        this.listar();
        this.listarVeiculosNaoVendidos();
        this.listarVeiculosPorDecada();
        this.listarVeiculosPorFabricante();
        this.listarVeiculosUltimaSemana();
      });
    },

    listarVeiculosNaoVendidos() {
      Veiculo.listarVeiculosNaoVendidos().then((resposta) => {
        this.quantidadeVeiculosNaoVendidos = resposta.data;
      });
    },

    listarVeiculosPorDecada() {
      Veiculo.listarVeiculosPorDecada().then((resposta) => {
        this.veiculosPorDecada = resposta.data;
      });
    },

    listarVeiculosPorFabricante() {
      Veiculo.listarVeiculosPorFabricante().then((resposta) => {
        this.veiculosPorFabricante = resposta.data;
      });
    },

    listarVeiculosUltimaSemana() {
      console.log("chamando");
      Veiculo.getVeiculosUltimaSemana().then((resposta) => {
        this.veiculosUltimaSemana = resposta.data;
      });
    },
  },
};
</script>

<style>
</style>