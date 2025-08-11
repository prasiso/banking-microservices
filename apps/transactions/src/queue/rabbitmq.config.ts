
import 'dotenv/config' 
export const RABITMQ_URL = String(process.env.RABBITMQ_URL);
export const RABITMQ_QUEUES = {
  CLIENT_UPDATE: 'client_update',
  TRANSACTION_UPDATE: 'transaction_update',
};
