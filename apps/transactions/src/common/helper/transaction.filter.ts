import { FindAllTransactionDto } from 'src/dto';
import { optType } from '../enums';
import { whereGlobal } from './filter-global';

export const transaction_filter = (query: FindAllTransactionDto): any[] => {
  const opt = {
    valueMin: {
      value: query?.valueMin,
      type: optType.greater_equal_than,
      path: 'amount',
    },
    valueMax: {
      value: query?.valueMax,
      type: optType.less_equal_than,
      path: 'amount',
    },
    DateMin: {
      value: query.DateMin,
      type: optType.greater_equal_than,
      path: 'created_at',
    },
    DateMax: {
      value: query.DateMax,
      type: optType.less_equal_than,
      path: 'created_at',
    },
    status: {
      value: query.status,
      type: optType.string,
      path: 'status'
    }
  };
  return whereGlobal(opt);
};
