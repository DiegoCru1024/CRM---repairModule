import axios from "axios";
import axiosJWT from "../../axios/axiosInstance";

class RepairDataFacade {
    async getRequestData(guid) {
        try {
            const url = `/api/RepairRequest/${guid}`;
            const response = await axiosJWT.get(url);
            return response.data;
        } catch (error) {
            console.error("Error al obtener los datos de la solicitud:", error);
            throw new Error("Error al obtener los datos de la solicitud");
        }
    }

    async getClientData(clientId) {
        try {
            const url = `https://clientemodulocrm.onrender.com/clientes/buscarPorDNI/${clientId}`;
            const clientResponse = await axios.get(url);
            return clientResponse.data;
        } catch (error) {
            console.error("Error al obtener los datos del cliente:", error);
            throw new Error("Error al obtener los datos del cliente");
        }
    }

    async getOrderData(purchaseOrderId) {
        try {
            const url = `https://modulo-ventas.onrender.com/getselldetails/${purchaseOrderId}`;
            const detailsResponse = await axios.get(url);
            return detailsResponse.data[0];
        } catch (error) {
            console.error("Error al obtener los datos del pedido:", error);
            throw new Error("Error al obtener los datos del pedido");
        }
    }
}

export default RepairDataFacade;
