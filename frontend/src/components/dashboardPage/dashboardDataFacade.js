import axiosJWT from "../../axios/axiosInstance"

class DashboardDataFacade {
    async getLastRequests() {
        try {
            const url = "/api/RepairRequest/Search?limit=10"
            const response = await axiosJWT.get(url)
            return response.data
        } catch (e) {
            console.log(e)
            return []
        }
    }


    async getBarChartData() {
        const currentDate = new Date();

        // Función para formatear la fecha como mm-dd-aaaa
        const formatDate = (date) => {
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            const year = date.getFullYear();
            return `${month}-${day}-${year}`;
        };

        const startDate = new Date(currentDate);
        startDate.setDate(startDate.getDate() - 7);

        try {
            const formattedStartDate = formatDate(startDate);
            const formattedCurrentDate = formatDate(currentDate);

            const url = `/api/RepairRequest/Report/Weekly?fromDate=${formattedStartDate}&toDate=${formattedCurrentDate}`;
            const response = await axiosJWT.get(url);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }


    async getPieChartData() {
        try {
            const currentDate = new Date()
            const year = currentDate.getFullYear()
            const month = currentDate.getMonth() + 1

            const url = `/api/RepairRequest/Report/MonthlyByStatus?year=${year}&month=${month}`
            const response = await axiosJWT.get(url)

            return [
                {name: 'Cancelado', quantity: response.data[0].quantity},
                {name: 'Pendiente', quantity: response.data[1].quantity},
                {name: 'En Progreso', quantity: response.data[3].quantity},
                {name: 'Resuelto', quantity: response.data[2].quantity},
                {name: 'Notificado', quantity: response.data[4].quantity}
            ]
        } catch (error) {
            console.log(error)
        }
    }
}

export default DashboardDataFacade
