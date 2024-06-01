import { Server } from "http";
import configKeys from "../../config";


function serverConfig (server: Server){
   
   function startServer (){
      server.listen(configKeys.PORT,()=>console.log(`Server running ....${configKeys.PORT}`))
   }
   return {startServer}
}

export default serverConfig