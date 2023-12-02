import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://repair-module-crm.application.ryonadev.me',
    timeout: 10000
});

instance.interceptors.request.use(
    (config) => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImExZTM5MDUzLWM5ZjEtNDQ1Mi1iZjZiLWU2MTdjZDU1N2Y3MiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImRpZWdvLmNydWNlc0B1bm1zbS5lZHUucGUiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiRGllZ28gQ3J1Y2VzIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiVGVjaG5pY2lhbiJ9.UDPWstfMHkKvxIIPzz0o0FihU-bLAHKZvw2zNIBaq9s"

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;