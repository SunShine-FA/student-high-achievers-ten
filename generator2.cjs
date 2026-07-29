const fs = require('fs');

const raw = `
1,ANSHRA KHAN,1003,Female
2,ANEESHA NOUMAN,978,Female
3,KHADIJA FATIMA,975,Female
4,MUHAMMAD USMAN,951,Male
5,EMAAN FATIMA,935,Female
6,SYEDA MADIHA,935,Female
7,ZUNAIRAH,933,Female
8,AYESHA DASTGEER,893,Female
9,TASBEEL,887,Male
10,MUHAMMAD MUSA,876,Male
11,MALIK RUHAB,849,Male
12,ZAIBA ZIA,824,Female
13,RAFAY ASGHAR,760,Male
14,ABDUR REHMAN,759,Male
15,RAFAY SAJJAD,756,Male
16,QALB E ABBAS,745,Male
17,ABDULLAH,721,Male
18,JAWAD ALI,698,Male
19,AZAAN RIAZ,686,Male
20,DEBORAH GILL,681,Female
21,UMAIS IRFAN,679,Male
22,MUHAMMAD HASEEB,672,Male
23,ASMA KHAN,660,Female
24,SUFIYAN ALI,654,Male
25,AYAN FAROOQ,650,Male
26,AMNA IFTIKHAR,649,Female
27,FATIHA REHMAN,630,Female
28,AFZAAL,624,Male
29,AYESHA KASHIF,622,Female
30,AREEBA REHMAN,606,Female
31,ESHAL FAISAL,568,Female
32,HAMAD,568,Male
33,DANIYAL JAVED,504,Male
`;

const getAchievementOther = (rank) => {
  if (rank <= 6) return '⭐ High Distinction';
  if (rank <= 12) return '🏆 Distinction';
  if (rank <= 20) return '🎖️ Merit';
  return '🌟 Achiever';
};

const getMessageOther = (rank) => {
  if (rank <= 6) return '"You have shown incredible dedication. This achievement is just the start of many more wonderful accomplishments."';
  if (rank <= 12) return '"Your consistency and effort have paid off beautifully. Be proud of this well-deserved success."';
  if (rank <= 20) return '"Your perseverance and dedication have paid off. Congratulations on this well-deserved result!"';
  return '"Every student who made it to this list deserves celebration. You have worked hard and we are proud of you."';
};

const lines = raw.trim().split('\n');

let topGirlsCount = 0;
let topBoysCount = 0;

const students = lines.map(line => {
  const [overallRank, name, score, genderRaw] = line.split(',');
  const gender = genderRaw.toLowerCase();
  const pct = ((parseInt(score) / 1100) * 100).toFixed(2) + '%';
  const r = parseInt(overallRank);
  
  let isTopBoy = false;
  let isTopGirl = false;
  let categoryRank = r;
  let achievement = '';
  let message = '';
  
  if (gender === 'female' && topGirlsCount < 3) {
    topGirlsCount++;
    isTopGirl = true;
    categoryRank = topGirlsCount;
    if (categoryRank === 1) {
      achievement = '🥇 Gold Medalist';
      message = '"Your brilliance shines brightest among all achievers. You have set a standard of excellence that inspires every student. We are incredibly proud of you."';
    } else if (categoryRank === 2) {
      achievement = '🥈 Silver Medalist';
      message = '"With grace and grit you have climbed to the summit of excellence. Your success is a testament to what dedication and discipline can truly achieve."';
    } else if (categoryRank === 3) {
      achievement = '🥉 Bronze Medalist';
      message = '"Equally brilliant and equally deserving — your exceptional results remind us that greatness multiplies when two stars shine together. We are immensely proud of you."';
    }
  } else if (gender === 'male' && topBoysCount < 3) {
    topBoysCount++;
    isTopBoy = true;
    categoryRank = topBoysCount;
    if (categoryRank === 1) {
      achievement = '🥇 Top Boy – 1st';
      message = '"Your relentless effort and determination have made you the top achiever among boys. This is the beginning of an extraordinary journey ahead."';
    } else if (categoryRank === 2) {
      achievement = '🥈 Top Boy – 2nd';
      message = '"Your dedication and hard work have paid off. You have proven that consistency is the key to success."';
    } else if (categoryRank === 3) {
      achievement = '🥉 Top Boy – 3rd';
      message = '"Your commitment to learning and your perseverance have brought you to this proud moment. Keep reaching for greater heights."';
    }
  } else {
    achievement = getAchievementOther(r);
    message = getMessageOther(r);
  }

  let id = 's' + r;
  if (isTopGirl) id = 'g' + categoryRank;
  if (isTopBoy) id = 'b' + categoryRank;

  return {
    id,
    name,
    gender,
    photo: '/images/avatar.jpg',
    marks: score + ' / 1100',
    percentage: pct,
    rank: categoryRank, // category rank for top boys/girls, overall rank for others
    isTopGirl,
    isTopBoy,
    achievement,
    message
  };
});

let out = `/* ============================================================
   STUDENT DATA
   ============================================================ */
export const STUDENTS = [
`;

students.forEach((s, idx) => {
  out += `  {
    id: '${s.id}',
    name: '${s.name}',
    gender: '${s.gender}',
    photo: '${s.photo}',
    marks: '${s.marks}',
    percentage: '${s.percentage}',
    rank: ${s.rank},
`;
  if (s.isTopGirl) out += `    isTopGirl: true,\n`;
  if (s.isTopBoy) out += `    isTopBoy: true,\n`;

  out += `    achievement: '${s.achievement}',
    message: '${s.message}'
  }`;
  if (idx < students.length - 1) out += ',';
  out += '\n';
});

out += `];

export const STATS = {
  total: STUDENTS.length,
  distinctions: STUDENTS.filter(s => parseFloat(s.percentage) >= 80).length,
  highest: Math.max(...STUDENTS.map(s => parseInt(s.marks.split('/')[0].trim()))),
};

/** Podium ordering: silver, gold, bronze (visual center effect) */
export function podiumOrder(arr) {
  if (arr.length === 3) return [arr[1], arr[0], arr[2]];
  if (arr.length === 4) {
    const gold = arr.find(s => s.rank === 1);
    const silvers = arr.filter(s => s.rank === 2);
    const bronze = arr.find(s => s.rank === 3);
    return [silvers[0], gold, silvers[1], bronze].filter(Boolean);
  }
  return arr;
}
`;

fs.writeFileSync('src/data/students.js', out);
