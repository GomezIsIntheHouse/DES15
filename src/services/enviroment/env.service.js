const getEnviroment = ()=> {
    return process.env.ENVIROMENT || 'undefined'

}
module.exports = getEnviroment;