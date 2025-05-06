import { useEffect, useRef, useState } from 'react';

const useWebSocketListener = (userId, setGameStatus, authToken) => {
    const stompClientRef = useRef(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const socket = new SockJS('http://26.25.182.231:8888/websocket');
        const stompClient = Stomp.over(socket);
        stompClientRef.current = stompClient;

        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        };

        stompClient.connect(
            headers,
            (frame) => {
                console.log('Connected:', frame);
                setIsConnected(true);
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

                                case 'LEADERBOARD':
                                    setGameStatus((prev) => ({
                                        ...prev,
                                        leaderboard: data.leaderboard,
                                    }));

                                    break;

                                case 'NEXT_QUESTION':
                                    setGameStatus((prev) => ({
                                        ...prev,
                                        current_question_index:
                                            data.current_question_id,
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
    return isConnected;
};

export default useWebSocketListener;
