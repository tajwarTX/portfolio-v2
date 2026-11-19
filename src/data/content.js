// All site copy and data lives here. Anything marked `placeholder: true`
// (or wrapped in PLACEHOLDER text) is dummy content to be replaced later.

import profile from '../assets/photo/profile.webp';

import droneGlb from '../assets/models/fpv_racing_drone.glb';
import armGlb from '../assets/models/robotic_arm.glb';
import autoGlb from '../assets/models/autonomous_robot.glb';
import rocketGlb from '../assets/models/amateur_rocketry.glb';
import lineGlb from '../assets/models/line_following_robot.glb';
import humanoidGlb from '../assets/models/humanoid_robot.glb';

const gallery = import.meta.glob('../assets/gallery/*.webp', { eager: true, import: 'default' });
const certs = import.meta.glob('../assets/certs/*.webp', { eager: true, import: 'default' });

const pick = (map, dir, slug) => ({
  full: map[`../assets/${dir}/${slug}.webp`],
  thumb: map[`../assets/${dir}/${slug}-sm.webp`],
});

export const person = {
  name: 'Mahir Tajwar Chowdhury',
  short: 'Mahir',
  tagline: 'Electrical Engineering @ RIT. I build robots, drones and hackathon hardware.',
  email: 'hello@example.com', // PLACEHOLDER: swap for the real address
  photo: profile,
  bio: [
    "I'm an Electrical Engineering student at the Rochester Institute of Technology, originally from Bangladesh. I started building robots at Mirzapur Cadet College and haven't stopped since: six years of national and international robot olympiads, FPV drones, and lately, 24-hour hardware hackathons.",
    'I like the part of a project where the circuit finally talks to the software: undocumented RFID readers, skin-conductance sensors, motor drivers that need one more capacitor. That is where most of my late nights go.',
  ],
  titleBlock: [
    ['Name', 'M. T. Chowdhury'],
    ['Material', 'Electrical Engineering, RIT'],
    ['Origin', 'Bangladesh · Mirzapur Cadet College'],
    ['Drawn', '2026'],
    ['Scale', '1 : 1'],
  ],
  skills: [
    'ESP32', 'Arduino', 'KiCad', 'CAD / Fusion 360', 'Veroboard prototyping', 'Python', 'C / C++',
    'ROS', 'Firebase', 'Socket.IO', 'FPV builds', 'Soldering',
  ],
};

