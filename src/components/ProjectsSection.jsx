import { useState } from 'react';
import { ArrowRight, ArrowUp, ExternalLink, Github } from 'lucide-react'; 

const projects = [
  {
    id: 1,
    title: 'AI Finance Manager',
    description:
      'A full fledged web-app to manage finances with ai integration.',

    image: '/projects/finance.png',
    tags: [
      'Next.js',
      'TailwindCSS',
      'Shadcn UI',
      'Supabase',
      'Inngest',
      'Clerk',
      'Prisma',
      'Arcjet',
      'Resend',
    ],
    demoUrl: '#',
    githubUrl: '#',
  },
  {
    id: 2,
    title: 'Portfolio Website',
    description:
      'A developer portfolio built to present projects, achievements, expertise.',

    image: '/projects/portfolio.png',
    tags: ['React', 'Vite', 'TailwindCSS', 'Lucide', 'Framer'],
    demoUrl: '#',
    githubUrl: '#',
  },
  {
    id: 3,
    title: 'Model Wall-E',
    description:
      'Autonomous, perception system & manually controlled, mini robo car.',
    image: '/projects/robo.jpg',
    tags: ['Hardware', 'IoT', 'Arduino', 'Blynk', 'ESP32'],
    demoUrl: '#',
    githubUrl: '#',
  },
  {
    id: 4,
    title: 'Garage Managemenet System',
    description:
      'A system streamlines service operations by organizing bookings, inventory, billing, customer records.',
    image: '/projects/garage.png',
    tags: ['HTML5', 'CSS3', 'PHP', 'MySql', 'Apache', 'XAMPP'],
    demoUrl: '#',
    githubUrl: '#',
  },
  {
    id: 5,
    title: 'Web Music Player',
    description:
      'A web music player lets you stream and control your music directly from your browser.',
    image: '/projects/music.png',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    demoUrl: '#',
    githubUrl: '#',
  },
  {
    id: 6,
    title: 'Password Manager',
    description:
      'A password manager securely stores and auto-fills your passwords in place.',
    image: '/projects/pass.png',
    tags: ['React', 'Vite', 'TailwindCSS', 'Lucide'],
    demoUrl: '#',
    githubUrl: '#',
  },

  {
    id: 7,
    title: 'Cloud Storage Platform',
    description:
      'A cloud file storage platform lets you securely store, access, and share files from anywhere.',
    image: 'https://placehold.co/600x400/1e293b/ffffff?text=Cloud+Storage',
    tags: ['Express', 'Node', 'MongoDB', 'Multer', 'JWT'],
    demoUrl: '#',
    githubUrl: '#',
  },

  {
    id: 8,
    title: 'Task Tracker',
    description:
      'A task tracker helps you organize, prioritize, and monitor on tasks.',
    image: '/projects/task.png',
    tags: ['React', 'Vite', 'TailwindCSS'],
    demoUrl: '#',
    githubUrl: '#',
  },

  {
    id: 9,
    title: 'Crop Prediction',
    description:
      'A soil and climate based crop prediction system on the basis of various factors.',
    image: '/projects/crop.png',
    tags: ['Python', 'Machine Learning', 'Sklearn', 'NumPy', 'Flask'],
    demoUrl: '#',
    githubUrl: '#',
  },

  {
    id: 10,
    title: 'Token/Order Management System',
    description:
      'A system to manage orders and tokens efficiently for shop and restaurants.',
    image: 'https://placehold.co/600x400/1e293b/ffffff?text=Token+Flow',
    tags: ['Express', 'Node', 'React', 'SQLite', 'Socket.IO'],
    demoUrl: '#',
    githubUrl: '#',
  },
];

const PROJECTS_TO_SHOW_INITIALLY = 3;

export const ProjectsSection = () => {
 
  const [visibleCount, setVisibleCount] = useState(PROJECTS_TO_SHOW_INITIALLY);

  
  const showViewMoreButton = visibleCount < projects.length;
  
  const showShowLessButton = visibleCount > PROJECTS_TO_SHOW_INITIALLY;

  
  const handleViewMore = () => {
    
    setVisibleCount((prevCount) => Math.min(prevCount + 3, projects.length));
  };

  
  const handleShowLess = () => {
    setVisibleCount(PROJECTS_TO_SHOW_INITIALLY);
  };

  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Featured <span className="text-primary">Projects</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects. Each project was carefully
          crafted with attention to detail, performance, and user experience.
        </p>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0, visibleCount).map((project, key) => (
            <div
              key={project.id} 
              className="group bg-card rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg">
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  
                  onError={(e) => {
                    e.currentTarget.src = `https://placehold.co/600x400/ef4444/ffffff?text=Image+Error`;
                    e.currentTarget.onerror = null;
                  }}
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag} 
                      className="px-3 py-1 text-xs font-medium border rounded-full bg-secondary/70 text-secondary-foreground">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 h-10">
                  {project.description}
                </p>
                <div className="flex justify-between items-center mt-6">
                  <div className="flex space-x-4">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="text-foreground/80 hover:text-primary transition-colors duration-300 flex items-center gap-1.5">
                      <ExternalLink size={18} />
                      <span className="text-sm font-medium">Demo</span>
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="text-foreground/80 hover:text-primary transition-colors duration-300 flex items-center gap-1.5">
                      <Github size={18} />
                      <span className="text-sm font-medium">Code</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      
        <div className="text-center mt-16 flex flex-col items-center gap-6">
          <div className="flex flex-wrap justify-center gap-6">
           
            {showViewMoreButton && (
              <button
                onClick={handleViewMore}
                className="px-6 py-3 rounded-full font-medium transition-all duration-300
                           bg-primary text-primary-foreground shadow-md
                           hover:bg-primary/90 hover:shadow-lg
                           focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cosmic-button cursor-pointer">
                View More Projects
              </button>
            )}

            
            {showShowLessButton && (
              <button
                onClick={handleShowLess}
                className="px-6 py-3 rounded-full font-medium transition-all duration-300
                           bg-secondary text-secondary-foreground shadow-md
                           hover:bg-secondary/90 hover:shadow-lg
                           focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2
                           flex items-center gap-2 cosmic-button cursor-pointer">
                <ArrowUp size={16} /> 
                Show Less
              </button>
            )}
          </div>

         
          <a
            className="text-foreground/90 hover:text-primary transition-colors duration-300 font-medium w-fit flex items-center mx-auto gap-2 group"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/syAnasali">
            Check My GitHub
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
};
