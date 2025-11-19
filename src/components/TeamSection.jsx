
import React, { useState, useEffect, memo } from 'react';
import { teamMembers } from '../data/teamData.js';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Add some CSS for the 3D flip effect and marquee
const style = document.createElement('style');
style.innerHTML = `
  .perspective {
    perspective: 1000px;
  }
  .card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.7s;
    transform-style: preserve-3d;
  }
  .card.flipped .card-inner {
    transform: rotateY(180deg);
  }
  .card-front, .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden; /* Safari */
    backface-visibility: hidden;
    border-radius: 1rem; /* rounded-2xl */
  }
  .card-back {
    transform: rotateY(180deg);
    background-color: #1a202c; /* A dark background for the back */
  }
  
  /* Marquee styles */
  .marquee {
    overflow: hidden;
    position: relative;
    width: 100%;
  }
  .marquee-content {
    display: flex;
    animation: marquee 30s linear infinite;
  }
  .marquee:hover .marquee-content {
    animation-play-state: paused;
  }
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
`;
document.head.appendChild(style);

const TeamMemberCard = memo(({ member, isFlipped, onClick }) => {
  return (
    <div className="perspective h-96 w-80 flex-shrink-0 mx-5 card" onClick={onClick}>
      <div className={`card-inner ${isFlipped ? 'flipped' : ''}`}>
        {/* Front of the Card */}
        <div className="card-front bg-white shadow-lg overflow-hidden">
          <img 
            src={member.imageUrl} 
            alt={member.name} 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
          <div className="absolute bottom-0 left-0 p-6">
            <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
            <p className="text-orange-400 text-md font-semibold">{member.role}</p>
          </div>
        </div>

        {/* Back of the Card */}
        <div className="card-back p-6 flex flex-col justify-center items-center text-white">
          <h4 className='text-xl font-bold text-orange-400 mb-3'>About Me</h4>
          <p className="text-sm text-center mb-4">{member.bio}</p>
          <h4 className='text-xl font-bold text-orange-400 mb-3'>Skills</h4>
          <div className="flex flex-wrap justify-center gap-2">
            {member.skills.map((skill, i) => (
              <span key={i} className="bg-gray-700 text-xs font-semibold px-3 py-1 rounded-full">{skill}</span>
            ))}
          </div>
           <div className="flex space-x-4 mt-5">
              {member.socials.map((social, index) => (
                <a key={index} href={social.url} className="text-white hover:text-orange-400 transition-colors text-xl">
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
});

const TeamSection = () => {
  const [flippedCardId, setFlippedCardId] = useState(null);

  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
  }, []);

  const handleCardClick = (id) => {
    setFlippedCardId(flippedCardId === id ? null : id);
  };

  // Duplicate members for a seamless loop
  const duplicatedMembers = [...teamMembers, ...teamMembers];

  return (
    <section className="bg-[#dbdbdb] py-20 md:py-28 font-inter ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="relative text-center mb-5 h-[40vh] md:h-[45vh] lg:h-[20vh]">
 

<h1
  
  className="absolute top-[6%] md:top-[3%] left-1/2 -translate-x-1/2 whitespace-nowrap text-[15vw] md:text-[12rem] lg:text-[10rem] font-semibold tracking-tight leading-[0.85] bg-[linear-gradient(180deg,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.05)_100%)] bg-clip-text text-transparent opacity-40 select-none z-0 pointer-events-none"
>
  Meet the Members
</h1>

</div>



      </div>
      <div className="marquee ">
        <div className="marquee-content">
          {duplicatedMembers.map((member, index) => (
            <TeamMemberCard 
              key={`${member.id}-${index}`}
              member={member} 
              isFlipped={flippedCardId === `${member.id}-${index}`}
              onClick={() => handleCardClick(`${member.id}-${index}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
