import React, { useState } from 'react';
import { motion } from 'framer-motion';

type UseCaseItem = {
  id: number;
  icon: string;
  title: string;
  description: string;
};

type UseCasesShowcaseProps = {
  subText?: string;
  heading?: string;
  highlightText?: string;
  description?: string;
  useCases?: UseCaseItem[];
};

const defaultUseCases: UseCaseItem[] = [{
  id: 1,
  icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  title: 'Strategic Planning & Implementation',
  description: 'We develop comprehensive digital marketing strategies tailored to your business goals, ensuring every campaign drives measurable results.'
}, {
  id: 2,
  icon: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
  title: 'Data-Driven Optimization',
  description: 'Gain clarity with advanced analytics and insights to track performance, optimize campaigns, and maximize your marketing ROI continuously.'
}];

// @component: UseCasesShowcase
export const UseCasesShowcase = (props: UseCasesShowcaseProps) => {
  const {
    subText = 'our approach',
    heading = 'Marketing strategies that transform your business into',
    highlightText = 'market leaders',
    description = 'We combine data-driven insights, creative excellence, and proven strategies to deliver marketing solutions that drive growth and exceed expectations.',
    useCases = defaultUseCases
  } = props;

  // @return
  return <section className="relative overflow-hidden py-28 px-4 w-full bg-white mb-[50px]">
      <div className="max-w-[1225px] mx-auto">
        <div className="flex items-center justify-between gap-20 relative flex-col lg:flex-row">
          {/* Left Part - Images */}
          <div className="relative flex-1 max-w-[495px] z-10 w-full">
            <div className="overflow-hidden rounded-[20px]">
              <img src="https://cdn.prod.website-files.com/6814558f14d25d33c9781a2f/68c94d509d1ce6056423c444_kloudera-home-one-cases-image.svg" alt="Main showcase" className="w-full h-auto object-cover" width={495} height={660} />
            </div>

            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.2,
            duration: 0.6
          }} className="absolute top-[106px] left-5 w-[406px]" style={{
            transformStyle: 'preserve-3d'
          }}>
              <img src="https://cdn.prod.website-files.com/6814558f14d25d33c9781a2f/68c94d509d1ce6056423c445_kloudera-home-one-cases-image.svg" alt="Overlay 1" className="w-full h-auto object-cover" width={398} height={160} />
            </motion.div>

            <motion.div initial={{
            opacity: 0,
            scale: 0.8
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            delay: 0.3,
            duration: 0.6
          }} className="absolute top-[106px] right-[-30px] w-[69px]" style={{
            transformStyle: 'preserve-3d'
          }}>
              <img src="https://cdn.prod.website-files.com/6814558f14d25d33c9781a2f/68c94d509d1ce6056423c446_kloudera-home-one-cases-image.svg" alt="Overlay 2" className="w-full h-auto object-cover" width={67} height={68} />
            </motion.div>

            <motion.div initial={{
            opacity: 0,
            x: 30
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            delay: 0.4,
            duration: 0.6
          }} className="absolute top-[238px] right-[-104px] w-[431px]" style={{
            transformStyle: 'preserve-3d'
          }}>
              <img src="https://cdn.prod.website-files.com/6814558f14d25d33c9781a2f/68c94d509d1ce6056423c447_kloudera-home-one-cases-image.svg" alt="Overlay 3" className="w-full h-auto object-cover" width={435} height={301} />
            </motion.div>

            <motion.div initial={{
            opacity: 0,
            rotate: -180
          }} animate={{
            opacity: 1,
            rotate: 0
          }} transition={{
            delay: 0.5,
            duration: 0.8
          }} className="absolute top-[323px] left-[45px] w-[109px]" style={{
            transformStyle: 'preserve-3d'
          }}>
              <img src="https://cdn.prod.website-files.com/6814558f14d25d33c9781a2f/68cd1b097d167447080dbf14_Group%202085663103%20(2).svg" alt="Decorative element" className="w-full h-auto object-cover" width={108} height={108} />
            </motion.div>

            <motion.div initial={{
            opacity: 0,
            y: -20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.6,
            duration: 0.6
          }} className="absolute bottom-0 left-0 w-[406px]" style={{
            transformStyle: 'preserve-3d'
          }}>
              <img src="https://cdn.prod.website-files.com/6814558f14d25d33c9781a2f/68c94d509d1ce6056423c449_kloudera-home-one-cases-image.svg" alt="Overlay 5" className="w-full h-auto object-cover" width={398} height={160} />
            </motion.div>
          </div>

          {/* Right Part - Content */}
          <div className="flex flex-col items-start gap-3 flex-1 max-w-[520px] w-full">
            <div>
              <motion.div initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.5
            }} className="font-['Inter_Tight',sans-serif] text-[#5200EE] text-sm font-medium tracking-[2.2px] uppercase mb-2.5" style={{
              transformStyle: 'preserve-3d'
            }}>
                {subText}
              </motion.div>

              <motion.h2 initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.1,
              duration: 0.5
            }} className="m-0 mb-5 font-medium text-[40px] leading-[50px] font-['Inter_Tight',sans-serif] text-[#071332] tracking-[-0.8px]" style={{
              transformStyle: 'preserve-3d'
            }}>
                {heading}{' '}
                <span className="bg-gradient-to-r from-[#3CA1FF] via-[#6E24FB] via-[#C61EE8] to-[#FF6948] bg-clip-text text-transparent" style={{
                WebkitTextFillColor: 'transparent'
              }}>
                  {highlightText}
                </span>
              </motion.h2>

              <div>
                <motion.p initial={{
                opacity: 0,
                y: 10
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.2,
                duration: 0.5
              }} className="m-0 font-['DM_Sans',sans-serif] text-[#4B497E] text-base leading-[25px] font-medium tracking-[-0.2px]" style={{
                transformStyle: 'preserve-3d'
              }}>
                  {description}
                </motion.p>
              </div>
            </div>

            <div className="w-full pt-6">
              {useCases.map((useCase, index) => <motion.div key={useCase.id} initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.3 + index * 0.1,
              duration: 0.5
            }} className={`py-[26px] ${index === useCases.length - 1 ? '' : 'border-b border-[#BEBDD2]'}`} style={{
              transformStyle: 'preserve-3d'
            }}>
                  <div className="w-full">
                    <div className="flex items-center gap-5">
                      <div>
                        <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#5200EE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[25px] h-[25px]">
                          <path d={useCase.icon} />
                        </svg>
                      </div>
                      <div className="font-['Inter_Tight',sans-serif] text-[#071332] text-xl leading-[30px] font-medium tracking-[-0.2px]">
                        {useCase.title}
                      </div>
                    </div>
                  </div>

                  <div className="mt-[14px] ml-12">
                    <p className="m-0 font-['DM_Sans',sans-serif] text-[#4B497E] text-base leading-[25px] font-medium tracking-[-0.2px]">
                      {useCase.description}
                    </p>
                  </div>
                </motion.div>)}
            </div>
          </div>

          <div className="absolute top-[-92px] left-[-191px] hidden lg:block">
            <img src="https://cdn.prod.website-files.com/6814558f14d25d33c9781a2f/68c94d509d1ce6056423c44e_box%20line%20(11)%20(copy).svg" alt="Background decoration" className="w-[598px] h-[468px]" width={598} height={468} />
          </div>
        </div>
      </div>
    </section>;
};