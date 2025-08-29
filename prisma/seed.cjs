const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

const TYPES = [
  { slug: 'patient-safety',     name: 'Patient safety incident',                 description: 'Actual or potential harm to a patient.' },
  { slug: 'medication-error',   name: 'Medication error/omission',               description: 'Wrong drug, dose, route, timing, or omission.' },
  { slug: 'clinical-governance',name: 'Clinical governance',                      description: 'Guideline/protocol deviation, documentation, decision-making.' },
  { slug: 'safeguarding',       name: 'Safeguarding concern',                     description: 'Vulnerable persons at risk; adult/child safeguarding.' },
  { slug: 'volunteer-safety',   name: 'Volunteer/staff safety',                   description: 'Injury, assault, exposure, or unsafe conditions affecting volunteers/staff.' },
  { slug: 'health-safety',      name: 'Health & Safety',                          description: 'General H&S hazards/incidents (non-clinical).' },
  { slug: 'dangerous-occurrence', name: 'Dangerous occurrence / near miss',       description: 'High-risk near miss or RIDDOR dangerous occurrence.' },
  { slug: 'notifiable-disease', name: 'Notifiable disease / infection',           description: 'Infectious disease reporting or exposure.' },
  { slug: 'equipment-issue',    name: 'Equipment issue',                          description: 'Failure, defect, missing or unfit equipment.' },
  { slug: 'vehicle-incident',   name: 'Vehicle accident/incident',                description: 'Collision, damage, or near miss involving vehicles.' },
  { slug: 'data-governance',    name: 'Data / information governance',            description: 'Data breach, confidentiality, records handling.' },
  { slug: 'it-system',          name: 'IT / system issue',                        description: 'System outage, access, performance, or software fault.' },
  { slug: 'security',           name: 'Security incident',                        description: 'Disorder, aggression/violence, theft, site security.' },
  { slug: 'staffing',           name: 'Staffing / rostering problem',             description: 'Insufficient cover, skill mix, rostering errors.' },
  { slug: 'other',              name: 'Other',                                     description: 'Anything not captured by other categories.' },
];

async function ensureAdminUser() {
  const passwordHash = bcrypt.hashSync('Edenfield85', 10); // change after first login
  await prisma.user.upsert({
    where: { email: 'john.garvey@festival-medical.org' },
    update: {},
    create: {
      name: 'John Garvey',
      email: 'john.garvey@festival-medical.org',
      role: 'ADMIN',
      passwordHash,
    },
  });
}

async function ensureIncidentTypes() {
  for (const t of TYPES) {
    await prisma.incidentType.upsert({
      where: { slug: t.slug },
      update: { name: t.name, description: t.description ?? null },
      create: { slug: t.slug, name: t.name, description: t.description ?? null },
    });
  }
}

async function ensureNotificationRules() {
  const allTypes = await prisma.incidentType.findMany({ select: { id: true } });
  for (const t of allTypes) {
    const existing = await prisma.notificationRule.findFirst({ where: { incidentTypeId: t.id } });
    if (!existing) {
      await prisma.notificationRule.create({ data: { incidentTypeId: t.id, recipients: "" } });
    }
  }
}

async function main() {
  await ensureAdminUser();
  await ensureIncidentTypes();
  await ensureNotificationRules();
  console.log('Seed complete: admin user + incident types + per-type notification rules');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
