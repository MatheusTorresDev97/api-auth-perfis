const database = require('../models')

const roles = (listaRoles) => {
    return async (req, res, next) => {
        const { usuarioId } = req

        const usuario = await database.usuarios.findOne({
            include: [
                {
                    model: database.roles,
                    as: 'usuario_roles',
                    attributes: ['id', ' nome']
                }
            ],
            where: {
                id: usuarioId
            }
        })

        if(!usuario) {
            res.status(401).send('Usuário não cadastrado')
        }

        const rolesCadastradas = usuario.usuarios_roles
        .map((role) => role.nome)
        .some((role) => listaRoles.include(role))

        if(!rolesCadastradas) {
            res.status(401).send('Usuario não possui acesso a essa rota')
        }

        return next()
    }
}

module.exports = roles