import { ScrollReveal } from './ScrollReveal';

const features = [
  {
    title: 'Бриллианты мирового класса',
    description:
      'Только сертифицированные камни высочайшего качества. Каждый бриллиант проходит строгий отбор — безупречная огранка, чистота и сияние, которое невозможно не заметить.',
    image: '/gallery/feature-diamonds.webp',
    imageAlt: 'Бриллианты крупным планом',
  },
  {
    title: '750+ изделий в наличии',
    description:
      'Белое и жёлтое золото 750 пробы. Кольца, серьги, подвески, браслеты, колье — всё в наличии и готово стать вашим. Без ожидания, без предзаказа.',
    image: '/gallery/feature-gold.webp',
    imageAlt: 'Ювелирные изделия из белого золота',
  },
  {
    title: 'Лучшие цены',
    description:
      'Прямые поставки из Италии без посредников. Эксклюзивные модели по справедливой цене — роскошь, которая доступна.',
    image: '/gallery/feature-price.webp',
    imageAlt: 'Кольцо с бриллиантом',
  },
];

export function Features() {
  return (
    <section id="about" className="py-20 md:py-32 border-t border-border">
      <ScrollReveal>
        <div className="text-center mb-16 md:mb-24 px-6">
          <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
            Почему мы
          </span>
          <h2 className="mt-4 text-4xl md:text-6xl lg:text-7xl font-medium">
            Три причины{' '}
            <em className="font-normal italic text-muted-foreground">выбрать нас</em>
          </h2>
        </div>
      </ScrollReveal>

      <div className="space-y-16 md:space-y-0">
        {features.map((feat, i) => {
          const imageRight = i % 2 === 0;

          return (
            <ScrollReveal key={feat.title}>
              <div
                className={`flex flex-col ${
                  imageRight ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-center min-h-[400px] md:min-h-[500px]`}
              >
                {/* Text */}
                <div className="w-full md:w-1/2 px-6 md:px-10 lg:px-20 py-10 md:py-16 flex flex-col justify-center">
                  <div
                    className={`max-w-md ${imageRight ? 'md:ml-auto' : 'md:mr-auto'}`}
                  >
                    <h3 className="text-3xl md:text-4xl lg:text-5xl italic font-medium font-['Playfair_Display',serif] leading-[1.15] text-foreground">
                      {feat.title}
                    </h3>
                    <p className="mt-5 text-sm md:text-base text-muted-foreground font-light leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                </div>

                {/* Image with edge fade */}
                <div className="w-full md:w-1/2 relative h-[300px] md:h-[500px]">
                  <img
                    src={feat.image}
                    alt={feat.imageAlt}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  {/* Top fade */}
                  <div className="absolute top-0 left-0 right-0 h-32 md:h-40 bg-gradient-to-b from-background to-transparent" />
                  {/* Bottom fade */}
                  <div className="absolute bottom-0 left-0 right-0 h-32 md:h-40 bg-gradient-to-t from-background to-transparent" />
                  {/* Side fade — toward text */}
                  <div
                    className={`absolute top-0 bottom-0 w-40 md:w-64 ${
                      imageRight
                        ? 'left-0 bg-gradient-to-r from-background to-transparent'
                        : 'right-0 bg-gradient-to-l from-background to-transparent'
                    }`}
                  />
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
