import { useState } from 'react';
import { ArrowUp } from 'lucide-react';

const skills = [
  // Languages
  {
    name: 'C',
    category: 'languages',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/c/c-original.svg',
  },
  {
    name: 'C++',
    category: 'languages',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg',
  },
  {
    name: 'Python',
    category: 'languages',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg',
  },
  {
    name: 'Java',
    category: 'languages',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg',
  },

  // Front-End Development
  {
    name: 'HTML5',
    category: 'frontend',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg',
  },
  {
    name: 'CSS3',
    category: 'frontend',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg',
  },
  {
    name: 'JavaScript',
    category: 'frontend',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg',
  },
  {
    name: 'TypeScript',
    category: 'frontend',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg',
  },
  {
    name: 'React',
    category: 'frontend',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg',
  },
  {
    name: 'Next.js',
    category: 'frontend',
    icon: 'https://cdn.worldvectorlogo.com/logos/nextjs-2.svg',
  },
  {
    name: 'Vue.js',
    category: 'frontend',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original-wordmark.svg',
  },
  {
    name: 'Bootstrap',
    category: 'frontend',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain-wordmark.svg',
  },
  {
    name: 'Tailwind CSS',
    category: 'frontend',
    icon: 'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg',
  },
  {
    name: 'Shadcn/UI',
    category: 'frontend',
    icon: 'https://images.seeklogo.com/logo-png/51/2/shadcn-ui-logo-png_seeklogo-519786.png',
  },
  {
    name: 'Lucide',
    category: 'frontend',
    icon: 'https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/lucide.png',
  },
  {
    name: 'Framer Motion',
    category: 'frontend',
    icon: 'https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/vector-icons/brand-framer-motion-pk1mas1m7u9hi06fqzq77f.png/brand-framer-motion-nuunolaqtcs7zlblwkjs.png?_a=DATAg1AAZAA0',
  },
  {
    name: 'D3.js',
    category: 'frontend',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/d3js/d3js-original.svg',
  },
  {
    name: 'Chart.js',
    category: 'frontend',
    icon: 'https://www.chartjs.org/media/logo-title.svg',
  },

  // Back-End Development
  {
    name: 'Node.js',
    category: 'backend',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg',
  },
  {
    name: 'Express',
    category: 'backend',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg',
  },
  {
    name: 'PHP',
    category: 'backend',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg',
  },
  {
    name: 'XAMPP',
    category: 'backend',
    icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbCYUXWpPNC3pTzsqxogzykYLvoupTun7Gog&s',
  },

  // Databases
  {
    name: 'MongoDB',
    category: 'databases',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg',
  },
  {
    name: 'MySQL',
    category: 'databases',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg',
  },
  {
    name: 'PostgreSQL',
    category: 'databases',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg',
  },
  {
    name: 'Firebase',
    category: 'databases',
    icon: 'https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg',
  },
  {
    name: 'Oracle',
    category: 'databases',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/oracle/oracle-original.svg',
  },
  {
    name: 'Supabase',
    category: 'databases',
    icon: 'https://flow-in-public.nimbuspop.com/flow-apps/supabase.png',
  },

  // AI/ML & Data Science
  {
    name: 'TensorFlow',
    category: 'ai-ml',
    icon: 'https://www.vectorlogo.zone/logos/tensorflow/tensorflow-icon.svg',
  },
  {
    name: 'PyTorch',
    category: 'ai-ml',
    icon: 'https://www.vectorlogo.zone/logos/pytorch/pytorch-icon.svg',
  },
  {
    name: 'Scikit-Learn',
    category: 'ai-ml',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg',
  },
  {
    name: 'LangChain',
    category: 'ai-ml',
    icon: 'https://cdn.prod.website-files.com/60d251a34163cf29e1220806/68d4abcca211d662e26bd5da_Langchain%20(1).png',
  },
  {
    name: 'Pandas',
    category: 'ai-ml',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/2ae2a900d2f041da66e950e4d48052658d850630/icons/pandas/pandas-original.svg',
  },
  {
    name: 'NumPy',
    category: 'ai-ml',
    icon: 'https://logosandtypes.com/wp-content/uploads/2024/02/numpy.svg',
  },
  {
    name: 'Seaborn',
    category: 'ai-ml',
    icon: 'https://seaborn.pydata.org/_images/logo-mark-lightbg.svg',
  },
  {
    name: 'Matplotlib',
    category: 'ai-ml',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Created_with_Matplotlib-logo.svg/2048px-Created_with_Matplotlib-logo.svg.png',
  },
  {
    name: 'Power BI',
    category: 'ai-ml',
    icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToHQ0T9UxCk-gGRVT8qF7gnmFDBzllCVxIew&s',
  },

  // DevOps & Cloud
  {
    name: 'AWS',
    category: 'devops',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
  },
  {
    name: 'Google Cloud (GCP)',
    category: 'devops',
    icon: 'https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg',
  },
  {
    name: 'Docker',
    category: 'devops',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg',
  },
  {
    name: 'Kubernetes',
    category: 'devops',
    icon: 'https://www.vectorlogo.zone/logos/kubernetes/kubernetes-icon.svg',
  },
  {
    name: 'Bash',
    category: 'devops',
    icon: 'https://www.vectorlogo.zone/logos/gnu_bash/gnu_bash-icon.svg',
  },
  {
    name: 'Linux',
    category: 'devops',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg',
  },
  {
    name: 'Oracle Cloud (OCI)',
    category: 'devops',
    icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPsVFLTaNmLfrYc941IKgbNLsUTaN5gRaClA&s',
  },
  {
    name: 'Vercel',
    category: 'devops',
    icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfprgcI0tcsTQqKyB8Mnsoik1HC8njZOWPDg&s',
  },

  // Mobile Development
  {
    name: 'Android',
    category: 'mobile',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/android/android-original-wordmark.svg',
  },
  {
    name: 'React Native',
    category: 'mobile',
    icon: 'https://reactnative.dev/img/header_logo.svg',
  },

  // IOT & Robotics
  {
    name: 'Arduino',
    category: 'iot-robotics',
    icon: 'https://cdn.worldvectorlogo.com/logos/arduino-1.svg',
  },
  {
    name: 'SolidWorks',
    category: 'iot-robotics',
    icon: 'https://www.cadimensions.com/wp-content/uploads/2022/08/solidworks-desktop-logo.png',
  },
  {
    name: 'AutoCAD',
    category: 'iot-robotics',
    icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg6oPA1vOrXHYMc-KsEp6j6JSuKW8KLlHERA&s',
  },
  {
    name: 'Proteus',
    category: 'iot-robotics',
    icon: 'https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/logos/proteus-m6yuuf4xb9n49h83irqsfn.png/proteus-9iq1io6zwhr4e131ry1sex.png?_a=DATAg1AAZAA0',
  },
  {
    name: 'Tinkercad',
    category: 'iot-robotics',
    icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY6qGz6YzV6Y0WtV5Uoj_HTBMKhdIdulOGdw&s',
  },
  {
    name: 'Blynk',
    category: 'iot-robotics',
    icon: 'https://images.crunchbase.com/image/upload/c_pad,h_256,w_256,f_auto,q_auto:eco,dpr_1/zwtsdjimn9gcgq4nrunp?ik-sanitizeSvg=true',
  },
  {
    name: 'ESP32',
    category: 'iot-robotics',
    icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYbzKaeYJZUYW7rC5fCt_4S8Uf-_PRFoQa6Q&s',
  },

  // Designing and Graphics
  {
    name: 'Figma',
    category: 'designing',
    icon: 'https://www.vectorlogo.zone/logos/figma/figma-icon.svg',
  },
  {
    name: 'Photoshop',
    category: 'designing',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/photoshop/photoshop-line.svg',
  },
  {
    name: 'Adobe',
    category: 'designing',
    icon: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/adobe-icon.png',
  },
  {
    name: 'Canva',
    category: 'designing',
    icon: 'https://www.d-id.com/wp-content/uploads/2023/04/1656733637logo-canva-png.png',
  },

  // Tools & Other
  {
    name: 'Git',
    category: 'tools',
    icon: 'https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg',
  },
  {
    name: 'GitHub',
    category: 'tools',
    icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF1HctiRAMzzzwozHLo0YxPfZF1vQrjvcWeg&s',
  },
  {
    name: 'Postman',
    category: 'tools',
    icon: 'https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg',
  },
  {
    name: 'VS Code',
    category: 'tools',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg',
  },
  {
    name: 'Jupyter',
    category: 'tools',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Jupyter_logo.svg/1035px-Jupyter_logo.svg.png',
  },
  {
    name: 'Google Colab',
    category: 'tools',
    icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGF6WmQC01Yfk2Q7JwYf3FLzBfjzUs-Xr7SA&s',
  },
  {
    name: 'VMware',
    category: 'tools',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Vmware_workstation_16_icon.svg/1200px-Vmware_workstation_16_icon.svg.png',
  },
  {
    name: 'OBS Studio',
    category: 'tools',
    icon: 'https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/video-games/obs-studio-uf988qj3h6s4pogd796j8.png/obs-studio-v04pu8ksuqcecv9lzkz7rb.png?_a=DATAg1AAZAA0',
  },
];

