// frontend/src/components/Escaner.jsx
import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Escaner.css';

const Escaner = () => {
    const [resultado, setResultado] = useState({ msg: 'Apunte la cámara al código QR', type: '' });
    const [escaneoActivo, setEscaneoActivo] = useState(true);

    const { eventoId } = useParams();

    useEffect(() => {
        const qrScanner = new Html5QrcodeScanner(
            "qr-reader",
            { fps: 10, qrbox: { width: 250, height: 250 } },
            /* verbose= */ false
        );

        const onScanSuccess = async (decodedText) => {
            if (escaneoActivo) {
                setEscaneoActivo(false);
                qrScanner.pause();

                try {
                    const response = await axios.post('http://localhost:5000/api/asistencia', {
                        numero_documento: decodedText,
                        evento_id: eventoId
                    });

                    setResultado({ msg: `Éxito: ${decodedText}`, type: 'success' });

                } catch (error) {
                    const errorMessage = error.response?.data?.message || 'Error desconocido.';

                    if (error.response?.status === 409) {
                        setResultado({ msg: errorMessage, type: 'warning' });
                    } else {
                        setResultado({ msg: `Error: ${errorMessage}`, type: 'error' });
                    }
                }

                setTimeout(() => {
                    setResultado({ msg: 'Apunte la cámara al código QR', type: '' });
                    if (qrScanner.getState() === 2) {
                        qrScanner.resume();
                    }
                    setEscaneoActivo(true);
                }, 3000);
            }
        };

        function onScanFailure(error) {
            // No hacemos nada en caso de fallo para no saturar la consola
        }

        qrScanner.render(onScanSuccess, onScanFailure);

        return () => {
            qrScanner.clear().catch(error => {
                console.error("Fallo al limpiar el escáner.", error);
            });
        };
    }, [escaneoActivo, eventoId]); // Agregado eventoId a las dependencias

    return (
        <div className="escaner-container">
            <h1 className="escaner-title">Escaner de Asistencia</h1>
            <div className="escaner-card">
                <h3>Evento ID: {eventoId}</h3>

                <div id="qr-reader" style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}></div>

                <div className={`feedback-scan ${resultado.type}`}>
                    {resultado.msg}
                </div>
            </div>
        </div>
    );
};

export default Escaner;