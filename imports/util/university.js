import * as ImagesHelper from './images';

const getMediumImage = (url) => {
  if (!url || url.indexOf('topuniversities.com') < 0)
    return url;

  return url.replace("_small", "_medium");
};

export const getImageUrl = (uni, size=90) => {
  if (!uni)
    return "";

  if (uni.logoImageId)
    return ImagesHelper.getUrlScale(uni.logoImageId, 90);
  else if (uni.logoUrl)
    return getMediumImage(uni.logoUrl);
  else
    return "";
};
