import React from 'react';
import { propExistsDeep } from './helper';
import Avatar from 'material-ui/Avatar';

export const resolveGender = (gender) => {
  gender = gender.toLowerCase();

  if (gender === 'male')
    return 'male';
  else if (gender === 'female')
    return 'female';
  else
    return 'others';
}

export const getAvatarUrl = (user, size=64) => {

  if (!user)
    return "";

  const cloudinaryId = user.profilePictureId;
  const fbUserId = user.fbUserId;

  // Using native Cloudinary
  if (cloudinaryId)
    return AvatarHelper.getUrl(cloudinaryId, size);
  // Using Facebook Graph
  else if (fbUserId)
    return `https://graph.facebook.com/${fbUserId}/picture/?width=${size*2}&height=${size*2}`;
  else
    return null;
};

export const getAvatar = (user, size=64, style) => {
  const avatarUrl = getAvatarUrl(user, size);

  if (avatarUrl)
    return <Avatar src={ avatarUrl } size={size} style={style} />;
  else
    return <Avatar backgroundColor={ Colors.grey700 } icon={ IconsHelper.materialIcon("person", _.extend({ color: Colors.grey50 }, style)) } />;
};