const categories = [
  'all',
  'languages',
  'frontend',
  'backend',
  'databases',
  'ai-ml',
  'devops',
  'mobile',
  'iot-robotics',
  'designing',
  'tools',
];

const SKILLS_TO_SHOW_INITIALLY = 10;

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleCount, setVisibleCount] = useState(SKILLS_TO_SHOW_INITIALLY);

  const filteredSkills = skills.filter(
    (skill) => activeCategory === 'all' || skill.category === activeCategory,
  );

  const showViewMoreButton = visibleCount < filteredSkills.length;
  const showShowLessButton = visibleCount > SKILLS_TO_SHOW_INITIALLY;

  const handleViewMore = () => {
    setVisibleCount((prevCount) =>
      Math.min(prevCount + 10, filteredSkills.length),
    );
  };

  const handleShowLess = () => {
    setVisibleCount(SKILLS_TO_SHOW_INITIALLY);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setVisibleCount(SKILLS_TO_SHOW_INITIALLY);
  };

  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center">
          My <span className="text-primary">Skills</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10 md:mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`
                px-3 py-1.5 md:px-6 md:py-2 text-xs md:text-sm lg:text-base rounded-full transition-all duration-300 capitalize font-medium cosmic-button cursor-pointer
                ${
                  activeCategory === category
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-card text-foreground hover:bg-secondary/70 shadow-sm'
                }
              `}>
              {category.replace('-', ' & ')}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {filteredSkills.slice(0, visibleCount).map((skill) => (
            <div
              key={skill.name}
              className="bg-card p-4 md:p-6 rounded-lg shadow-sm transition-all duration-300 ease-out
                         hover:shadow-xl hover:scale-105
                         flex flex-col items-center justify-center gap-3 md:gap-4 text-center">
              <img
                src={skill.icon}
                alt={skill.name}
                className="h-8 w-8 md:h-10 md:w-10 object-contain"
                loading="lazy"
              />
              <h3 className="font-semibold text-sm sm:text-base md:text-lg text-foreground">
                {skill.name}
              </h3>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 flex flex-col items-center gap-6">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {showViewMoreButton && (
              <button
                onClick={handleViewMore}
                className="px-5 py-2.5 md:px-6 md:py-3 text-sm md:text-base rounded-full font-medium transition-all duration-300
                           bg-primary text-primary-foreground shadow-md
                           hover:bg-primary/90 hover:shadow-lg
                           focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cosmic-button cursor-pointer">
                View More Skills
              </button>
            )}

            {showShowLessButton && (
              <button
                onClick={handleShowLess}
                className="px-5 py-2.5 md:px-6 md:py-3 text-sm md:text-base rounded-full font-medium transition-all duration-300
                           bg-secondary text-secondary-foreground shadow-md
                           hover:bg-secondary/90 hover:shadow-lg
                           focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2
                           flex items-center gap-2 cosmic-button cursor-pointer">
                <ArrowUp size={16} className="w-4 h-4 md:w-5 md:h-5" />
                Show Less
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
