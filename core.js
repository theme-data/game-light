$(document).ready(function(){

  const CONFIG = window.THEME_CONFIG || {};

  // Ajustes gerais  
  $('#cabecalho .span8.busca-mobile').after(`
      <div class="h-actions hidden-phone">
          <a href="/conta/login" class="h-user">
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
  
  // Defina as variáveis das categorias (imagem, link, alt e titulo)
  var categorias = CONFIG.categorias || [];
  
  // Montar os <li> dinamicamente usando as variáveis (inclui <span> com o título abaixo da imagem)
  var categoriaLis = categorias.map(function(c){
      return `<li class="c-item">
          <a href="${c.link}">
              <img src="${c.img}" alt="${c.alt}">
              <span class="c-titulo-categoria">${c.titulo}</span>
          </a>
      </li>`;
  }).join('');
  
  // Adiciona o bloco antes de #listagemProdutos
  $('.secao-banners').before(`
  <div class="c-slide-section">
      <ul class="c-slide">
          ${categoriaLis}
      </ul>
  </div>    
  `);

  /* =========================
    TEMA DO CABEÇALHO
  ========================== */
  (function () {
    var temaCabecalho = (
      window.THEME_CONFIG &&
      window.THEME_CONFIG.temaCabecalho
    ) || 'light';

    temaCabecalho = String(temaCabecalho).toLowerCase();

    if (temaCabecalho !== 'dark' && temaCabecalho !== 'light') {
      temaCabecalho = 'light';
    }

    $('body')
      .removeClass('tema-cabecalho-dark tema-cabecalho-light')
      .addClass('tema-cabecalho-' + temaCabecalho);
  })();
  
  // Ativa o Slick Slider na lista de categorias
  $('.c-slide').slick({
      slidesToShow: 9,
      slidesToScroll: 1,
      arrows: true,
      dots: false,
      infinite: true,
      responsive: [
          {
              breakpoint: 768,
              settings: {
                  slidesToShow: 3
              }
          }
      ]
  });
  
/* Banner opcional acima de uma vitrine/categoria da home */
(function () {
  var bannersCategoriasHome = CONFIG.bannersCategoriasHome || [];

  function escaparHtml(valor) {
    return String(valor || '').replace(/[&<>'"]/g, function (caractere) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#039;',
        '"': '&quot;'
      }[caractere];
    });
  }

  function formatarTempo(totalSegundos) {
    var dias = Math.floor(totalSegundos / 86400);
    var horas = Math.floor((totalSegundos % 86400) / 3600);
    var minutos = Math.floor((totalSegundos % 3600) / 60);
    var segundos = totalSegundos % 60;

    return [dias, horas, minutos, segundos]
      .map(function (valor) {
        return String(valor).padStart(2, '0');
      })
      .join(' : ');
  }

  bannersCategoriasHome.forEach(function (banner) {
    if (!banner || !banner.ativo || !banner.idCategoria) return;

    var $vitrine = $('.pagina-inicial .vitrine-' + banner.idCategoria).first();

    if (!$vitrine.length || $('#banner-categoria-' + banner.idCategoria).length) {
      return;
    }

    var contadorHtml = banner.usarContador
      ? '<div class="banner-categoria-contador" data-data-fim="' +
        escaparHtml(banner.dataFim) +
        '">00 : 00 : 00 : 00</div>'
      : '';

    $vitrine.before([
      '<section class="banner-categoria-home" id="banner-categoria-' +
        escaparHtml(banner.idCategoria) + '">',
        '<div class="banner-categoria-conteudo">',
          '<strong class="banner-categoria-etiqueta">' +
            escaparHtml(banner.etiqueta) +
          '</strong>',
          contadorHtml,
          '<p class="banner-categoria-texto">' +
            escaparHtml(banner.titulo || banner.texto) +
          '</p>',
          '<a class="banner-categoria-botao" href="' +
            escaparHtml(banner.linkBotao || '#') +
          '">' +
            escaparHtml(banner.textoBotao || 'VER OFERTAS') +
          '</a>',
        '</div>',
      '</section>'
    ].join(''));
    
    /* Quando o contador estiver ativo:
        - remove o título da categoria;
        - adiciona classes na UL da vitrine. */
    if (banner.usarContador) {
      $vitrine
        .next('ul')
        .addClass('vitrine-com-banner-contador')
        .addClass('vitrine-categoria-' + banner.idCategoria);
    
      $vitrine.remove();
    }
  });

  function atualizarContadoresCategoria() {
    $('.banner-categoria-contador').each(function () {
      var $contador = $(this);
      var dataFim = new Date($contador.attr('data-data-fim')).getTime();
      var diferenca = Math.max(
        0,
        Math.floor((dataFim - Date.now()) / 1000)
      );

      if (!dataFim || diferenca <= 0) {
        $contador
          .closest('.banner-categoria-home')
          .addClass('banner-categoria-encerrado');

        $contador.text('OFERTA ENCERRADA');
        return;
      }

      $contador.text(formatarTempo(diferenca));
    });
  }

  if ($('.banner-categoria-contador').length) {
    atualizarContadoresCategoria();
    setInterval(atualizarContadoresCategoria, 1000);
  }
})();

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
      //$('.conteudo-topo .inferior').prepend($('.menu.superior'));
  
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

    // adiciona o ícone
    $('.links-rodape .titulo, .atendimento-rodape .titulo, .visible-phone .titulo')
    .each(function(){
      if (!$(this).find('.chev').length) {
        $(this).append('<span class="chev"><img src="https://cdn.awsli.com.br/2942/2942234/arquivos/chevron_fdown.svg"/></span>');
      }
    });

  // toggle no click
  $('.links-rodape .titulo, .atendimento-rodape .titulo, .visible-phone .titulo')
    .on('click', function(){

      var $parent = $(this).parent();
      var $ul = $parent.find('ul');

      $ul.toggleClass('open');
      $(this).toggleClass('open');

    });

  
  //Fim mobile
  }

  var tarja = CONFIG.tarja || [];

  var tarjaItems = tarja.map(function(t){
    return `
      <div class="t-item">
        <div class="tarja-img">
          <img src="${t.icon}" alt="${t.titulo}">
        </div>
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

  // MOVE TARJA


  var vitrineTarja = CONFIG.vitrineTarja || {};

  if (vitrineTarja.idVitrine) {
    $(`.pagina-inicial .vitrine-${vitrineTarja.idVitrine}`)
      .before($('.banner.tarja'));
  }

  //ALERTA DIGITAL 

  if (typeof CONFIG === "undefined") return;

  var conf = CONFIG.alertaProduto || {};
  var icon = conf.icon || "";
  var texto = conf.texto || "";

  var $target = $('.pagina-produto .produto .cep');

  if ($target.length && !$('.alert-envio-digital').length) {
    $target.before(`
      <div class="alert-envio-digital">
        ${icon ? `<i><img src="${icon}" alt=""></i>` : ``}
        ${texto}
      </div>
    `);
  }

  var textoAlertBar = CONFIG.alertBar || {};

  if (textoAlertBar.mensagem) {
    $('.barra-inicial')
      .replaceWith(`
        <div class="alert-bar">
          <span>${textoAlertBar.mensagem}</span>
        </div>
      `);
  }

  var vitrineDestaque = CONFIG.vitrineDestaque || {};
  var id = vitrineDestaque.idVitrine;
  
  if (id) {
    var css = `
      .vitrine-${id} + ul .listagem-linha li .listagem-item {
        display: flex;
      }
  
      .vitrine-${id} + ul .listagem-linha > div > ul {
        display: grid;
        width: 100% !important;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
      }
  
      .vitrine-${id} + ul .listagem-linha {
        width: 100% !important;
      }
  
      .vitrine-${id} + ul .listagem-linha li {
        width: 100% !important;
        border-radius: 8px;
        border: 1px solid #d8d8d8 !important;
        box-sizing: border-box;
      }
  
      .vitrine-${id} + ul .listagem-linha li .listagem-item .imagem-produto {
        max-width: 120px;
      }
  
      .vitrine-${id} + ul .listagem-linha li .listagem-item .info-produto {
        width: 100%;
      }
  
      .vitrine-${id} + ul .flex-direction-nav {
        display: none;
      }
  
      .vitrine-${id} + ul .listagem-linha > div > ul .bandeiras-produto {
        display: none;
      }

      .vitrine-${id} + ul .flex-direction-nav {
        display: none!important;
      }
  
      @media screen and (max-width: 768px) {
        .pagina-inicial .vitrine-${id} + ul .listagem-linha {
          width: 100% !important;
        }
  
        .vitrine-${id} + ul .listagem-linha > div > ul {
          grid-template-columns: 1fr;
        }
      }
    `;
  
    $('<style>')
      .prop('type', 'text/css')
      .html(css)
      .appendTo('head');
  }

  
});

/* =========================
  OFERTAS DESTACADAS
========================== */
(function () {
  var configOfertas = (window.THEME_CONFIG && window.THEME_CONFIG.ofertasDestacadas) || {};

  if (!configOfertas.ativo) return;

  var ofertas = (configOfertas.ofertas || []).filter(function (oferta) {
    return oferta && oferta.ativo;
  });

  if (!ofertas.length || $('#ofertas-destacadas').length) return;

  function escaparHtml(valor) {
    return String(valor || '').replace(/[&<>"']/g, function (caractere) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      }[caractere];
    });
  }

  function iconeTag() {
    return [
      '<svg viewBox="0 0 24 24" aria-hidden="true">',
        '<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3.4 13.4a2 2 0 0 1-.6-1.4V5a2 2 0 0 1 2-2h7a2 2 0 0 1 1.4.6l7.4 7a2 2 0 0 1 0 2.8Z"></path>',
        '<circle cx="7.5" cy="7.5" r="1.1"></circle>',
      '</svg>'
    ].join('');
  }

  var ofertasHtml = ofertas.map(function (oferta, indice) {
    var tipo = oferta.tipo || 'link';
    var botao;

    if (tipo === 'cupom') {
      botao = [
        '<button type="button" class="oferta-destaque-botao js-copiar-cupom" ',
          'data-cupom="', escaparHtml(oferta.cupom), '">',
          escaparHtml(oferta.textoBotao || 'COPIAR'),
        '</button>'
      ].join('');
    } else {
      botao = [
        '<a class="oferta-destaque-botao" href="', escaparHtml(oferta.link || '#'), '">',
          escaparHtml(oferta.textoBotao || 'VER OFERTAS'),
        '</a>'
      ].join('');
    }

    return [
      '<article class="oferta-destaque-item" data-oferta="', indice, '">',
        '<div class="oferta-destaque-icone">', iconeTag(), '</div>',
        '<div class="oferta-destaque-textos">',
          '<strong>', escaparHtml(oferta.titulo), '</strong>',
          '<span>', escaparHtml(oferta.descricao), '</span>',
        '</div>',
        botao,
      '</article>'
    ].join('');
  }).join('');

  var html = [
    '<div id="ofertas-destacadas" class="ofertas-destacadas">',
      '<button type="button" class="ofertas-destacadas-aba" aria-label="Abrir ofertas especiais">',
        '<span class="ofertas-destacadas-aba-icone">', iconeTag(), '</span>',
        '<span>', escaparHtml(configOfertas.tituloAba || 'Ofertas para você'), '</span>',
      '</button>',

      '<div class="ofertas-destacadas-overlay"></div>',

      '<aside class="ofertas-destacadas-painel" aria-hidden="true">',
        '<header class="ofertas-destacadas-header">',
          '<h2>', escaparHtml(configOfertas.tituloPainel || 'Ofertas especiais'), '</h2>',
          '<button type="button" class="ofertas-destacadas-fechar" aria-label="Fechar ofertas">×</button>',
        '</header>',

        '<div class="ofertas-destacadas-lista">',
          ofertasHtml || '<p class="ofertas-destacadas-vazio">' +
            escaparHtml(configOfertas.textoVazio || 'Nenhuma oferta disponível no momento.') +
          '</p>',
        '</div>',
      '</aside>',
    '</div>'
  ].join('');

  $('body').append(html);

  var $container = $('#ofertas-destacadas');

  function abrirOfertas() {
    $container.addClass('ofertas-abertas');
    $container.find('.ofertas-destacadas-painel').attr('aria-hidden', 'false');
    $('body').addClass('ofertas-destacadas-abertas');
  }

  function fecharOfertas() {
    $container.removeClass('ofertas-abertas');
    $container.find('.ofertas-destacadas-painel').attr('aria-hidden', 'true');
    $('body').removeClass('ofertas-destacadas-abertas');
  }

  $container.on('click', '.ofertas-destacadas-aba', abrirOfertas);
  $container.on('click', '.ofertas-destacadas-fechar, .ofertas-destacadas-overlay', fecharOfertas);

  $(document).on('keydown', function (evento) {
    if (evento.key === 'Escape') fecharOfertas();
  });

  $container.on('click', '.js-copiar-cupom', function () {
    var $botao = $(this);
    var cupom = $botao.attr('data-cupom') || '';
    var textoOriginal = $botao.text();

    function feedback() {
      $botao.text('COPIADO!');
      setTimeout(function () {
        $botao.text(textoOriginal);
      }, 1800);
    }

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(cupom).then(feedback);
      return;
    }

    var campo = document.createElement('textarea');
    campo.value = cupom;
    campo.style.position = 'fixed';
    campo.style.opacity = '0';
    document.body.appendChild(campo);
    campo.select();
    document.execCommand('copy');
    document.body.removeChild(campo);
    feedback();
  });

  if (configOfertas.abrirAutomaticamente) {
    setTimeout(abrirOfertas, 800);
  }
})();

