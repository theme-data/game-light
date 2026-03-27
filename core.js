$(document).ready(function(){

  const CONFIG = window.THEME_CONFIG || {};

  // Ajustes gerais  
  $('#cabecalho .span8.busca-mobile').after(`
      <div class="h-actions hidden-phone">
          <a href="/conta/login" class="h-user">
              <img src="https://cdn.awsli.com.br/2942/2942234/arquivos/user.svg" alt="Minha conta">
              <span>Entrar</span>
          </a>
      </div>
  `);
  
  $('#cabecalho .conteudo-topo .inferior').after(`
      <div class="h-actions visible-phone">
          <a href="/conta/login" class="h-user">
              <img src="https://cdn.awsli.com.br/2942/2942234/arquivos/user.svg" alt="Minha conta">
              <span>Entrar</span>
          </a>
  
          <div class="h-search visible-phone">
              <img src="https://cdn.awsli.com.br/2942/2942234/arquivos/search.svg" alt="Buscar">
          </div>
  
          <div class="h-menu visible-phone">
              <img src="https://cdn.awsli.com.br/2942/2942234/arquivos/menu.svg" alt="Menu">
          </div>
      </div>
  `);
  
  $('.banner.cheio .flex-direction-nav').prepend($('.banner.cheio .flex-control-nav'));
  
  // $('.selos li:first-child img').attr('src','https://cdn.awsli.com.br/2830/2830294/arquivos/site-protegido.svg');
  $('#rodape>div:last-child .conteiner .row-fluid div:not(.span12)').before(`<div class="feito-pixelset"><a href="https://www.pixelset.com.br/" class="pixel-logo" target="_blank"><img src="https://cdn.awsli.com.br/2942/2942234/arquivos/pixel-set.svg" alt="Pixelset"></a></div>`)
  $('#rodape>div:last-child .row-fluid > div:last-child').attr('style','')
  

  var whatsappNumbers = CONFIG.whatsappNumbers || [];
  
  var whatsappDropdownHtml = `
  <div class="whatsapp-dropdown">
      <button class="whatsapp-btn" type="button">
          <i class="fa fa-whatsapp"></i> Fale conosco pelo WhatsApp
      </button>
      <ul class="whatsapp-dropdown-menu" style="display: none;">
          ${whatsappNumbers.map(function(num) {
              return `<li>
                          <strong>${num.title}:</strong> <a href="https://wa.me/${num.phone}" target="_blank">${num.display}</a>
                      </li>`;
          }).join('')}
      </ul>
  </div>
  `;

  $('#rodape .institucional .lista-redes').after(whatsappDropdownHtml);
  
  // Quando clicar no botão troca a classe do dropdown para abrir/fechar
  $(document).on('click', '.whatsapp-btn', function() {
      var $dropdown = $(this).closest('.whatsapp-dropdown');
      $dropdown.toggleClass('open');
      var $menu = $dropdown.find('.whatsapp-dropdown-menu');
      if ($dropdown.hasClass('open')) {
          $menu.slideDown(150);
      } else {
          $menu.slideUp(150);
      }
  });
  

  if (CONFIG.miniBannerPosicao) {
    $('.pagina-inicial .vitrine-' + CONFIG.miniBannerPosicao + ' + ul')
      .after($('.mini-banner'));
  }

  
  // Variáveis editáveis para as informações do atendimento
  const atendimento = CONFIG.atendimento || {};
  
  var atendimentoHtml = `
      <div class="span4 atendimento-rodape">
          <span class="titulo">${atendimento.titulo}</span>
          <ul>
              <li>${atendimento.horarios?.[0] || ''}</li>
              <li>${atendimento.horarios?.[1] || ''}</li>
              <li>${atendimento.horarios?.[2] || ''}</li>
              <li style="margin-top:10px;">
                  <img src="${atendimento.whatsapp?.icon}" alt="${atendimento.whatsapp?.alt}" style="vertical-align:middle; width:20px; margin-right:8px;">
                  ${atendimento.whatsapp?.number}
              </li>
              <li style="margin-top:5px;">
                  <img src="${atendimento.email?.icon}" alt="${atendimento.email?.alt}" style="vertical-align:middle; width:20px; margin-right:8px;">
                  <a href="mailto:${atendimento.email?.address}" style="color:inherit; text-decoration:none;">${atendimento.email?.address}</a>
              </li>
          </ul>
      </div>
  `;
  
  $('#rodape .sobre-loja-rodape').replaceWith(atendimentoHtml);
  
  // Defina as variáveis das categorias (imagem, link e alt)
  var categorias = CONFIG.categorias || [];
  
  // Montar os <li> dinamicamente usando as variáveis
  var categoriaLis = categorias.map(function(c){
      return `<li class="c-item">
          <a href="${c.link}">
              <img src="${c.img}" alt="${c.alt}">
          </a>
      </li>`;
  }).join('');
  
  // Adiciona o bloco antes de #listagemProdutos
  $('.pagina-inicial #listagemProdutos').before(`
  <div class="c-slide-section">
      <div class="c-slide-header">
          <h2 class="c-slide-title">
              Navegue por categoria
          </h2>
          <p class="c-slide-subtitle">
              Escolha abaixo uma categoria para explorar nossos jogos
          </p>
      </div>
      <ul class="c-slide">
          ${categoriaLis}
      </ul>
  </div>    
  `);
  
  // Ativa o Slick Slider na lista de categorias
  $('.c-slide').slick({
      slidesToShow: 6,
      slidesToScroll: 1,
      arrows: true,
      dots: false,
      infinite: true,
      responsive: [
          {
              breakpoint: 768,
              settings: {
                  slidesToShow: 2
              }
          }
      ]
  });
  
  // --------- SLIDER
  
    // remove comportamento antigo
    $('#listagemProdutos .listagem-linha .flex-viewport').css({
      overflow: 'visible'
    });
  
    $('#listagemProdutos .listagem-linha.flexslider').removeClass('flexslider');
  
    const $carousel = $('#listagemProdutos .produtos-carrossel');
  
    // evita iniciar duas vezes
    if (!$carousel.hasClass('slick-initialized')) {
  
      // remove estilos inline do flexslider
      $carousel.removeAttr('style');
      $carousel.find('li').removeAttr('style');
  
      $carousel.slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        infinite: false,
        arrows: true,
        dots: false,
        speed: 400,
        draggable: true,
        adaptiveHeight: false,
  
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2
            }
          }
        ]
      });
  
    }
  
  
      // -----------------------------
    // BOTÃO
    // -----------------------------
    $('.info-principal-produto').after(
      '<button class="btn-forma-pagamento">Forma de pagamento</button>'
    );
  
    // -----------------------------
    // MODAL
    // -----------------------------
    $('body').append(`
      <div id="modal-pagamento">
        <div class="modal-conteudo"><div class="modal-header"><h3>Formas de pagamento</h3><button class="fechar-modal">✕</button></div></div>
      </div>
    `);
    
    $('.parcelas-produto').appendTo('#modal-pagamento .modal-conteudo');
    $(document).on('click', '.btn-forma-pagamento', function () {
      $('#modal-overlay, #modal-pagamento').addClass('ativo');
    });
    $(document).on('click', '.fechar-modal, #modal-overlay', function () {
      $('#modal-overlay, #modal-pagamento').removeClass('ativo');
    });
  
  $('.produto .conteiner-imagem #abreZoom').remove();
  
  $('.pagina-categoria .conteudo > .titulo').prepend($('.pagina-categoria .breadcrumbs'));
    $('.ordenar-listagem.topo > .row-fluid').prepend($('.pagina-categoria .conteudo > .titulo'));
    $('.ordenar-listagem .row-fluid > .span6').removeClass('span6');
    
    
    $(document).ready(function () {
  
      /* ======================================================
         1. CRIA BOTÃO FILTRAR
      ====================================================== */
  
      $('.ordenar-listagem.topo .row-fluid').append(`
          <button class="btn btn-filtrar" data-toggle="modal" data-target="#modalFiltros">
              Filtrar
          </button>
      `);
  
  
      /* ======================================================
         2. CRIA MODAL
      ====================================================== */
  
      $('body').append(`
          <div id="modalFiltros" class="modal fade" tabindex="-1" style="display: none;">
              <div class="modal-dialog modal-lg">
                  <div class="modal-content">
  
                      <div class="modal-header">
                          <h4 class="modal-title">Filtros</h4>
                          <button type="button" class="close" data-dismiss="modal">&times;</button>
                      </div>
  
                      <div class="modal-body">
                          <div class="modal-ordenar">
                            <h4>Ordenar por:</h4>
                          </div>
                          <div class="modal-filtros"></div>
                      </div>
  
                  </div>
              </div>
          </div>
      `);
  
  
      /* ======================================================
         3. MOVE DROPDOWN ORDENAR PARA O MODAL
      ====================================================== */
  
      $('.ordenar-listagem.topo .dropdown-menu')
          .appendTo('#modalFiltros .modal-ordenar');
  
  
      /* ======================================================
         4. MOVE TODOS OS FILTROS PARA O MODAL
      ====================================================== */
  
      $('.filtro-coluna').appendTo('#modalFiltros .modal-filtros');
  
  });
  
  /* =========================
   📢 MOVER BANNER PARA VITRINE (CONFIGURÁVEL)
==========================*/

