
class ProcedureController {
    constructor() { }
    
    async getMostConsultedProcedures() {
        return await fetch('https://api-interno.www.gov.co/api/ficha-tramites-y-servicios/LoMasConsultado/ObtenerLoMasConsultado');
    }
}

export const ProcedureService = new ProcedureController();