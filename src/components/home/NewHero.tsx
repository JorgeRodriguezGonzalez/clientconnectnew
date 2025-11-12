{/* Título principal */}
<motion.h1 
  initial={{ opacity: 0, y: 80 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    delay: 0.5,
    duration: 0.8,
    ease: "easeOut",
  }}
  className="text-3xl md:text-[52px] font-light leading-tight md:leading-[60px] text-center text-white relative z-50 -mt-8"
  style={{
    fontFamily: '"Inter Display", sans-serif',
    letterSpacing: '-1.5px',
  }}
>
  We Bring{" "}
  <span className="relative inline-flex justify-center items-center overflow-hidden" style={{ minWidth: '160px', height: '1em', verticalAlign: 'baseline' }}>
    {words.map((word, index) => (
      <motion.span
        key={index}
        className="absolute font-semibold"
        initial={{ opacity: 0, y: -100 }}
        transition={{ type: "spring", stiffness: 50 }}
        animate={
          titleNumber === index
            ? {
                y: 0,
                opacity: 1,
              }
            : {
                y: titleNumber > index ? -150 : 150,
                opacity: 0,
              }
        }
      >
        {word}
      </motion.span>
    ))}
  </span>{" "}
  to Your Business Growth
</motion.h1>