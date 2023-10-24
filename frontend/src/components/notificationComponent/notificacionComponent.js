import {useEffect, useState} from "react";
import styles from './notificacion.module.css'

export default function NotificationComponent({messageInput}) {
    const [message, setMessage] = useState({
        message: 'Han ocurrido varios errores...',
        type: 'error'
    });

    useEffect(() => {
        setMessage(messageInput);

        const timer = setTimeout(() => {
            setMessage({message: '', type: ''});
        }, 5000);

        return () => clearTimeout(timer);
    }, [messageInput]);

    return message.message && (
        <div className={`${styles.notificationContainer} ${styles[message.type]}`}>
            <p>{message.type.toUpperCase()}</p>
            <p>{message.message}</p>
        </div>
    );
}
