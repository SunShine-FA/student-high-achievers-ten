/* ============================================================
   STUDENT DATA
   ============================================================ */
export const STUDENTS = [
  /* ── TOP 3 BOYS ────────────────────────────────────────── */
  {
    id: 'b1',
    name: 'Hamza',
    gender: 'male',
    photo: '/images/Hamza.jpeg',
    marks: '432 / 555',
    percentage: '77.84%',
    rank: 1,
    isTopBoy: true,
    achievement: '🥇 Top Boy – 1st',
    message: '"Your relentless effort and determination have made you the top achiever among boys. This is the beginning of an extraordinary journey ahead."',
  },
  {
    id: 'b2',
    name: 'Saad',
    gender: 'male',
    photo: '/images/Saad.jpeg',
    marks: '403 / 555',
    percentage: '72.61%',
    rank: 2,
    isTopBoy: true,
    achievement: '🥈 Top Boy – 2nd',
    message: '"Your dedication and hard work have paid off. You have proven that consistency is the key to success."',
  },
  {
    id: 'b3',
    name: 'Affan',
    gender: 'male',
    photo: '/images/Affan.jpeg',
    marks: '396 / 555',
    percentage: '71.35%',
    rank: 3,
    isTopBoy: true,
    achievement: '🥉 Top Boy – 3rd',
    message: '"Your commitment to learning and your perseverance have brought you to this proud moment. Keep reaching for greater heights."',
  },

  /* ── TOP GIRLS ──────────────────────────────────────────── */
  {
    id: 'g1',
    name: 'Esha',
    gender: 'female',
    photo: '/images/Esha.jpeg',
    marks: '523 / 555',
    percentage: '94.23%',
    rank: 1,
    isTopGirl: true,
    achievement: '🥇 Gold Medalist',
    message: '"Your brilliance shines brightest among all achievers. You have set a standard of excellence that inspires every student. We are incredibly proud of you."',
  },
  {
    id: 'g2',
    name: 'Aania',
    gender: 'female',
    photo: '/images/Aania.jpeg',
    marks: '512 / 555',
    percentage: '92.25%',
    rank: 2,
    isTopGirl: true,
    achievement: '🥈 Silver Medalist',
    message: '"With grace and grit you have climbed to the summit of excellence. Your success is a testament to what dedication and discipline can truly achieve."',
  },
  {
    id: 'g2b',
    name: 'Ayesha binte Faisal',
    gender: 'female',
    photo: '/images/Ayesha.jpeg',
    marks: '512 / 555',
    percentage: '92.25%',
    rank: 2,
    isTopGirl: true,
    achievement: '🥈 Silver Medalist',
    message: '"Equally brilliant and equally deserving — your exceptional results remind us that greatness multiplies when two stars shine together. We are immensely proud of you."',
  },
  {
    id: 'g3',
    name: 'Fizza',
    gender: 'female',
    photo: '/images/Fiza.jpeg',
    marks: '497 / 555',
    percentage: '90.36%',
    rank: 3,
    isTopGirl: true,
    achievement: '🥉 Bronze Medalist',
    message: '"Equally brilliant and equally deserving — your exceptional results remind us that greatness multiplies when two stars shine together. We are immensely proud of you."',
  },

  /* ── OTHER ACHIEVERS ──────────────────────────────────── */
  { id: 's2',  name: 'Sabeen',       gender: 'female', photo: '', marks: '496 / 555', percentage: '89.37%', rank: 4,  achievement: '⭐ High Distinction', message: '"You have shown incredible dedication. This achievement is just the start of many more wonderful accomplishments."' },
  { id: 's3',  name: 'Sakina',       gender: 'female', photo: '', marks: '485 / 555', percentage: '87.39%', rank: 5,  achievement: '⭐ High Distinction', message: '"Your consistency and effort have paid off beautifully. Be proud of this well-deserved success."' },
  { id: 's4',  name: 'Hadia',        gender: 'female', photo: '', marks: '475 / 555', percentage: '85.59%', rank: 6,  achievement: '🏆 Distinction',      message: '"Your determination has brought you a wonderful result. Continue this momentum and achieve even greater things."' },
  { id: 's5',  name: 'Minal',        gender: 'female', photo: '', marks: '447 / 555', percentage: '80.54%', rank: 7,  achievement: '🏆 Distinction',      message: '"Excellence is a habit, and you have proven it. We are incredibly proud of your remarkable achievement."' },
  { id: 's6',  name: 'Aneeza',       gender: 'female', photo: '', marks: '429 / 555', percentage: '77.30%', rank: 8,  achievement: '🏆 Distinction',      message: '"Your passion for learning shines through your results. Keep growing and keep inspiring those around you."' },
  { id: 's7',  name: 'Kainat',       gender: 'female', photo: '', marks: '423 / 555', percentage: '76.22%', rank: 9,  achievement: '🏆 Distinction',      message: '"You have worked hard and it shows. This achievement is a stepping stone to an even brighter future."' },
  { id: 's8',  name: 'Bisma',        gender: 'female', photo: '', marks: '415 / 555', percentage: '74.77%', rank: 10, achievement: '🎖️ Merit',           message: '"Your perseverance and dedication have paid off. Congratulations on this well-deserved result!"' },
  { id: 's9',  name: 'Yusra',        gender: 'female', photo: '', marks: '413 / 555', percentage: '74.41%', rank: 11, achievement: '🎖️ Merit',           message: '"Hard work pays off, and your result is the proof. We are proud of every step you took on this journey."' },
  { id: 's10', name: 'Sana',         gender: 'female', photo: '', marks: '407 / 555', percentage: '73.33%', rank: 12, achievement: '🎖️ Merit',           message: '"Your commitment to excellence is truly commendable. This is just the beginning of many great achievements."' },
  { id: 's11', name: 'Hadi',         gender: 'male',   photo: '', marks: '394 / 555', percentage: '70.99%', rank: 13, achievement: '🎖️ Merit',           message: '"You have shown true dedication and spirit. This achievement is a stepping stone to greater things ahead."' },
  { id: 's12', name: 'Wania',        gender: 'female', photo: '', marks: '391 / 555', percentage: '70.45%', rank: 14, achievement: '🎖️ Merit',           message: '"Your hard work has produced a wonderful result. Keep believing in yourself and keep growing."' },
  { id: 's13', name: 'Momina',       gender: 'female', photo: '', marks: '382 / 555', percentage: '68.83%', rank: 15, achievement: '🌟 Achiever',        message: '"Every effort you put in has been worth it. We celebrate your success and look forward to seeing you grow."' },
  { id: 's14', name: 'Noor e Seher', gender: 'female', photo: '', marks: '380 / 555', percentage: '68.47%', rank: 16, achievement: '🌟 Achiever',        message: '"Your dedication and focus have brought you a result to be proud of. Well done and congratulations!"' },
  { id: 's15', name: 'Ameen',        gender: 'male',   photo: '', marks: '370 / 555', percentage: '66.67%', rank: 17, achievement: '🌟 Achiever',        message: '"You have worked with commitment and it shows. This is a proud moment for you and your family."' },
  { id: 's16', name: 'Muhammad Ali', gender: 'male',   photo: '', marks: '359 / 555', percentage: '64.68%', rank: 18, achievement: '🌟 Achiever',        message: '"Your journey of hard work has yielded a great result. Keep the spirit alive and aim for even greater heights."' },
  { id: 's17', name: 'Ali Zia',      gender: 'male',   photo: '', marks: '352 / 555', percentage: '63.42%', rank: 19, achievement: '🌟 Achiever',        message: '"Well done on your achievement! Your hard work is recognized and celebrated by all of us."' },
  { id: 's18', name: 'Abdul Rahman', gender: 'male',   photo: '', marks: '352 / 555', percentage: '63.42%', rank: 20, achievement: '🌟 Achiever',        message: '"Equally determined and equally deserving of recognition. Your effort has made us proud. Congratulations!"' },
  { id: 's19', name: 'Rayyan',       gender: 'male',   photo: '', marks: '337 / 555', percentage: '60.72%', rank: 21, achievement: '🌟 Achiever',        message: '"You have shown resilience and hard work. Keep building on this foundation and you will achieve great things."' },
  { id: 's20', name: 'Zain',         gender: 'male',   photo: '', marks: '335 / 555', percentage: '60.36%', rank: 22, achievement: '🌟 Achiever',        message: '"Your dedication to your studies is commendable. This result is a proud milestone — keep going!"' },
  { id: 's21', name: 'Ali Kamran',   gender: 'male',   photo: '', marks: '333 / 555', percentage: '60.00%', rank: 23, achievement: '🌟 Achiever',        message: '"You have earned this recognition through your consistent effort. We are proud of you and your achievement."' },
  { id: 's22', name: 'Anaya',        gender: 'female', photo: '', marks: '327 / 555', percentage: '58.92%', rank: 24, achievement: '🌟 Achiever',        message: '"Your positive attitude and hard work have brought you here. Congratulations and keep shining bright!"' },
  { id: 's23', name: 'Raffay Majid', gender: 'male',   photo: '', marks: '320 / 555', percentage: '57.66%', rank: 25, achievement: '🌟 Achiever',        message: '"Every student who made it to this list deserves celebration. You have worked hard and we are proud of you."' },
  { id: 's24', name: 'Shahmeer',     gender: 'male',   photo: '', marks: '310 / 555', percentage: '55.86%', rank: 26, achievement: '🌟 Achiever',        message: '"Well done! Your perseverance and commitment to your studies are truly admirable. Keep it up!"' },
  { id: 's25', name: 'Maaz',         gender: 'male',   photo: '', marks: '305 / 555', percentage: '54.95%', rank: 27, achievement: '🌟 Achiever',        message: '"You made it to the Hall of Fame and that itself is a great achievement. Keep learning and never stop growing!"' },
];

export const STATS = {
  total: STUDENTS.length,
  distinctions: STUDENTS.filter(s => parseFloat(s.percentage) >= 80).length,
  highest: Math.max(...STUDENTS.map(s => parseInt(s.marks.split('/')[0].trim()))),
};

/** Podium ordering: silver, gold, bronze (visual center effect) */
export function podiumOrder(arr) {
  if (arr.length === 3) return [arr[1], arr[0], arr[2]];
  if (arr.length === 4) {
    const gold    = arr.find(s => s.rank === 1);
    const silvers = arr.filter(s => s.rank === 2);
    const bronze  = arr.find(s => s.rank === 3);
    return [silvers[0], gold, silvers[1], bronze].filter(Boolean);
  }
  return arr;
}
