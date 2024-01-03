//desde aca se hacen todas las consultas a la base de datos
const TABLA = 'users';
const auth = require('../auth')

module.exports = function(dbInyectada){

    let db=dbInyectada;

    if (!db){
        db = require('../../DB/mysql');
    }
    function todos(){
        return db.todos(TABLA);
     }
     
     function uno(id){
         return db.uno(TABLA, id);
     }
     
     async function eliminar(body){
        const respuesta = await db.eliminar(TABLA, body);
        let respuesta2 = await auth.eliminar({
            id: body.id
        })
         return respuesta2;
     }

     async function agregar(body){
        const usuario = {
            id:body.id,
            name: body.name,
            activo: body.activo,
            roles: "user"
        }
        //aca me va a devolver el id en el que se agrego
        const respuesta = await db.agregar(TABLA, usuario);
        let insertId = 0;
        insertId = respuesta.insertId;
        
        let respuesta2 = '';
        if (body.userName || body.password){
            respuesta2 = await auth.agregar({
                id: insertId,
                userName: body.userName,
                password: body.password
            })
        }
        return respuesta2;
     }

     async function actualizar(body){
        const usuario = {
            id:body.id,
            name: body.name,
            activo: body.activo
        }
        //aca me va a devolver el id en el que se agrego
        const respuesta = await db.actualizar(TABLA, usuario);

        let insertId = 0;
        insertId = body.id; //seria para actualizar
        
        let respuesta2 = '';
        if (body.userName || body.password){
            respuesta2 = await auth.actualizar({
                id: insertId,
                userName: body.userName,
                password: body.password
            })
        }
        return respuesta2;
     }

     
    return{
        todos,
        uno,
        eliminar,
        agregar, 
        actualizar
    } 
}