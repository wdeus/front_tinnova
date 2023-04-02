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
    }

}