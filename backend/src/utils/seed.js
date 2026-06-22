/**
 * Seed Script  —  src/utils/seed.js
 *
 * Usage:
 *   npm run seed
 *
 * Reads SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD from .env.
 * Clears all collections, then inserts:
 *   - 1 admin user
 *   - 3 sample projects
 *   - 8 sample skills (across all 4 categories)
 *   - 3 sample experience entries
 *
 * The script exits cleanly after disconnecting.
 */

import 'dotenv/config';
import mongoose from 'mongoose';

import User       from '../models/User.model.js';
import Project    from '../models/Project.model.js';
import Skill      from '../models/Skill.model.js';
import Experience from '../models/Experience.model.js';
import Message    from '../models/Message.model.js';


// ── Helpers ────────────────────────────────────────────────────────────────────

const log  = (msg)  => console.log(`  ✅  ${msg}`);
const warn = (msg)  => console.warn(`  ⚠️   ${msg}`);
const err  = (msg)  => console.error(`  ❌  ${msg}`);

const required = (name) => {
  const val = process.env[name];
  if (!val) {
    err(`Environment variable ${name} is not set. Add it to your .env file.`);
    process.exit(1);
  }
  return val;
};

// ── Connect ────────────────────────────────────────────────────────────────────

const MONGODB_URI    = required('MONGODB_URI');
const ADMIN_EMAIL    = required('SEED_ADMIN_EMAIL');
const ADMIN_PASSWORD = required('SEED_ADMIN_PASSWORD');

console.log('\n🌱  Portfolio seed script starting…\n');

await mongoose.connect(MONGODB_URI);
log('Connected to MongoDB');

// ── Clear all collections ──────────────────────────────────────────────────────

console.log('\n🗑️   Clearing existing data…');
await Promise.all([
  User.deleteMany({}),
  Project.deleteMany({}),
  Skill.deleteMany({}),
  Experience.deleteMany({}),
  Message.deleteMany({}),
]);
log('All collections cleared');

// ── Admin user ─────────────────────────────────────────────────────────────────

console.log('\n👤  Creating admin user…');
// Pass the raw password as `passwordHash` — the pre-save hook in User.model.js
// will bcrypt-hash it (cost factor 12) before the document is written to MongoDB.
const admin = await User.create({
  email:        ADMIN_EMAIL,
  passwordHash: ADMIN_PASSWORD,  // plaintext — hook hashes it
  role:         'admin',
});
log(`Admin user created → ${admin.email}`);


// ── Projects ───────────────────────────────────────────────────────────────────

console.log('\n🗂️   Seeding projects…');
const projects = await Project.insertMany([
  {
    title:            'DevFlow — Kanban Task Manager',
    shortDescription: 'A real-time collaborative Kanban board built for remote engineering teams.',
    longDescription:  `DevFlow lets teams create boards, columns, and cards with drag-and-drop reordering.
Cards support markdown descriptions, file attachments, labels, due dates, and assignees.
Activity feeds and WebSocket-powered live updates keep everyone in sync without page refreshes.
Role-based access control (owner / editor / viewer) keeps sensitive boards private.`,
    techStack:  ['React', 'TypeScript', 'Node.js', 'Socket.io', 'PostgreSQL', 'Prisma', 'Docker'],
    imageUrl:   'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80',
    liveUrl:    'https://devflow-demo.vercel.app',
    githubUrl:  'https://github.com/yourusername/devflow',
    featured:   true,
    order:      1,
  },
  {
    title:            'Luminary — AI Blog Platform',
    shortDescription: 'An AI-assisted blogging platform with auto-tagging, summarisation, and SEO analysis.',
    longDescription:  `Luminary uses the OpenAI API to help writers brainstorm, refine drafts, and generate
SEO-optimised meta descriptions. Posts are stored as MDX, rendered server-side via Next.js,
and indexed in Algolia for instant full-text search. The analytics dashboard tracks views,
read-time distribution, and top referrers in real time using Vercel Analytics.`,
    techStack:  ['Next.js 14', 'TypeScript', 'OpenAI API', 'Algolia', 'MongoDB', 'Tailwind CSS'],
    imageUrl:   'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80',
    liveUrl:    'https://luminary-blog.vercel.app',
    githubUrl:  'https://github.com/yourusername/luminary',
    featured:   true,
    order:      2,
  },
  {
    title:            'Heliox — Weather Dashboard',
    shortDescription: 'A beautiful, data-rich weather dashboard with 7-day forecasts and interactive maps.',
    longDescription:  `Heliox aggregates data from Open-Meteo and OpenStreetMap to deliver hyperlocal forecasts.
The dashboard displays current conditions, hourly precipitation probability, UV index, air quality
index, and a Leaflet-powered radar map. Users can pin multiple locations and toggle between
metric and imperial units. Built as a PWA with offline support via service workers.`,
    techStack:  ['React', 'Vite', 'Leaflet', 'Open-Meteo API', 'PWA', 'CSS Modules'],
    imageUrl:   'https://images.unsplash.com/photo-1504608524841-42584120d693?w=800&q=80',
    liveUrl:    'https://heliox-weather.vercel.app',
    githubUrl:  'https://github.com/yourusername/heliox',
    featured:   false,
    order:      3,
  },
]);
log(`${projects.length} projects created`);

