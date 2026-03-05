import { useState } from 'react'; 
import {
  BrainCircuit,
  LaptopMinimalCheck,
  Cpu,
  Bot,
  ExternalLink,
  ArrowUp,
  ArrowRight,
  BadgeAlert,
  ChartNoAxesColumnIncreasing,
  FileBadge,
  FileCheck,
  Award,
} from 'lucide-react';


const certificates = [
  {
    id: 1,
    title: 'Oracle Certified Generative AI Professional',
    issuer: 'Oracle Corporation',
    date: 'Issued October 2025',
    url: '#',
    icon: Award,
  },
  {
    id: 2,
    title: 'Oracle Certified Data Science Professional',
    issuer: 'Oracle Corporation',
    date: 'Issued October 2025',
    url: '#',
    icon: Award,
  },
  {
    id: 3,
    title:
      'Examination of Advanced Certification in Robotics and Automation – Grade A',
    issuer: 'Autofina Robotics | RCAT | Cadd Centre | CCUBE',
    date: 'Issued August 2025',
    url: '#',
    icon: LaptopMinimalCheck,
  },
  {
    id: 4,
    title: 'Internship - Robotics and Automation',
    issuer: 'Rajasthan Centre of Advanced Technology (R-CAT), Jaipur',
    date: 'Issued July 2025',
    url: '#',
    icon: Bot,
  },
  {
    id: 5,
    title: 'Industrial Training - Machine Learning and IoT',
    issuer: 'Malviya National Institute of Technology (MNIT), (MIIC), Jaipur',
    date: 'Issued July 2024',
    url: '#',
    icon: Cpu,
  },
  {
    id: 6,
    title: 'AI Agents Intensive Course With Google',
    issuer: 'Google | Kaggle',
    date: 'Issued December 2025',
    url: '#',
    icon: BrainCircuit,
  },
  {
    id: 7,
    title: 'Fundamentals of Deep Learning Course',
    issuer: 'Nvidia Corporation',
    date: 'Issued March 2025',
    url: '#',
    icon: BrainCircuit,
  },
  {
    id: 8,
    title: 'Anomaly Detection Course',
    issuer: 'Nvidia Corporation',
    date: 'Issued August 2025',
    url: '#',
    icon: BadgeAlert,
  },
  {
    id: 9,
    title: 'Professional Power BI Course',
    issuer: 'NoviTech R&D Private Limited',
    date: 'Issued September 2025',
    url: '#',
    icon: ChartNoAxesColumnIncreasing,
  },
  {
    id: 10,
    title: 'National Space Hackathon 2025',
    issuer: 'Indian Institute of Technology (IIT), Delhi',
    date: 'Issued April 2025',
    url: '#',
    icon: FileBadge,
  },
  {
    id: 11,
    title: 'amcat Certificate',
    issuer: 'SHL Corporation',
    date: 'Issued September 2025',
    url: '#',
    icon: FileCheck,
  },
  {
    id: 12,
    title: 'Oracle Certified AI Foundations Associate',
    issuer: 'Oracle Corporation',
    date: 'Issued October 2025',
    url: '#',
    icon: Award,
  },
  {
    id: 13,
    title: 'Execute 4.0 Hackathon of E-Summit-25',
    issuer: 'Delhi Technological University (DTU), New Delhi',
    date: 'Issued October 2025',
    url: '#',
    icon: FileBadge,
  },
  {
    id: 14,
    title: 'Oracle Certified DevOps Professional',
    issuer: 'Oracle Corporation',
    date: 'Issued November 2025',
    url: '#',
    icon: Award,
  },
  {
    id: 15,
    title: 'Oracle Certified Developer Professional',
    issuer: 'Oracle Corporation',
    date: 'Issued November 2025',
    url: '#',
    icon: Award,
  },

  {
    id: 16,
    title: 'iStart Training - Artificial Intelligence',
    issuer: 'iStart Rajasthan',
    date: 'Issued July 2025',
    url: '#',
    icon: BrainCircuit,
  },
];

const CERTS_TO_SHOW_INITIALLY = 3;

export const CertificatesSection = () => {
  
  const [visibleCount, setVisibleCount] = useState(CERTS_TO_SHOW_INITIALLY);

  const showViewMoreButton = visibleCount < certificates.length;
  const showShowLessButton = visibleCount > CERTS_TO_SHOW_INITIALLY;

  const handleViewMore = () => {
    setVisibleCount((prevCount) =>
      Math.min(prevCount + 3, certificates.length)
    );
  };

  const handleShowLess = () => {
    setVisibleCount(CERTS_TO_SHOW_INITIALLY);
  };
  

  return (
    <section id="certificates" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Certifications & <span className="text-primary">Achievements</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          A log of my continuous learning and professional development.
        </p>

        
        <div className="max-w-3xl mx-auto space-y-6">
          
          {certificates.slice(0, visibleCount).map((cert) => {
            const Icon = cert.icon; 
            return (
              <div
                key={cert.id}
                className="bg-card p-6 rounded-lg shadow-sm transition-all duration-300
                           hover:shadow-lg hover:scale-[1.02]
                           flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
               
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 p-3 rounded-full bg-primary/10 text-primary">
                    <Icon size={24} strokeWidth={2} />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg text-foreground">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {cert.issuer}
                    </p>
                  </div>
                </div>

                
                <div className="flex-shrink-0 flex flex-col items-start sm:items-end w-full sm:w-auto mt-4 sm:mt-0 pt-4 sm:pt-0 border-t border-border sm:border-none">
                  <p className="text-sm text-muted-foreground mb-2">
                    {cert.date}
                  </p>
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium
                               text-primary hover:text-primary/80 transition-colors
                               group">
                    View Credential
                    <ExternalLink
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </a>
                </div>
              </div>
            );
          })}
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
                View More
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
            href="https://www.linkedin.com/in/anas-ali-global">
            Check My LinkedIn
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
