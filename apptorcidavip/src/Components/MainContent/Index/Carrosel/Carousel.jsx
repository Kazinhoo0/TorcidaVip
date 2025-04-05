// Componente Carrossel para E-commerce
import React, { useState, useEffect } from 'react';
import './carousel.css';

// Importe suas próprias imagens aqui
// Exemplo: (você precisará substituir esses caminhos pelos reais)
import Botafogo from '../../../../uploads/1739386591037-regata_botafogo_kurt_feminina_preta_92408_4_496342d574ed5cdbb8b02fa06df511e5.png';
import vascodagama from '../../../../uploads/1739299213678-imagem_2024-10-11_182453126.png';
import slide3 from '../../../../imgs/Cmisafluminenseleftfeminina.png';
import infantil from '../../../../uploads/1739384705310-imagem_2024-01-07_130455993.png';
import fluminense from '../../../../uploads/1739386344841-imagem_2023-11-20_134604800.png';


const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      id: 1,
      image: Botafogo,
      title: "Coleção Campeões",
      subtitle: "As camisas dos clubes mais vitoriosos do Brasil",
      cta: "Compre Agora"
    },
    {
      id: 2,
      image: vascodagama,
      title: "Novidades da Temporada",
      subtitle: "Lançamentos oficiais 2025",
      cta: "Confira"
    },
    {
      id: 3,
      image: slide3,
      title: "Coleção Exclusiva",
      subtitle: "Produtos que só a Torcida VIP tem",
      cta: "Confira"
    },
    {
      id: 4,
      image: infantil,
      title: "Promoção Limitada",
      subtitle: "Até 40% OFF em itens selecionados",
      cta: "Aproveite"
    },
    {
      id: 5,
      image: fluminense,
      title: "Coleção Vasco da gama",
      subtitle: "A coleção do gigante da colina ",
      cta: "Ver produto"
    }
  ];

  // Função para avançar para o próximo slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Função para voltar ao slide anterior
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Função para ir direto a um slide específico
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Efeito para mudança automática de slides
  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 5000); // Muda a cada 5 segundos

    return () => clearInterval(intervalId); // Limpa o intervalo quando o componente é desmontado
  }, [currentSlide]);

  return (
    <div className="carousel-container">
      <div className="carousel-content">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ transform: `translateX(${100 * (index - currentSlide)}%)` }}
          >
            <div className="carousel-image-container">
              <img src={slide.image} alt={slide.title} className="carousel-image" />
              <div className="carousel-text-overlay">
                <h2>{slide.title}</h2>
                <p>{slide.subtitle}</p>
                <button className="carousel-cta-button">{slide.cta}</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="carousel-control prev" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="carousel-control next" onClick={nextSlide}>
        &#10095;
      </button>

      <div className="carousel-dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;