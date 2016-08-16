export const resolveGender = (gender) => {
  gender = gender.toLowerCase();

  if (gender === 'male')
    return 'male';
  else if (gender === 'female')
    return 'female';
  else
    return 'others';
}