// ── Skills ─────────────────────────────────────────────────────────────────────

console.log('\n🛠️   Seeding skills…');
const skills = await Skill.insertMany([
  // Languages
  { name: 'JavaScript',  category: 'language',  proficiency: 5, icon: 'javascript' },
  { name: 'TypeScript',  category: 'language',  proficiency: 5, icon: 'typescript' },
  { name: 'Python',      category: 'language',  proficiency: 4, icon: 'python'     },

  // Frameworks
  { name: 'React',       category: 'framework', proficiency: 5, icon: 'react'      },
  { name: 'Next.js',     category: 'framework', proficiency: 4, icon: 'nextjs'     },
  { name: 'Express.js',  category: 'framework', proficiency: 4, icon: 'express'    },

  // Tools
  { name: 'Docker',      category: 'tool',      proficiency: 3, icon: 'docker'     },
  { name: 'Git',         category: 'tool',      proficiency: 5, icon: 'git'        },
]);
log(`${skills.length} skills created`);

// ── Experience ─────────────────────────────────────────────────────────────────

console.log('\n💼  Seeding experience…');
const experience = await Experience.insertMany([
  {
    type:         'work',
    title:        'Senior Frontend Engineer',
    organization: 'Acme Corp',
    startDate:    new Date('2022-06-01'),
    endDate:      null, // Currently working here
    description:  `Lead the migration of the legacy AngularJS application to React 18,
reducing bundle size by 42% and improving Core Web Vitals scores to "Good" across all metrics.
Mentored a team of 3 junior engineers through weekly code reviews and pair-programming sessions.
Introduced Storybook for component documentation, cutting design-handoff time by 30%.`,
    order: 1,
  },
  {
    type:         'work',
    title:        'Full-Stack Developer',
    organization: 'Startup Studio XYZ',
    startDate:    new Date('2020-09-01'),
    endDate:      new Date('2022-05-31'),
    description:  `Designed and shipped 4 greenfield SaaS products from zero to launch within the studio's
rapid-prototyping model. Built REST and GraphQL APIs on Node.js, integrated Stripe subscriptions,
and deployed infrastructure on AWS (EC2, RDS, S3, CloudFront). Reduced average API response time
by 60% by introducing Redis caching on hotspot endpoints.`,
    order: 2,
  },
  {
    type:         'education',
    title:        'B.Sc. Computer Science',
    organization: 'University of Technology',
    startDate:    new Date('2016-09-01'),
    endDate:      new Date('2020-06-30'),
    description:  `First-class honours. Dissertation: "Optimising Graph Traversal for Real-Time
Collaborative Editing Algorithms" — achieved O(log n) conflict resolution via a novel CRDT approach.
Relevant coursework: Algorithms & Data Structures, Distributed Systems, Machine Learning, Compilers.
Vice-president of the university's Computing Society (2018–2020).`,
    order: 3,
  },
]);
log(`${experience.length} experience entries created`);

// ── Summary ────────────────────────────────────────────────────────────────────

console.log('\n─────────────────────────────────────────');
console.log('📊  Seed complete — summary:');
console.log(`     Users      : ${await User.countDocuments()}`);
console.log(`     Projects   : ${await Project.countDocuments()}`);
console.log(`     Skills     : ${await Skill.countDocuments()}`);
console.log(`     Experience : ${await Experience.countDocuments()}`);
console.log(`     Messages   : ${await Message.countDocuments()}`);
console.log('─────────────────────────────────────────\n');

// ── Disconnect ─────────────────────────────────────────────────────────────────

await mongoose.disconnect();
log('Disconnected from MongoDB — seed finished.\n');
process.exit(0);
