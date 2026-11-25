# Construbem · Materiais de Construção e Construtora

Site da Construbem, loja de materiais de construção e construtora em Serra Alta (SC) desde 2003.

**Acesse:** https://danielstrapazzon.github.io/construbem-site/

## Estrutura

| Pasta/arquivo | Conteúdo |
|---|---|
| `index.html` | Página e textos fixos de cada seção |
| `js/dados.js` | Dados editáveis: número do WhatsApp, etapas da obra, parede de produtos, cores da fachada, perguntas do chat, etapas da construtora e consumo da calculadora |
| `js/site.js` | Interações: casa montável, parede de produtos, esquadria sob medida, calculadora, lista da obra, chat e trena de progresso |
| `css/` | Estilos (`site.css`) e declaração da fonte (`fonts.css`) |
| `fonts/` | Archivo, sob a [SIL Open Font License](fonts/OFL.txt) |
| `img/` | Ícone e imagem de prévia para WhatsApp e redes sociais |

O site não usa frameworks nem etapa de build: é HTML, CSS e JavaScript puro.

## Rodar localmente

Dê dois cliques em `iniciar-site.bat` (Windows, requer Node.js) ou rode:

```
npx serve .
```

Abra http://localhost:3000.

## Publicação

Hospedado no GitHub Pages a partir da branch `main`. Cada alteração enviada aparece no site em cerca de 1 minuto.

## Pendências com a loja

- Logo e cores oficiais (o ícone atual é provisório)
- Horário de funcionamento
- Fotos da loja, da equipe e de obras
- Área de entrega
- Revisão dos coeficientes da calculadora pelo engenheiro