if (CONFIG.bannerVitrine) {

  const vitrineSelector = `.pagina-inicial .vitrine-${CONFIG.bannerVitrine}`;

  $(vitrineSelector)
    .before($('.secao-banners .conteiner .banner.hidden-phone'));

}

  $('#barraNewsletter .componente .texto-newsletter').prepend($('#barraNewsletter .componente .titulo'));
  
  $(function () {
    /* =========================
       🎬 VIDEOS EDITÁVEIS
    ==========================*/
    const videosShorts = CONFIG.videosShorts || [];
  
    /* =========================
       🧱 MONTA HTML DINÂMICO
    ==========================*/
  
    let slides = '';
  
    videosShorts.forEach((id) => {
      slides += `
        <div class="depoimento-item">
          <div class="video-wrapper">
            <iframe
              src="https://www.youtube.com/embed/${id}?enablejsapi=1&controls=0&rel=0&modestbranding=1&playsinline=1"
              frameborder="0"
              allow="autoplay; encrypted-media"
              allowfullscreen>
            </iframe>
          </div>
        </div>
      `;
    });
  
    const htmlSlider = `
      <section class="depoimentos-video">
        <div class="container">
          <h2>Depoimentos em vídeo</h2>
          <p>Veja o que nossos clientes estão falando dos produtos.</p>
  
          <div class="slider-depoimentos">
            ${slides}
          </div>
        </div>
      </section>
    `;
  
    /* =========================
       📍 INSERE NO DOM
    ==========================*/
  
    $('.pagina-inicial .vitrine-lancamento+ul').after(htmlSlider);
  
    /* =========================
       🎯 INICIA SLICK
    ==========================*/
  
    $('.slider-depoimentos').slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      arrows: true,
      dots: false,
      infinite: true,
      adaptiveHeight: false,
      responsive: [
        {
          breakpoint: 768,
          settings: { slidesToShow: 2 },
        },
      ],
    });
  
    /* =========================
       🧠 PAUSA VÍDEOS AO TROCAR
    ==========================*/
  
    $('.slider-depoimentos').on('beforeChange', function () {
      $('.slider-depoimentos iframe').each(function () {
        this.contentWindow.postMessage(
          '{"event":"command","func":"pauseVideo","args":""}',
          '*'
        );
      });
    });
  });

  

  
  
  // FAQ
  
  $(function () {
  
      /* =========================
         📋 PERGUNTAS EDITÁVEIS
      ==========================*/
      const faqItems = CONFIG.faqItems || [];
    
    
      /* =========================
         🧱 MONTA HTML
      ==========================*/
      let faqHTML = `
        <section class="faq-section">
          <div class="faq-container">
            <h2>FAQ</h2>
            <p class="faq-subtitle">Dúvidas frequentes</p>
            <div class="faq-list">
      `;
    
      faqItems.forEach((item, index) => {
    
        faqHTML += `
          <div class="faq-item ${item.ativo ? 'active' : ''}">
            <div class="faq-pergunta">
              <span>${item.pergunta}</span>
              <div class="faq-icon">${item.ativo ? '−' : '+'}</div>
            </div>
    
            <div class="faq-resposta" style="${item.ativo ? 'display:block' : 'display:none'}">
              ${item.resposta}
            </div>
          </div>
        `;
      });
    
      faqHTML += `
            </div>
          </div>
        </section>
      `;
    
    
      /* =========================
         📍 INSERE NA HOME
      ==========================*/
      $('body.pagina-inicial #corpo, body.pagina-produto #corpo').after(faqHTML);
    
    
      /* =========================
         🎯 COMPORTAMENTO ACCORDION
      ==========================*/
      $(document).on('click', '.faq-pergunta', function () {
    
        const item = $(this).closest('.faq-item');
    
        // fecha outros
        $('.faq-item').not(item).removeClass('active')
          .find('.faq-resposta').slideUp(250);
    
        $('.faq-item').not(item)
          .find('.faq-icon').text('+');
    
        // toggle atual
        item.toggleClass('active');
    
        item.find('.faq-resposta').slideToggle(250);
    
        item.find('.faq-icon').text(
          item.hasClass('active') ? '−' : '+'
        );
    
      });
    
    });
    
  
    $(function () {
  
      /* =========================
         🧩 BENEFÍCIOS EDITÁVEIS
      ==========================*/
      const beneficios = CONFIG.beneficios || [];
    
    
      /* =========================
         🧱 MONTA HTML
      ==========================*/
      let itensHTML = "";
    
      beneficios.forEach((item, index) => {
    
        itensHTML += `
          <div class="beneficio-item">
            <div class="beneficio-icone">${item.icone}</div>
    
            <div class="beneficio-texto">
              <strong>${item.titulo}</strong>
              <span>${item.texto}</span>
            </div>
          </div>
        `;
    
        // divisória (menos no último)
        if(index < beneficios.length - 1){
          itensHTML += `<div class="beneficio-divider"></div>`;
        }
      });
    
    
      const barraBeneficios = `
        <section class="barra-beneficios">
          <div class="beneficios-container">
            ${itensHTML}
          </div>
        </section>
      `;
    
    
      /* =========================
         📍 INSERÇÃO INTELIGENTE
      ==========================*/
    
      if ($('#barraNewsletter').length) {
        $('#barraNewsletter').before(barraBeneficios);
      } else {
        $('#rodape').before(barraBeneficios);
      }
    
    });
  
    // Remove texto da bandeira
  
    $(function () {
  
      $('.bandeiras-produto .bandeira-promocao').each(function () {
    
        let texto = $(this).text();
    
        // remove a palavra "Desconto"
        texto = texto.replace(/desconto/i, '').trim();
    
        // pega apenas o número
        let numero = texto.replace('%', '').trim();
    
        // monta novo formato
        $(this).text(`-${numero}%`);
    
      });
    
    });

    $('.pagina-busca .ordenar-listagem.topo').prepend($('.pagina-busca .listagem > .titulo'));
  
  if ($(window).width() > 768) {
  //Desktop
      $('.conteudo-topo .inferior').prepend($('.menu.superior'));
  
      $('.produto')
      .children()
      .not('.row-fluid:first')
      .appendTo('.conteiner-imagem');
  
      // Muda resolução das imagens
  
      $('.listagem .imagem-produto img').each(function () {
          var $img = $(this);
          var src = $img.attr('src');
  
          if (!src) return;
  
          // Troca 300x300 por 512x512
          var newSrc = src.replace('/300x300/', '/512x512/');
  
          // Só atualiza se realmente mudou
          if (newSrc !== src) {
          $img.attr('src', newSrc);
  
          // Se existir lazyload com data-src, atualiza também
          if ($img.attr('data-src')) {
              $img.attr('data-src', newSrc);
          }
          }
      });
      
      
      $('.mini-banner img').each(function () {
          var $img = $(this);
          var src = $img.attr('src');
  
          if (!src) return;
  
          // Troca 400x400 por 800x800
          var newSrc = src.replace('/400x400/', '/800x800/');
  
          if (newSrc !== src) {
          $img.attr('src', newSrc);
  
          // Se houver lazyload com data-src
          if ($img.attr('data-src')) {
              $img.attr('data-src', newSrc);
          }
          }
      });
  
      $('.pagina-produto .miniaturas img').each(function () {
  
          var $img = $(this);
          var src = $img.attr('src');
      
          if (!src) return;
      
          // troca SOMENTE 64x50 por 100x100
          var newSrc = src.replace('/64x50/', '/100x100/');
      
          if (newSrc !== src) {
      
              // src principal
              $img.attr('src', newSrc);
      
              // lazy load (se existir)
              if ($img.attr('data-src')) {
                  $img.attr('data-src', newSrc);
              }
      
              // atributos usados pela Loja Integrada
              if ($img.attr('data-mediumimg')) {
                  $img.attr(
                      'data-mediumimg',
                      $img.attr('data-mediumimg').replace('/64x50/', '/100x100/')
                  );
              }
      
              if ($img.attr('data-largeimg')) {
                  $img.attr(
                      'data-largeimg',
                      $img.attr('data-largeimg').replace('/64x50/', '/100x100/')
                  );
              }
          }
      
      });
  
      $(window).on('load', function () {
  
          $('.compre-junto__imagem img').each(function () {
      
              var $img = $(this);
              var src = $img.attr('src');
              if (!src) return;
      
              var newSrc = src.replace('/150x150/', '/300x300/');
      
              if (newSrc !== src) {
                  $img.attr('src', newSrc);
      
                  if ($img.attr('data-src')) {
                      $img.attr('data-src', newSrc);
                  }
              }
          });
      
      });
      
      var $menu = $('.menu.superior .nivel-um');
      var $itens = $menu.children('li');
    
      // só executa se tiver mais de 5 itens
      if ($itens.length > 5) {
    
        // cria o LI "Mais"
        var $mais = $(`
          <li class="categoria-mais borda-principal">
            <a href="javascript:void(0)">Mais<i class="icon-chevron-down fundo-secundario"></i></a>
            <ul class="submenu-mais"></ul>
          </li>
        `);
    
        // pega todos os itens a partir do 6º (index 5)
        var $excedentes = $itens.slice(5);
    
        // move os itens para dentro do submenu
        $mais.find('.submenu-mais').append($excedentes);
    
        // adiciona o "Mais" no final do menu
        $menu.append($mais);
      }
  
  //Fim desktop
  } else {
  //Mobile    
  $('.menu.superior').append(`<div class="close-menu"><img src="https://cdn.awsli.com.br/2923/2923109/arquivos/close.svg" alt="fechar"/></div>`);
  
  
  $(document).on('click', '.close-menu', function () {
    $('.menu.superior .nivel-um.active').removeClass('active');
  });
  
  $(document).on('click', '.h-menu', function () {
    $('.menu.superior .nivel-um').addClass('active');
  });
  
  $(document).on('click', '.h-search', function () {
    $('.conteudo-topo > .inferior').toggleClass('active');
  });
  
  $('.h-menu').before($('#cabecalho .conteudo-topo .inferior .span4.hidden-phone > .carrinho'));
  
  const botaoComprar = document.querySelector('.produto .acoes-produto .comprar');
  
  if (!botaoComprar) return;
  
  // cria um elemento "sentinela" na posição original do botão
  const sentinel = document.createElement('div');
  sentinel.style.height = "1px";
  
  botaoComprar.parentNode.insertBefore(sentinel, botaoComprar);
  
  const observer = new IntersectionObserver((entries) => {
  
    entries.forEach(entry => {
  
      // Se NÃO estiver visível na tela → fixa
      if (!entry.isIntersecting) {
        botaoComprar.classList.add('comprar-fixo');
      } 
      // Se voltou para viewport → normal
      else {
        botaoComprar.classList.remove('comprar-fixo');
      }
  
    });
  
  }, {
    root: null,
    threshold: 0
  });
  
  observer.observe(sentinel);
  
  //Fim mobile
  }

  var tarja = CONFIG.tarja || [];

  var tarjaItems = tarja.map(function(t){
    return `
      <div class="t-item">
        <img src="${t.icon}" alt="${t.titulo}">
        <div class="t-text">
          <strong>${t.titulo}</strong>
          <span>${t.texto}</span>
        </div>
      </div>
    `;
  }).join('');

  $('.pagina-inicial .secao-banners').after(`
    <div class="t-bar">
      <div class="t-slide">
        ${tarjaItems}
      </div>
    </div>
  `);

  $('.t-slide').slick({
    slidesToShow: 4,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 0,
    speed: 4000,
    cssEase: 'linear',
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });
  
});