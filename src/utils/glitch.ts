const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const glitch = (element: HTMLElement | null) => {
  if (element === null) return;

  const textValue = element.dataset.value as string;

  if (!textValue) return;

  let interval = NaN;
  let iteration = 0;

  clearInterval(interval);

  interval = setInterval(() => {
    element.innerText = element.innerText
      .split("")
      .map((letter, index) => {
        if (index < iteration) return textValue[index];

        return letters[Math.floor(Math.random() * 26)];
      })
      .join("");

    if (iteration >= textValue.length) clearInterval(interval);

    iteration += 1 / 4;
  }, 30);
};
