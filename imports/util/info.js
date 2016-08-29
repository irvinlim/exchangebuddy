import { getUrl } from './images';

export const getImageUrl = (item) => item.imageId ? getUrl(item.imageId) : item.section && item.section.defaultImageId ? getUrl(item.section.defaultImageId) : null;
