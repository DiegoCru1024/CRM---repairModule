import axios from "../../axios/axiosInstance";

class DashboardDataFacade {
    async getLastRequests() {
        try {
            const url = "/api/RepairRequest/All";
            const response = await axios.get(url);
            return response.data;
        } catch (e) {
            console.log(e);
            return [];
        }
    }


    getBarChartData() {
        return [
            {
                name: '05/10',
                quantity: 7,
            },
            {
                name: '06/10',
                quantity: 12,
            },
            {
                name: '07/10',
                quantity: 8,
            },
            {
                name: '08/10',
                quantity: 4,
            },
            {
                name: '09/10',
                quantity: 7,
            },
            {
                name: '10/10',
                quantity: 7,
            },
            {
                name: '11/10',
                quantity: 9,
            },
        ]
    }

    getPieChartData() {
        return [
            {
                name: 'Pendiente',
                quantity: 12
            },
            {
                name: 'En Proceso',
                quantity: 5
            },
            {
                name: 'Completadas',
                quantity: 10
            },
        ]
    }
}

export default DashboardDataFacade;
