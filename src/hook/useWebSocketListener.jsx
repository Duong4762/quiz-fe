import { useEffect, useRef } from 'react';
// import SockJS from 'sockjs-client';
// import Stomp from 'stompjs';

const useWebSocketListener = (userId, setGameStatus, authToken) => {
    const stompClientRef = useRef(null);

    useEffect(() => {
        const socket = new SockJS('http://localhost:8888/websocket'); // hoặc wss://... nếu dùng HTTPS/ngrok
        const stompClient = Stomp.over(socket);
        stompClientRef.current = stompClient;

        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        };

        stompClient.connect(
            headers,
            (frame) => {
                console.log('Connected:', frame);
                stompClient.subscribe(
                    `/user/${userId}/queue/messages`,
                    (message) => {
                        try {
                            const msg = JSON.parse(message.body);
                            console.log('Message received:', msg);
                            const { type, data } = msg;

                            switch (type) {
                                case 'RELOAD_USER':
                                    setGameStatus((prev) => ({
                                        ...prev,
                                        participants: data.users,
                                    }));
                                    break;

                                case 'CHANGE_STATUS_ROOM':
                                    setGameStatus((prev) => ({
                                        ...prev,
                                        status: data.status,
                                    }));
                                    break;

                                case 'LOAD_QUIZ':
                                    setGameStatus((prev) => ({
                                        ...prev,
                                        quizzData: data.quizzData,
                                    }));
                                    break;

                                case 'CHANGE_QUESTION_INDEX':
                                    setGameStatus((prev) => ({
                                        ...prev,
                                        current_question_index: data.index,
                                    }));
                                    break;

                                default:
                                    console.warn(
                                        `Unknown message type: ${type}`
                                    );
                            }
                        } catch (err) {
                            console.error('Failed to parse message:', err);
                        }
                    }
                );
            },
            (error) => {
                console.error('WebSocket connection error:', error);
            }
        );

        return () => {
            if (stompClientRef.current?.connected) {
                stompClientRef.current.disconnect(() => {
                    console.log('WebSocket disconnected');
                });
            }
        };
    }, [userId, setGameStatus, authToken]);
};

export default useWebSocketListener;
