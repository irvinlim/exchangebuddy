import { getUrlScale } from './images';

export const getImageUrl = (item, size=64) => item.imageId ? getUrlScale(item.imageId, size) : item.section && item.section.defaultImageId ? getUrlScale(item.section.defaultImageId, size) : null;
