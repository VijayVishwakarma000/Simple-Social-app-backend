export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export function generateUsername() {
  const adjectives = [
    "sleepy", "angry", "tiny", "noisy", "weird",
    "cosmic", "glitchy", "spicy", "dusty", "chaotic"
  ];

  const nouns = [
    "banana", "otter", "wizard", "pickle", "robot",
    "hamster", "ghost", "dragon", "pixel", "potato"
  ];

  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const num = Math.floor(1000 + Math.random() * 9000);

  return `${adj}_${noun}_${num}`;
}