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
