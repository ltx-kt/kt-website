import { defineCollection, z } from 'astro:content';

const experience = defineCollection({
  type: 'content',
  schema: z.object({
    order: z.number(),
    years: z.string(),
    role: z.string(),
    company: z.string(),
    location: z.string(),
    summary: z.string(),
    details: z.array(z.string()),
    stack: z.array(z.string()),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    order: z.number(),
    name: z.string(),
    tag: z.string(),
    blurb: z.string(),
    details: z.string(),
    stack: z.array(z.string()),
    meta: z.string(),
  }),
});

const education = defineCollection({
  type: 'content',
  schema: z.object({
    order: z.number(),
    years: z.string(),
    degree: z.string(),
    school: z.string(),
    detail: z.string().optional(),
  }),
});

const profile = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    title: z.string(),
    resumeSummary: z.string(),
    heroGreeting: z.array(z.string()),
    about: z.object({
      lead: z.string(),
      paragraphs: z.array(z.string()),
    }),
  }),
});

const social = defineCollection({
  type: 'data',
  schema: z.object({
    github:   z.object({ url: z.string().url(), display: z.string() }),
    linkedin: z.object({ url: z.string().url(), display: z.string() }),
  }),
});

const skills = defineCollection({
  type: 'data',
  schema: z.object({
    groups: z.array(z.object({
      label: z.string(),
      items: z.array(z.string()),
    })),
  }),
});

export const collections = { experience, projects, education, profile, social, skills };
