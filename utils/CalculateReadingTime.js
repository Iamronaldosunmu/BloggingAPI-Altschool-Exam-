export const calculateReadingTime = (text) => {
  const reading_speed = 238; //words per minute
  const word_count = text.split(" ").length;
  const reading_time_in_minutes = word_count / reading_speed;
  const reading_time_in_words = `${Math.ceil(
    reading_time_in_minutes
  )} min read`;
  return {
    reading_time_in_words,
    reading_time_in_minutes,
  };
};