export const socials = [
  { label: 'GitHub', href: 'https://github.com/tajwarTX' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mahir-tajwar-chowdhury/' },
  { label: 'YouTube', href: 'https://www.youtube.com/@tajwarTX' },
  { label: 'Facebook', href: 'https://www.facebook.com/tajwar.tx' },
];

export const builds = [
  {
    id: 'fabricue',
    name: 'FabriCUe',
    event: "MakeCU '26 · Columbia University",
    duration: '24-hour hardware hackathon',
    prizes: [
      'MLH: Build Your Hackathon A-Team with SpaceX Super Intelligence',
      'Notability: Trust the Process, Best Use of Notability',
    ],
    summary:
      'An intelligent wardrobe companion that counts how many times each piece of clothing is worn and tells students when it is laundry day.',
    did:
      'I designed and fabricated the custom veroboard circuit and a finished CAD-modelled product casing, all inside the 24 hours.',
    bom: ['ESP32 (concurrent real-time loops)', 'YRM1003 UHF RFID reader', 'WS2812B RGB LEDs', 'Speaker alarm', 'Firebase · web + iOS apps'],
    hurdle:
      'The YRM1003 RFID reader had no schematic and no English docs. I got it talking by brute-forcing custom pull codes across bitrates.',
    team: 'with Ahnaf Atif & Shefat Faisal',
    links: [
      { label: 'Devpost', href: 'https://devpost.com/software/fabricue' },
      { label: 'GitHub', href: 'https://github.com/shefatfaisal/CUMake-FabriCUe' },
    ],
    placeholderPhoto: true,
  },
  {
    id: 'space-ducky',
    name: 'Space Ducky',
    event: "Tiger Games '26 · RIT (COMS × FirstByte)",
    duration: '8-hour game jam',
    prizes: ['Best Solo Game'],
    summary:
      'A co-op arcade survival game for up to six people in a room where the only controller is touching each other. A high five between the right two players closes a circuit and spawns a shield.',
    did:
      'My first hackathon in the US, as the only EE in a room of CS and game-design majors. I built the bio-capacitive sensor from raw components and wired it straight into the game.',
    bom: ['Bio-capacitive sensor on veroboard', 'Arduino Nano · dynamic thresholds', 'Python bridge @ 230400 baud', 'HTML5 Canvas + Socket.IO', 'Layered audio stems'],
    hurdle:
      'Skin resistance varies a lot between people. Thresholds re-calibrate live so touch detection stays sub-millisecond without false triggers from sweaty hands.',
    team: 'solo build',
    links: [{ label: 'GitHub', href: 'https://github.com/tajwarTX/SpaceDucky-TIGERGAMES-RITCOMS_X_FirstByte' }],
    placeholderPhoto: true,
  },
];

// 3D archive. Descriptions are PLACEHOLDER copy until real ones arrive.
export const archive = [
  { id: 'drone', part: 'P-0001', name: 'FPV Racing Drone', model: droneGlb, rotation: [0.25, -0.5, 0], year: '2022', event: 'IRO 2022 · FPV Racing', role: 'Builder & pilot', placeholder: true },
  { id: 'arm', part: 'P-0002', name: 'Robotic Arm', model: armGlb, rotation: [0.3, -2.07, 0], year: '20XX', event: 'Event TBD', role: 'Design & firmware', placeholder: true },
  { id: 'auto', part: 'P-0003', name: 'Autonomous Robot', model: autoGlb, rotation: [-0.4, -0.27, -0.16], year: '2023', event: 'IRO 2023 · AI Autonomous Driving', role: 'Lead builder', placeholder: true },
  { id: 'rocket', part: 'P-0004', name: 'Amateur Rocketry', model: rocketGlb, rotation: [-1.57, 0, 1.38], year: '20XX', event: 'Personal project', role: 'Airframe & avionics', placeholder: true },
  { id: 'line', part: 'P-0005', name: 'Line Following Robot', model: lineGlb, rotation: [0.35, 0, 0], year: '20XX', event: 'Event TBD', role: 'PID tuning & PCB', placeholder: true },
  { id: 'humanoid', part: 'P-0006', name: 'Humanoid Robot', model: humanoidGlb, rotation: [0, 0.4, 0], year: '20XX', event: 'Event TBD', role: 'Mechanics & servos', placeholder: true },
];

const c = (slug) => pick(certs, 'certs', slug);

// kind: gold | silver | bronze | technical | rank | hackathon | other
// scope: international | national | hackathon | other
export const awards = [
  { year: 2026, event: 'MakeCU · Columbia', title: 'MLH: Build Your Hackathon A-Team (SpaceX SI)', category: 'FabriCUe', kind: 'hackathon', scope: 'hackathon' },
  { year: 2026, event: 'MakeCU · Columbia', title: 'Best Use of Notability', category: 'FabriCUe', kind: 'hackathon', scope: 'hackathon' },
  { year: 2026, event: 'Tiger Games · RIT', title: 'Best Solo Game', category: 'Space Ducky', kind: 'hackathon', scope: 'hackathon' },
  { year: 2025, event: 'World Robot Olympiad · International Final', title: 'Bronze Medal', category: 'RoboMission · Senior', kind: 'bronze', scope: 'international', cert: c('world-robot-olympiad-2025-international-final-bronze-medal-robomission-category-senior-group') },
  { year: 2025, event: 'World Robot Olympiad · National Round', title: 'Bronze Medal', category: 'RoboMission · Senior', kind: 'bronze', scope: 'national', cert: c('world-robot-olympiad-2025-national-round-bronze-medal-robomission-category-senior-group') },
  { year: 2023, event: 'World Robot Olympiad · International Final', title: '11th of 120', category: 'Future Engineers · Senior', kind: 'rank', scope: 'international', cert: c('world-robot-olympiad-2023-international-final-11th-120-future-engineers-category-senior-group') },
  { year: 2023, event: 'International Robot Olympiad', title: 'Silver Medal', category: 'AI Autonomous Driving · Senior', kind: 'silver', scope: 'international', cert: c('international-robot-olympiad-2023-silver-medal-ai-autonomous-driving-senior-group') },
  { year: 2023, event: 'International Robot Olympiad', title: 'Bronze Medal', category: 'Physical Computing · Senior', kind: 'bronze', scope: 'international', cert: c('international-robot-olympiad-2023-bronze-medal-physical-computing-senior-group') },
  { year: 2023, event: 'World Robot Olympiad · National Round', title: 'Technical Medal', category: 'Future Engineers · Senior', kind: 'technical', scope: 'national', cert: c('world-robot-olympiad-2023-national-round-technical-medal-future-engineers-category-senior-group') },
  { year: 2023, event: 'Bangladesh Robot Olympiad', title: 'Technical Award', category: 'Creative · Challenge', kind: 'technical', scope: 'national', cert: c('bangladesh-robot-olympiad-2023-technical-award-creative-category-challenge-group') },
  { year: 2022, event: 'International Robot Olympiad', title: 'Silver Medal', category: 'Creative · Challenge', kind: 'silver', scope: 'international', cert: c('international-robot-olympiad-2022-silver-medal-creative-category-challenge-group') },
  { year: 2022, event: 'International Robot Olympiad', title: 'Bronze Medal', category: 'Robot in Movie · Challenge', kind: 'bronze', scope: 'international', cert: c('international-robot-olympiad-2022-bronze-medal-robot-in-movie-challenge-group') },
  { year: 2022, event: 'International Robot Olympiad', title: 'Technical Medal', category: 'FPV Racing · Challenge', kind: 'technical', scope: 'international', cert: c('international-robot-olympiad-2022-technical-medal-fpv-racing-challenge-group') },
  { year: 2022, event: 'Bangladesh Robot Olympiad', title: 'Gold Medal', category: 'Creative · Challenge', kind: 'gold', scope: 'national', cert: c('bangladesh-robot-olympiad-2022-gold-medal-creative-category-challenge-group') },
  { year: 2021, event: 'International Robot Olympiad', title: 'Gold Medal', category: 'Creative · Challenge', kind: 'gold', scope: 'international', cert: c('international-robot-olympiad-2021-gold-medal-creative-category-challenge-group') },
  { year: 2021, event: 'International Robot Olympiad', title: 'Bronze Medal', category: 'Robot in Movie · Challenge', kind: 'bronze', scope: 'international', cert: c('international-robot-olympiad-2021-bronze-medal-robot-in-movie-challenge-group') },
  { year: 2021, event: 'Bangladesh Robot Olympiad', title: 'Silver Medal', category: 'Creative · Challenge', kind: 'silver', scope: 'national', cert: c('bangladesh-robot-olympiad-2021-silver-medal-creative-category-challenge-group') },
  { year: 2020, event: 'International Robot Olympiad', title: 'Silver Medal', category: 'Robot in Movie · Junior', kind: 'silver', scope: 'international', cert: c('international-robot-olympiad-2020-silver-medal-robot-in-movie-junior-group') },
  { year: 2020, event: 'International Robot Olympiad', title: 'Technical Medal', category: 'Creative · Junior', kind: 'technical', scope: 'international', cert: c('international-robot-olympiad-2020-technical-medal-creative-category-junior-group') },
  { year: 2020, event: 'Bangladesh Robot Olympiad', title: 'Bronze Medal', category: 'Robot Gathering · Junior', kind: 'bronze', scope: 'national', cert: c('bangladesh-robot-olympiad-2020-bronze-medal-robot-gathering-junior-group') },
  { year: 2024, event: 'National Museum of Science & Technology', title: 'Certificate of Appreciation', category: 'Exhibition', kind: 'other', scope: 'other', cert: c('certificate-of-appreciation-national-museum-of-science-and-technology-2024') },
  { year: 2022, event: 'ICT Division, Bangladesh', title: 'Certificate of Appreciation', category: 'Recognition', kind: 'other', scope: 'other', cert: c('certificate-of-appreciation-information-and-communication-technology-division-ict-div-2022') },
  { year: 2022, event: 'Bangladesh Innovation Forum', title: 'Certificate of Appreciation', category: 'Recognition', kind: 'other', scope: 'other', cert: c('certificate-of-appreciation-bangladesh-innovation-forum-2022') },
  { year: 2022, event: 'Creativity Exhibition', title: 'Champion', category: 'Exhibition', kind: 'other', scope: 'other', cert: c('champion-creativity-exhibition-2022') },
  { year: 2022, event: 'Inter Cadet College Workshop', title: 'School of Robotics', category: 'Workshop', kind: 'other', scope: 'other', cert: c('inter-cadet-college-workshop-on-robotics-school-of-robotics-2022') },
  { year: 2022, event: 'CADD Centre', title: 'Machine Learning using Python', category: 'Course', kind: 'other', scope: 'other', cert: c('machine-learning-using-python-cadd-centre-2022') },
  { year: 2022, event: 'Mirzapur Cadet College', title: 'Cadet Achievement Award', category: 'MCC Robotics Club Exhibition', kind: 'other', scope: 'other', cert: c('cadet-achiebement-award-of-outstanding-permormance-mcc-robotics-club-exhibition') },
  { year: 2022, event: 'Mirzapur Cadet College', title: 'Cadet Achievement Award', category: 'MECA Painting Exhibition', kind: 'other', scope: 'other', cert: c('cadet-achiebement-award-of-outstanding-permormance-meca-painting-exhibition') },
  { year: 2019, event: 'Dhaka University Model UN', title: 'Delegate of Chile', category: 'DUMUN 2019', kind: 'other', scope: 'other', cert: c('dhaka-university-model-united-nations-2019-dunmun-delegate-of-chile') },
];

export const gallery16 = [
  ['bangladesh-robot-olympiad-2020', 'Bangladesh Robot Olympiad 2020'],
  ['bangladesh-robot-olympiad-2021', 'Bangladesh Robot Olympiad 2021'],
  ['bangladesh-robot-olympiad-2022', 'Bangladesh Robot Olympiad 2022'],
  ['international-robot-olympiad-2021', 'International Robot Olympiad 2021'],
  ['international-robot-olympiad-2021-1', 'International Robot Olympiad 2021'],
  ['international-robot-olympiad-2021-2', 'International Robot Olympiad 2021'],
  ['fpv-drone-simulation-iro-2022', 'FPV drone simulation, IRO 2022'],
  ['international-robot-olympiad-2022', 'International Robot Olympiad 2022'],
  ['flying-fpv-drone', 'Flying an FPV drone'],
  ['international-robot-olympiad-2023', 'International Robot Olympiad 2023'],
  ['international-robot-olympiad-2023-1', 'International Robot Olympiad 2023'],
  ['international-robot-olympiad-2023-2', 'International Robot Olympiad 2023'],
  ['world-robot-olympiad-2023', 'World Robot Olympiad 2023'],
  ['world-robot-olympiad-2023-1', 'World Robot Olympiad 2023'],
  ['world-robot-olympiad-2023-2', 'World Robot Olympiad 2023'],
  ['world-robot-olympiad-2025', 'World Robot Olympiad 2025'],
].map(([slug, caption]) => ({ ...pick(gallery, 'gallery', slug), caption }));

// Measuring-tape timeline. Items marked placeholder have dummy wording.
export const timeline = [
  { year: 2019, text: 'Delegate of Chile at Dhaka University Model UN' },
  { year: 2020, text: 'First olympiad medals: BdRO bronze, IRO silver (junior)' },
  { year: 2021, text: 'IRO gold, Creative category' },
  { year: 2022, text: 'Founding member, MCC Robotics & Programming Club; BdRO gold' },
  { year: 2023, text: 'WRO International Final, 11th of 120 (Future Engineers)' },
  { year: 2024, text: 'House Cultural Prefect, student government at Mirzapur Cadet College' },
  { year: 2025, text: 'President, MCC Robotics & Programming Club · WRO bronze' },
  { year: 2026, text: 'Electrical Engineering at RIT · two hackathons, three prizes' },
];

export const roles = [
  { org: 'MCC Robotics & Programming Club', when: '2022–2025', what: 'President · Founding member' },
  { org: 'Student government, Mirzapur Cadet College', when: '2024–2025', what: 'House Cultural Prefect · Junior House Prefect' },
];