/* =========================
  BOTÃO WHATSAPP — LISTAGEM
========================== */
(function () {
  var configWhatsapp = (
    window.THEME_CONFIG &&
    window.THEME_CONFIG.whatsappListagem
  ) || {};

  if (!configWhatsapp.ativo || !configWhatsapp.telefone) return;

  function obterNomeProduto($produto) {
    return (
      $produto.find('.nome-produto').first().text() ||
      $produto.find('.produto-nome').first().text() ||
      $produto.find('a[data-produto-id]').first().attr('title') ||
      $produto.find('img').first().attr('alt') ||
      'Produto da loja'
    ).trim();
  }

  function obterLinkProduto($produto) {
    var link = (
      $produto.find('.nome-produto a').first().attr('href') ||
      $produto.find('.produto-nome a').first().attr('href') ||
      $produto.find('a[href*="/produto/"]').first().attr('href') ||
      $produto.find('a').first().attr('href') ||
      ''
    );

    if (link && link.indexOf('http') !== 0) {
      link = window.location.origin + link;
    }

    return link || window.location.href;
  }

  function criarBotaoWhatsapp($produto) {
    if ($produto.find('.botao-comprar-whatsapp').length) return;

    var nomeProduto = obterNomeProduto($produto);
    var linkProduto = obterLinkProduto($produto);

    var mensagem = String(
      configWhatsapp.mensagem ||
      'Olá! Tenho interesse neste produto:\n\n{produto}\n{link}'
    )
      .replace(/\{produto\}/gi, nomeProduto)
      .replace(/\{link\}/gi, linkProduto);

    var urlWhatsapp =
      'https://wa.me/' +
      String(configWhatsapp.telefone).replace(/\D/g, '') +
      '?text=' +
      encodeURIComponent(mensagem);

    var target = configWhatsapp.novaAba !== false
      ? ' target="_blank" rel="noopener noreferrer"'
      : '';

    var html = [
      '<a class="botao-comprar-whatsapp" href="', urlWhatsapp, '"', target, '>',
        '<img src="https://cdn.awsli.com.br/2942/2942234/arquivos/whatsapp.png" alt="Whatsapp"/>',
        '<span>', configWhatsapp.textoBotao || 'COMPRE PELO WHATSAPP', '</span>',
      '</a>'
    ].join('');

    /* Insere abaixo do botão de comprar de cada produto */
    var $acoes = $produto.find('.acoes-produto').first();

    if ($acoes.length) {
      $acoes.append(html);
    } else {
      $produto.find('.produto-info, .info-produto').first().append(html);
    }
  }

  function adicionarBotoesWhatsapp() {
    $('.listagem .listagem-item, .vitrine .listagem-item').each(function () {
      criarBotaoWhatsapp($(this));
    });
  }

  adicionarBotoesWhatsapp();

  var observer = new MutationObserver(function () {
    adicionarBotoesWhatsapp();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
})();