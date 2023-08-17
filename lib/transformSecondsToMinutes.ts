const transformSecondsToMinutes = (secondsInput: number): string => {
  const secondsRounded = Math.round(secondsInput);
  const minutes = Math.floor(secondsRounded / 60);
  const seconds = secondsRounded - minutes * 60;

  return `${minutes < 10 ? `0${minutes}` : minutes}:${
    seconds < 10 ? `0${seconds}` : seconds
  }`;
};

export default transformSecondsToMinutes;
