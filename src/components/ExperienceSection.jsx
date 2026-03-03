import {
  Briefcase,
  Calendar,
  MapPin,
  ArrowUpRight,
  Building2,
  ExternalLink,
} from 'lucide-react';
import { motion } from 'framer-motion';


const experiences = [
  {
    id: 1,
    company: 'Malviya National Institute of Technology (MNIT), (MIIC)',
    role: 'Machine Learning and IoT Trainee',
    period: '15th July 2024 — 31st July 2024',
    location: 'Jaipur',
    highlights: [
      'Learned concepts of machine learning and ai',
      'Designed and coded circuits and models of IoT devices',
      'Understood use of ml and IoT in various medical domains',
    ],
    stack: ['Arduino', 'Proteus', 'Python', 'ML Models'],
    link: '#',
  },
  {
    id: 2,
    company: 'Rajasthan Centre of Advanced Technology (RCAT)',
    role: 'Robotics and Automation Engineer Intern',
    period: '16th June 2025 — 31st July 2025',
    location: 'Jaipur',
    highlights: [
      'Designed and built various types robotic control systems',
      'Automation protocols and sensor integration and worked on industrial robots',
      'Designing and printing of 2D & 3D models',
    ],
    stack: ['Arduino IDE', 'SolidWorks', 'Autocad', 'Tinkercad', 'ESP32 & Hardwares'],
    link: '#',
  },
];


export const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 px-4 relative bg-muted/30">
     
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(50%_50%_at_50%_0%,black,transparent)]">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-64 w-[40rem] rounded-full blur-3xl opacity-30 bg-gradient-to-b from-primary/30 to-transparent" />
      </div>

      <div className="container mx-auto max-w-5xl relative">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">
            My <span className="text-primary">Experience</span>
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            A quick timeline of the roles I’ve held and my key contributions.
          </p>
        </div>

       
        <div className="relative">
         
          <div className="hidden md:block absolute left-4 top-0 h-full w-px bg-gradient-to-b from-primary/50 via-border to-transparent" />

          <div className="space-y-6">
            {experiences.map((job, idx) => (
              <motion.article
                key={job.id}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="relative grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 md:pl-10 bg-card/60 backdrop-blur-sm border rounded-xl p-5 md:p-6 hover:shadow-md hover:shadow-primary/10 transition-shadow">
               
                <div className="hidden md:block absolute left-4 top-6 -translate-x-1/2 h-3 w-3 rounded-full bg-primary ring-4 ring-primary/20" />

                <header className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center">
                    <Building2 className="opacity-70" size={18} />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold">
                      {job.role}
                    </h3>
                    <div className="text-sm text-muted-foreground flex flex-wrap gap-2 items-center">
                      <span className="inline-flex items-center gap-1">
                        <MapPin size={14} /> {job.location}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        • <Calendar size={14} /> {job.period}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        • <Briefcase size={14} /> {job.company}
                      </span>
                    </div>
                  </div>
                </header>

                <a
                  href={job.link}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="justify-self-start md:justify-self-end inline-flex items-center gap-1 text-sm mt-1 md:mt-0 text-foreground/80 hover:text-primary"
                  aria-label={`Open ${job.company} link`}>
                  View
                  <ArrowUpRight size={16} />
                </a>

                <ul className="col-span-full grid gap-2 mt-3 text-sm list-disc pl-5 marker:text-primary/70">
                  {job.highlights.map((h, i) => (
                    <li key={i} className="text-foreground/90">
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="col-span-full flex flex-wrap gap-2 mt-3">
                  {job.stack.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>

         
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Years', value: '2+' },
              { label: 'Projects', value: '15+' },
              { label: 'Ship Rate', value: 'Weekly' },
              { label: 'Roles', value: '3' },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl border bg-card/70 p-4 text-center">
                <div className="text-2xl font-bold">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};