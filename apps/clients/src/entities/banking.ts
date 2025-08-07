import { banking } from '@prisma/client';
import { Client } from './client';

export interface Banking extends Partial<banking> {
  client?: Client;
}
