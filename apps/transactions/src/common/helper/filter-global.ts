import { optType } from '../enums/type-filter';
import { transformObject } from './nested-object';

export function whereGlobal(opt) {
  const dataString: any = Object.values(opt).reduce((ret: any, filter: any) => {
    const { path: nameProp, value, type } = filter;
    if ((!value && value !== false) || value === '[]') return ret;
    if (optType.number === type) {
      ret.push({ [nameProp]: Number(value) });
    }
    if (optType.string === type) {
      ret.push({ [nameProp]: value });
    }
    if (optType.less_equal_than === type) {
      ret.push({
        [nameProp]: {
          lte: value,
        },
      });
    }
    if (optType.range === type) {
      ret.push({
        [nameProp]: {
          ...(value.min || value.min == 0 ? { gte: value.min } : {}),
          ...(value.max || value.max == 0 ? { lte: value.max } : {}),
        },
      });
    }
    if (optType.greater_equal_than === type) {
      ret.push({
        [nameProp]: {
          gte: value,
        },
      });
    }
    if (type === optType.array) {
      ret.push({
        [nameProp]: {
          in: value,
        },
      });
    }
    if (type.includes('Array')) {
      ret.push({
        [nameProp]: {
          in: JSON.parse(value).map((vl) => {
            if (type.includes('string')) {
              vl = String(vl);
            } else {
              vl = Number(vl);
            }
            return vl;
          }),
        },
      });
    }
    if (type.includes('Like')) {
      ret.push({
        [nameProp]: { contains: value },
      });
    }
    if (type === optType.boolean) {
      ret.push({
        [nameProp]: value?.toLowerCase() === 'false' ? 0 : 1,
      });
    }

    return ret;
  }, []);
  return dataString.map((dt) => {
    return transformObject(dt);
  });
}
