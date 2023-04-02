import { http } from './config'

export default {
    listar: () => {
        return http.get()
    },

    salvar: (veiculo) => {
        return http.post('', veiculo)
    },

    atualizar: (veiculo) => {
        return http.put('/' + veiculo.id, veiculo)
    },

    excluir: (id) => {
        console.log(id)
        return http.delete('/' + id)
    },

    listarVeiculosNaoVendidos: () => {
        return http.get('/veiculosNaoVendidos')
    },

    listarVeiculosPorDecada: () => {
        return http.get('/veiculosPorDecada')
    },

    listarVeiculosPorFabricante: () => {
        return http.get('/veiculosPorFabricante')
    },

    getVeiculosUltimaSemana: () => {
        console.log('entrou')
        return http.get('/veiculosUltimaSemana')
    },
}