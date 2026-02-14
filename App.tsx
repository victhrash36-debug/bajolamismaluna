import React, { useEffect, useState, useMemo, useRef } from "react";
import StarBackground from "./components/StarBackground";
import CrescentMoon from "./components/CrescentMoon";
import Polaroid from "./components/Polaroid";
import { calculateLunas, START_DATE } from "./utils/calculations";

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const lunasCount = useMemo(() => calculateLunas(START_DATE), []);

  const photos = [
    {
      src: "../resources/imgs/20190908.png",
      caption: "08/09/2019",
      rotation: "-rotate-2",
      delay: "delay-1",
    },
    {
      src: "../resources/imgs/IMG_20201114_182805.jpg",
      caption: "14/11/2020",
      rotation: "rotate-3",
      delay: "delay-2",
    },
    {
      src: "../resources/imgs/IMG_20211128_043834893.jpg",
      caption: "28/11/2021",
      rotation: "rotate-2",
      delay: "delay-3",
    },
    {
      src: "../resources/imgs/20220909_212441.jpg",
      caption: "09/09/2022",
      rotation: "rotate-3",
      delay: "delay-4",
    },
  ];

  const photos2 = [
    {
      src: "../resources/imgs/20230524_201802.jpg",
      caption: "24/05/2023",
      rotation: "rotate-2",
      delay: "delay-5",
    },
    {
      src: "../resources/imgs/20241018_210504(0).jpg",
      caption: "18/10/2024",
      rotation: "rotate-2",
      delay: "delay-6",
    },
    {
      src: "../resources/imgs/IMG_20251102_224058.jpg",
      caption: "02/11/2025",
      rotation: "rotate-2",
      delay: "delay-7",
    },
    {
      src: "../resources/imgs/IMG_20260201_213930.jpg",
      caption: "01/02/2026",
      rotation: "rotate-2",
      delay: "delay-8",
    },
  ];

  const sections = [
    {
      id: "inicio",
      title: "Hola Torina",
      subtitle:
        "Este es un pequeño viaje por nuestra historia a través de las lunas...",
      content: "",
    },
    {
      id: "historia",
      title: "Un 8 de Septiembre",
      subtitle: "Donde todo comenzó...",
      content:
        "Fue en el 2019 cuando nuestras órbitas se cruzaron por primera vez.",
    },
    {
      id: "lunas",
      title: "El paso del tiempo",
      subtitle: "Contado en lunas",
      content: `Han pasado unas 2,354 noches, con alrededor de 77 lunas llenas, 77 lunas nuevas, 77 cuartos crecientes y 77 cuartos menguantes. En ese tiempo también se registraron entre 20 y 25 superlunas, una cantidad similar de microlunas y unos 7 eclipses totales que provocaron lunas rojas...  
      
  Y en cada una de ellas te he pensado
      `,
    },
    {
      id: "galeria",
      title: "Nuestros lunas",
      subtitle: "Capturadas en el tiempo",
      content: "",
      isGallery: true,
      photos: photos,
    },
    {
      id: "galeria2",
      title: "Nuestros lunas",
      subtitle: "Capturadas en el tiempo",
      content: "",
      isGallery: true,
      photos: photos2,
    },
    {
      id: "luz",
      title: "Bajo la misma luz",
      subtitle: "No importa dónde este",
      content: "La luna siempre me recuerda a ti",
    },
    {
      id: "final",
      title: "Feliz 14 de Febrero",
      subtitle: "Te amo infinitamente",
      content: "Gracias por ser mi estrella más brillante.",
      isFinal: true,
    },
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observerOptions = {
      root: container,
      threshold: 0.6,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute("data-index"));
          setActiveSection(index);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const elements = container.querySelectorAll(".snap-section");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative bg-slate-950 text-white selection:bg-purple-500/30 overflow-hidden h-screen">
      <StarBackground />

      {/* Floating indicators */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
        {sections.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              containerRef.current?.children[i]?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-700 ${
              activeSection === i
                ? "bg-white scale-150 shadow-[0_0_15px_white]"
                : "bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Ir a la sección ${i + 1}`}
          />
        ))}
      </div>

      {/* Narrative Sections Container */}
      <div ref={containerRef} className="snap-container relative z-10">
        {sections.map((section, index) => {
          const isActive = activeSection === index;

          return (
            <section
              key={index}
              data-index={index}
              className="snap-section flex flex-col items-center justify-center p-8 text-center"
            >
              <div
                className={`max-w-5xl space-y-8 px-4 transition-all duration-1000 ${
                  isActive
                    ? "opacity-100 blur-0 translate-y-0"
                    : "opacity-0 blur-md translate-y-10 pointer-events-none"
                }`}
              >
                <div className="space-y-4">
                  <h1
                    className={`text-5xl md:text-8xl font-bold tracking-tight text-white drop-shadow-2xl ${
                      index === 0 || section.isFinal ? "cursive" : ""
                    } ${isActive ? "animate-reveal delay-1" : ""}`}
                  >
                    {section.title}
                  </h1>

                  <h2
                    className={`text-xl md:text-3xl font-light text-slate-300 uppercase tracking-widest italic ${
                      isActive ? "animate-reveal delay-2" : ""
                    }`}
                  >
                    {section.subtitle}
                  </h2>
                </div>

                {section.isGallery ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pt-8 items-center justify-center">
                    {section.photos.map((photo, pIdx) => (
                      <div
                        key={pIdx}
                        className={isActive ? "animate-reveal" : "opacity-0"}
                      >
                        <Polaroid
                          src={photo.src}
                          caption={photo.caption}
                          rotation={photo.rotation}
                          delay={photo.delay}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p
                    className={`text-lg md:text-2xl leading-relaxed text-slate-200 font-light max-w-2xl mx-auto ${
                      isActive ? "animate-reveal delay-3" : ""
                    }`}
                  >
                    {section.content}
                  </p>
                )}

                {index === 0 && (
                  <div
                    className={`pt-12 animate-bounce opacity-40 ${
                      isActive ? "delay-1000" : "opacity-0"
                    }`}
                  >
                    <svg
                      className="w-10 h-10 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                    <p className="text-[10px] uppercase tracking-[0.3em] mt-3 font-semibold">
                      Desliza para continuar
                    </p>
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>

      {/* Decorative Moon Phases Backdrop */}
      <div className="fixed bottom-10 left-10 opacity-10 pointer-events-none select-none z-0 hidden lg:block transition-all duration-1000">
        <div className="flex gap-6 items-center">
          {sections.map((_, i) => (
            <div
              key={i}
              className={`w-6 h-6 rounded-full border border-white relative transition-all duration-1000 ${
                activeSection === i
                  ? "opacity-100 scale-125 border-2 shadow-[0_0_10px_white]"
                  : "opacity-30 scale-100"
              }`}
            >
              {i === 2 && <div className="absolute inset-0 bg-white/40"></div>}
              {i === 4 && <div className="absolute inset-0 bg-white/60"></div>}
              {i === sections.length - 1 && (
                <div className="absolute inset-0 bg-white shadow-[0_0_20px_white]"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
