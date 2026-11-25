/* Dados do site Construbem: edite aqui textos, produtos, perguntas e o número do WhatsApp.
   Este arquivo é carregado antes de js/site.js. */

/* Número do WhatsApp (55 + DDD + número, só dígitos) */
const WA='5549988131058';

/* Etapas da casa no topo: nome, descrição e itens que vão para a lista */
const stages=[
 {n:'Terreno',d:'Antes do primeiro saco de cimento: medir, marcar e limpar. Ferramentas, trena, linha e EPIs.',it:['Carrinho de mão','Pá e enxada','Trena e linha de pedreiro','Luvas e botina']},
 {n:'Fundação',d:'Base firme com cimento, areia, brita e ferro. E artefatos de cimento fabricados aqui na Construbem.',it:['Cimento 50 kg','Areia média','Brita 1','Vergalhão 3/8"','Artefatos de cimento']},
 {n:'Alvenaria',d:'Paredes de pé: tijolos, blocos de concreto, cal e argamassa, tudo do mesmo balcão.',it:['Bloco de concreto 14×19×39','Tijolo 6 furos','Cal hidratada','Argamassa de assentamento']},
 {n:'Instalações',d:'Água e luz passando por dentro da parede: tubos, conexões, registros, fios e disjuntores.',it:['Tubos e conexões PVC','Registros','Fios e cabos','Eletrodutos e caixas 4×2','Disjuntores']},
 {n:'Cobertura',d:'Telhado para o inverno do Oeste: telhas, madeira e isolamento térmico para a casa ficar fresca no verão.',it:['Telhas','Madeira para telhado','Manta térmica','Calhas e rufos']},
 {n:'Esquadrias',d:'Portas, janelas e vidros. Esquadrias de metal e de madeira sob medida, fabricadas pela Construbem.',it:['Porta de alumínio','Porta sanfonada','Janela sob medida','Vidros']},
 {n:'Acabamento',d:'A cara da casa: tintas, louças, cubas e metais. Escolha a cor da fachada e veja na hora.',it:['Tinta acrílica 18 L','Massa corrida','Cuba de sobrepor','Torneira e metais'],paint:1}
];

/* Cores da fachada na etapa de acabamento: [nome, cor] */
const paints=[['Branco gelo','#ece7dc'],['Areia','#dcc49c'],['Terracota','#c9754f'],['Oliva','#8f9668'],['Azul colonial','#7393ab'],['Grafite','#5a5b60']];

/* Parede de produtos: n = nome, s = subtítulo, l = itens, b = marcas, t = texto */
const cats=[
 {n:'Básicos da obra',s:'cimento, cal, areia, brita',l:['Cimento','Cal hidratada','Areia','Pedra britada','Argamassas','Rejuntes'],t:'O que toda obra pede primeiro, com entrega na obra.'},
 {n:'Tijolos e blocos',s:'cerâmicos e de concreto',l:['Tijolo 6 furos','Bloco cerâmico','Bloco de concreto','Artefatos de cimento próprios'],t:'Alvenaria completa, incluindo artefatos de cimento fabricados pela Construbem.'},
 {n:'Telhas e cobertura',s:'telhas, isolamento',l:['Telhas','Cumeeiras','Manta térmica','Calhas e rufos'],b:'Termolar',t:'Telhado completo e isolamento térmico para o calor e o frio do Oeste.'},
 {n:'Madeiras',s:'estrutura e acabamento',l:['Madeira para telhado','Tábuas e caibros','Ripas','Artefatos de madeira'],t:'Madeira para estrutura, forma e acabamento.'},
 {n:'Ferragens e ferramentas',s:'do prego à máquina',l:['Ferramentas elétricas','Parafusadeiras e furadeiras','Pregos e parafusos','Vergalhões','Ferramentas manuais','EPIs'],b:'Emegotti',t:'Ferragem para a obra e ferramenta elétrica para quem faz.',hot:1},
 {n:'Hidráulica',s:'tubos, conexões, caixas',l:['Tubos e conexões','Registros','Caixas d\'água','Caixas sifonadas'],t:'Água entrando e saindo do jeito certo.'},
 {n:'Elétrica',s:'fios, quadros, tomadas',l:['Fios e cabos','Disjuntores','Tomadas e interruptores','Eletrodutos','Iluminação'],t:'Instalação elétrica do quadro à tomada.'},
 {n:'Tintas e pintura',s:'tintas, massas, rolos',l:['Tinta acrílica','Esmaltes e vernizes','Massa corrida','Rolos e pincéis'],b:'Renner',t:'Tudo para pintar por dentro e por fora, com a linha de tintas Renner.',hot:1},
 {n:'Portas, janelas e vidros',s:'prontas e sob medida',l:['Portas de alumínio','Portas sanfonadas','Janelas','Esquadrias sob medida','Vidros'],b:'Deon, Plasbil',t:'Linha pronta das melhores marcas e esquadrias de metal e madeira feitas aqui.',go:'#sob-medida'},
 {n:'Louças, cubas e metais',s:'banheiro e cozinha',l:['Torneira gourmet com bica flexível','Cubas de sobrepor','Louças sanitárias','Torneiras','Acessórios de banheiro'],b:'Eval, Manplex, Loft',t:'Banheiro e cozinha com cara nova, das cubas às torneiras gourmet.',hot:1},
 {n:'Área externa e lazer',s:'cadeiras, mesas, térmicas',l:['Espreguiçadeiras de alumínio e aço','Cadeiras de praia','Cadeira Acapulco','Cadeira de balanço','Mesas e cadeiras plásticas','Caixas térmicas','Guarda-sóis e boias'],t:'O que mais sai nas lojas de Serra Alta e Saltinho: tudo para o pátio, a piscina, o rio e a praia.',hot:1},
 {n:'Iluminação e lustres',s:'lustres, pendentes, lâmpadas',l:['Lustres','Pendentes','Plafons','Lâmpadas LED'],t:'Lustres e iluminação para dar acabamento à casa.'}
];

/* Perguntas do chat: [pergunta, resposta] */
const faq=[
 ['Vocês entregam na obra?','Entregamos, sim, com frota própria, em Serra Alta e região. Mande a cidade no WhatsApp (49) 98813-1058 que a gente passa frete e prazo.'],
 ['Posso comprar pela internet?','Pode. A loja online é lojaconstrubem.com.br e você retira grátis na loja, na Av. Dom Pedro II, 740.'],
 ['Vocês fazem esquadria sob medida?','Fazemos esquadrias de metal e de madeira aqui mesmo. Use o desenho de esquadria nesta página e mande as medidas.'],
 ['A construtora faz a obra toda?','Faz. Construção e reforma, instalação de portas e janelas, calçadas e obras de urbanização. Tudo começa com uma conversa e um orçamento por escrito.'],
 ['Como peço um orçamento?','Monte a Lista da obra (botão no canto da tela) e envie pelo WhatsApp. Ou ligue no (49) 3364-0320.'],
 ['Há quanto tempo vocês existem?','Desde 2003 em Serra Alta. A Construbem faz parte da Rede Construnião, de lojas de materiais de construção do Oeste catarinense.']
];

/* Etapas da construtora (carrossel) */
const steps=[
 {n:'Primeira conversa',d:'Você conta a ideia, mostra o terreno e diz quanto quer investir. A gente diz o que dá para fazer.',s:'<rect x="30" y="20" width="90" height="50" rx="10" fill="#c2452a"/><path d="M50 70l-6 14 18-14" fill="#c2452a"/><rect x="140" y="30" width="100" height="46" rx="10" fill="#f2b632"/><path d="M220 76l6 12-18-12" fill="#f2b632"/>'},
 {n:'Projeto e orçamento',d:'Projeto, etapas, prazos e valores no papel antes de qualquer tijolo. Sem surpresa no meio da obra.',s:'<rect x="70" y="8" width="120" height="78" rx="3" fill="#e9e4da" stroke="#1d1a17" stroke-width="2"/><path d="M90 66V40l40-20 40 20v26z" fill="none" stroke="#2f7fc1" stroke-width="3"/><path d="M84 30h20M84 38h14" stroke="#c2452a" stroke-width="3"/>'},
 {n:'Obra',d:'Material saindo da nossa loja, entregue pela nossa frota. Você acompanha cada etapa com quem toca a obra.',s:'<rect x="40" y="64" width="180" height="14" fill="#9e3620"/><g fill="#c2452a"><rect x="40" y="46" width="42" height="16"/><rect x="86" y="46" width="42" height="16"/><rect x="132" y="46" width="42" height="16"/><rect x="62" y="28" width="42" height="16"/><rect x="108" y="28" width="42" height="16"/></g><path d="M200 20v44M200 20h40" stroke="#f2b632" stroke-width="5"/>'},
 {n:'Entrega das chaves',d:'Vistoria junto com você, ajustes finais e a casa pronta para morar.',s:'<circle cx="100" cy="46" r="24" fill="none" stroke="#f2b632" stroke-width="8"/><path d="M124 46h90v14M190 46v12" stroke="#f2b632" stroke-width="8" fill="none"/><circle cx="100" cy="46" r="8" fill="#c2452a"/>'}
];

/* Calculadora: tipos de bloco e consumo por m² */
const blocks=[['Bloco de concreto 14×19×39',12.5],['Bloco cerâmico 9×19×19',25],['Tijolo 6 furos 9×14×19',33]];

/* Construtora: tipos de obra do "Monte sua obra" (área mínima, máxima e inicial em m²) */
const tipos=[
 {n:'Casa nova',s:'Do terreno às chaves',k:'casa',al:'Área construída',min:40,max:300,step:5,def:90,ic:'<svg viewBox="0 0 34 34" aria-hidden="true"><path d="M4 16 17 5l13 11" fill="none" stroke="#c2452a" stroke-width="3" stroke-linejoin="round"/><rect x="8" y="15" width="18" height="14" fill="#c2452a"/><rect x="15" y="20" width="5" height="9" fill="#f2b632"/></svg>'},
 {n:'Ampliação',s:'Mais um quarto, garagem, área',k:'amplia',al:'Área da ampliação',min:6,max:120,step:2,def:24,ic:'<svg viewBox="0 0 34 34" aria-hidden="true"><rect x="3" y="12" width="16" height="16" fill="#8b857a"/><rect x="19" y="12" width="12" height="16" fill="none" stroke="#c2452a" stroke-width="3" stroke-dasharray="4 3"/><path d="M25 17v6M22 20h6" stroke="#c2452a" stroke-width="2.5"/></svg>'},
 {n:'Reforma',s:'Banheiro, cozinha, fachada',k:'reforma',al:'Área da reforma',min:4,max:200,step:2,def:20,ic:'<svg viewBox="0 0 34 34" aria-hidden="true"><path d="M6 28 20 14" stroke="#2b2622" stroke-width="4" stroke-linecap="round"/><rect x="17" y="5" width="13" height="8" rx="1" transform="rotate(45 23 9)" fill="#c2452a"/><rect x="4" y="24" width="10" height="5" fill="#f2b632"/></svg>'},
 {n:'Calçada ou pavimentação',s:'Para casas, empresas e prefeituras',k:'calcada',al:'Área a pavimentar',min:10,max:1000,step:10,def:80,ic:'<svg viewBox="0 0 34 34" aria-hidden="true"><path d="M3 24h28" stroke="#2b2622" stroke-width="3"/><g fill="#c2452a"><rect x="4" y="16" width="7" height="6"/><rect x="13" y="16" width="7" height="6"/><rect x="22" y="16" width="7" height="6"/><rect x="8" y="9" width="7" height="6"/><rect x="17" y="9" width="7" height="6"/></g></svg>'}
];

/* "Em que pé está a sua obra?": situações, ilustração e caminho.
   Cada passo: [título, detalhe, rótulo do botão, ação]. Ações em js/site.js (acts). */
const phases=[
 {q:'Vou construir do zero',t:'Do terreno vazio à primeira fiada.',d:'Faça a conta, garanta os básicos e combine a entrega no terreno.',
  ic:'<svg viewBox="0 0 26 26"><rect x="2" y="18" width="22" height="5" rx="1" fill="#c2452a"/><path d="M6 18V10l7-5 7 5v8" fill="none" stroke="#2b2622" stroke-width="2" stroke-dasharray="3 2"/></svg>',
  scene:'<rect width="400" height="300" fill="#cfe3ea"/><circle cx="330" cy="62" r="30" fill="#f2b632"/><path d="M0 200 Q100 170 200 190 T400 180V300H0z" fill="#9bb86b"/><rect x="0" y="210" width="400" height="90" fill="#cdb894"/><path d="M110 250 L290 250 L320 280 L80 280 Z" fill="none" stroke="#c2452a" stroke-width="3" stroke-dasharray="10 7"/><g stroke="#8a5a36" stroke-width="7" stroke-linecap="round"><path d="M110 250v-26M290 250v-26M320 280v-26M80 280v-26"/></g><g transform="translate(250 170)"><path d="M0 40h60l-10 22H10z" fill="#c2452a"/><path d="M60 40l30-26" stroke="#2b2622" stroke-width="5" stroke-linecap="round"/><circle cx="18" cy="70" r="9" fill="#2b2622"/></g><g transform="translate(60 150)" fill="#e8e1d3"><rect width="40" height="50" rx="4"/><rect x="44" y="8" width="34" height="42" rx="4"/></g>',
  steps:[['Calcular blocos e cimento','Paredes, contrapiso e laje em segundos','Calcular','calc'],['Colocar os básicos na lista','Cimento, areia, brita, blocos e ferro','+ Lista','basicos'],['Combinar a entrega no terreno','Frota própria da Construbem','Ver frete','frete']]},
 {q:'Quero reformar o banheiro',t:'Banheiro novo sem correr atrás de peça.',d:'Kit completo na lista, cuba e metais escolhidos e a tinta calculada.',
  ic:'<svg viewBox="0 0 26 26"><path d="M3 13h20v3a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6z" fill="#c2452a"/><path d="M7 13V6a3 3 0 0 1 6 0" fill="none" stroke="#2b2622" stroke-width="2"/></svg>',
  scene:'<rect width="400" height="300" fill="#e9eef0"/><g stroke="#cdd8dc" stroke-width="2">'+Array.from({length:12},(_,i)=>'<path d="M'+(i*36)+' 0v200"/>').join('')+Array.from({length:6},(_,i)=>'<path d="M0 '+(i*36)+'h400"/>').join('')+'</g><rect x="0" y="200" width="400" height="100" fill="#b89f7e"/><rect x="120" y="40" width="160" height="96" rx="8" fill="#cfe1e8" stroke="#8d9aa0" stroke-width="5"/><path d="M150 60l40 50" stroke="#fff" stroke-width="6" opacity=".7"/><rect x="90" y="176" width="220" height="24" fill="#8a5a36"/><path d="M140 176h120l-14 -26h-92z" fill="#fbfbf8" stroke="#c9c4ba" stroke-width="3"/><path d="M200 150v-22h22v8" fill="none" stroke="#9ca3a8" stroke-width="7" stroke-linecap="round"/><rect x="100" y="200" width="200" height="60" fill="#a57a4f"/><circle cx="200" cy="230" r="5" fill="#f2b632"/>',
  steps:[['Colocar o kit reforma na lista','Cuba, louça, metais, tubos e registros','+ Lista','kit'],['Escolher cuba e metais','Eval, Manplex e Loft na loja','Ver louças','loucas'],['Calcular a tinta','Litros, latas e galões','Calcular','tinta']]},
 {q:'Preciso de uma janela sob medida',t:'Vão fora do padrão? A gente fabrica.',d:'Desenhe com as medidas reais, compare com as prontas e peça a instalação.',
  ic:'<svg viewBox="0 0 26 26"><rect x="3" y="3" width="20" height="20" rx="1" fill="none" stroke="#2b2622" stroke-width="2"/><path d="M13 3v20" stroke="#2b2622" stroke-width="2"/><rect x="5" y="5" width="6" height="16" fill="#b9d7e2"/><rect x="15" y="5" width="6" height="16" fill="#c2452a"/></svg>',
  scene:'<rect width="400" height="300" fill="#d9c9b0"/><g fill="#c9b79b">'+Array.from({length:8},(_,r)=>Array.from({length:9},(_,k)=>'<rect x="'+(k*50-(r%2)*25)+'" y="'+(r*38)+'" width="46" height="34" rx="2"/>').join('')).join('')+'</g><rect x="110" y="60" width="180" height="150" fill="#f4f2ee" stroke="#2b2622" stroke-width="4"/><rect x="122" y="72" width="78" height="126" fill="#b9d7e2"/><rect x="200" y="72" width="78" height="126" fill="#b9d7e2"/><path d="M200 72v126" stroke="#f4f2ee" stroke-width="8"/><path d="M110 40h180M110 34v12M290 34v12" stroke="#c2452a" stroke-width="3"/><path d="M90 60v150M84 60h12M84 210h12" stroke="#c2452a" stroke-width="3"/><rect x="170" y="18" width="60" height="22" rx="4" fill="#c2452a"/><path d="M178 29h44" stroke="#fff" stroke-width="2" stroke-dasharray="3 3"/>',
  steps:[['Desenhar a esquadria','Tipo, material, cor e medidas do vão','Desenhar','esq'],['Comparar com as prontas','Portas e janelas Deon e Plasbil','Ver portas','portas'],['Pedir a instalação','Instalada por quem fabrica','WhatsApp','waInst']]},
 {q:'Quero alguém que faça a obra toda',t:'Você aprova. A Construbem constrói.',d:'Monte o pedido, entenda as etapas e fale com a construtora.',
  ic:'<svg viewBox="0 0 26 26"><path d="M3 16a10 10 0 0 1 20 0z" fill="#f2b632"/><rect x="2" y="16" width="22" height="4" rx="2" fill="#c2452a"/><path d="M13 6v10" stroke="#2b2622" stroke-width="2"/></svg>',
  scene:'<rect width="400" height="300" fill="#cfe3ea"/><path d="M300 40v200M300 50h-170M300 50l-40 40" stroke="#f2b632" stroke-width="8" fill="none"/><path d="M150 50v40" stroke="#2b2622" stroke-width="2"/><rect x="132" y="90" width="36" height="16" fill="#c2452a"/><rect x="0" y="240" width="400" height="60" fill="#cdb894"/><g fill="#c2452a"><rect x="60" y="190" width="56" height="24"/><rect x="120" y="190" width="56" height="24"/><rect x="180" y="190" width="56" height="24"/><rect x="90" y="164" width="56" height="24"/><rect x="150" y="164" width="56" height="24"/><rect x="60" y="216" width="56" height="24"/><rect x="120" y="216" width="56" height="24"/><rect x="180" y="216" width="56" height="24"/></g><g transform="translate(250 196)"><path d="M0 30a26 26 0 0 1 52 0z" fill="#f2b632"/><rect x="-4" y="30" width="60" height="8" rx="4" fill="#c2452a"/></g>',
  steps:[['Montar o pedido da obra','Tipo, área, terreno e quando começar','Montar','obra'],['Ver como funciona','Da conversa à entrega das chaves','Ver etapas','flow'],['Falar com a construtora','Resposta pelo WhatsApp','WhatsApp','waObra']]}
];

/* Ícones da parede de produtos (mesma ordem de cats) */
const catIcons=[
 '<svg viewBox="0 0 48 48"><path d="M10 8h28l4 34H6z" fill="#fff"/><path d="M10 8h28l1 8H9z" fill="#f2b632"/><path d="M14 26h20M14 32h14" stroke="#c2452a" stroke-width="3"/></svg>',
 '<svg viewBox="0 0 48 48"><g fill="#fff"><rect x="4" y="30" width="19" height="11" rx="1"/><rect x="25" y="30" width="19" height="11" rx="1"/><rect x="14" y="17" width="19" height="11" rx="1"/></g><rect x="24" y="6" width="19" height="9" rx="1" fill="#f2b632"/></svg>',
 '<svg viewBox="0 0 48 48"><path d="M4 26 24 8l20 18" fill="none" stroke="#fff" stroke-width="4" stroke-linejoin="round"/><path d="M8 30q4-6 8 0t8 0 8 0 8 0v10H8z" fill="#f2b632"/></svg>',
 '<svg viewBox="0 0 48 48"><rect x="4" y="12" width="40" height="8" rx="2" fill="#fff"/><rect x="4" y="22" width="40" height="8" rx="2" fill="#f2b632"/><rect x="4" y="32" width="40" height="8" rx="2" fill="#fff"/><circle cx="40" cy="16" r="2" fill="#c2452a"/><circle cx="40" cy="36" r="2" fill="#c2452a"/></svg>',
 '<svg viewBox="0 0 48 48"><rect x="8" y="8" width="24" height="12" rx="2" fill="#fff"/><rect x="18" y="18" width="6" height="24" rx="2" fill="#f2b632"/></svg>',
 '<svg viewBox="0 0 48 48"><path d="M6 14h20a8 8 0 0 1 8 8v16" fill="none" stroke="#fff" stroke-width="8"/><path d="M34 40c-4 0-6-3-6-6 0-4 6-10 6-10s6 6 6 10c0 3-2 6-6 6z" fill="#b9d7e2"/></svg>',
 '<svg viewBox="0 0 48 48"><path d="M27 4 10 27h12l-3 17 19-25H26z" fill="#f2b632"/></svg>',
 '<svg viewBox="0 0 48 48"><path d="M8 16h22v22a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4z" fill="#fff"/><path d="M8 16h22v6H8z" fill="#f2b632"/><rect x="32" y="6" width="12" height="8" rx="2" fill="#fff"/><path d="M38 14v6h-6" fill="none" stroke="#fff" stroke-width="3"/></svg>',
 '<svg viewBox="0 0 48 48"><rect x="12" y="4" width="24" height="40" rx="2" fill="#fff"/><rect x="16" y="8" width="16" height="14" fill="#b9d7e2"/><circle cx="31" cy="28" r="2.5" fill="#f2b632"/></svg>',
 '<svg viewBox="0 0 48 48"><path d="M4 26h40v4a12 12 0 0 1-12 12H16A12 12 0 0 1 4 30z" fill="#fff"/><path d="M22 26V12h14v6" fill="none" stroke="#f2b632" stroke-width="5" stroke-linecap="round"/></svg>',
 '<svg viewBox="0 0 48 48"><path d="M6 10 24 4l18 6z" fill="#f2b632"/><path d="M24 7v14" stroke="#fff" stroke-width="3"/><path d="M10 30h20l4 -10" fill="none" stroke="#fff" stroke-width="4" stroke-linejoin="round"/><path d="M12 30l-4 12M28 30l4 12" stroke="#fff" stroke-width="4" stroke-linecap="round"/></svg>',
 '<svg viewBox="0 0 48 48"><path d="M24 4v10" stroke="#fff" stroke-width="3"/><path d="M10 30a14 14 0 0 1 28 0z" fill="#fff"/><circle cx="24" cy="35" r="5" fill="#f2b632"/><path d="M14 42l-3 3M34 42l3 3M24 44v3" stroke="#f2b632" stroke-width="2.5" stroke-linecap="round"/></svg>'
];

/* Entrega: modos de receber o material e suas etapas [título, detalhe, ícone] */
const ico={
 msg:'<svg viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4z" fill="#f2b632"/></svg>',
 box:'<svg viewBox="0 0 24 24"><path d="M3 8l9-4 9 4v9l-9 4-9-4z" fill="#c2452a"/><path d="M3 8l9 4 9-4M12 12v9" stroke="#f4efe7" stroke-width="1.5" fill="none"/></svg>',
 truck:'<svg viewBox="0 0 24 24"><rect x="2" y="7" width="12" height="9" fill="#c2452a"/><path d="M14 10h4l3 3v3h-7z" fill="#f2b632"/><circle cx="6" cy="18" r="2" fill="#f4efe7"/><circle cx="17" cy="18" r="2" fill="#f4efe7"/></svg>',
 road:'<svg viewBox="0 0 24 24"><path d="M8 3 4 21M16 3l4 18" stroke="#f4efe7" stroke-width="2"/><path d="M12 4v3M12 10v3M12 16v3" stroke="#f2b632" stroke-width="2"/></svg>',
 pin:'<svg viewBox="0 0 24 24"><path d="M12 22s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12z" fill="#f2b632"/><circle cx="12" cy="10" r="3" fill="#1a1714"/></svg>',
 store:'<svg viewBox="0 0 24 24"><path d="M3 9l2-5h14l2 5z" fill="#f2b632"/><rect x="4" y="9" width="16" height="11" fill="#c2452a"/><rect x="10" y="13" width="4" height="7" fill="#f4efe7"/></svg>',
 hand:'<svg viewBox="0 0 24 24"><rect x="7" y="4" width="10" height="8" fill="#c2452a"/><path d="M3 15h5l4 2h6l3-3v6H3z" fill="#f2b632"/></svg>',
 cart:'<svg viewBox="0 0 24 24"><path d="M2 4h3l3 11h11l2-8H7" fill="none" stroke="#f2b632" stroke-width="2"/><circle cx="9" cy="19" r="2" fill="#f4efe7"/><circle cx="17" cy="19" r="2" fill="#f4efe7"/></svg>',
 check:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="#c2452a"/><path d="m8 12 3 3 5-6" stroke="#f4efe7" stroke-width="2.2" fill="none"/></svg>'
};
const modos=[
 {n:'Entrega na obra',ic:'truck',t:'Material descarregado no seu canteiro.',d:'A frota própria da Construbem leva cimento, blocos, telhas e madeira até a obra. Consulte frete e prazo para a sua cidade.',cta:'Consultar frete',href:'wa:Olá, Construbem! Quero saber o frete para entregar material na minha obra.',
  st:[['Pedido','Lista ou orçamento no WhatsApp','msg'],['Separação','Material conferido na loja','box'],['Carregamento','No caminhão da Construbem','truck'],['A caminho','Rota até a sua cidade','road'],['Na obra','Descarregado no canteiro','pin']]},
 {n:'Retirar na loja',ic:'store',t:'Separado e esperando no balcão.',d:'Mande a lista, a gente separa e avisa quando estiver pronto. Você retira na Av. Dom Pedro II, 740.',cta:'Pedir separação',href:'wa:Olá, Construbem! Quero pedir material para retirar na loja.',
  st:[['Pedido','Lista no WhatsApp ou no balcão','msg'],['Separação','Material conferido na loja','box'],['Pronto','Avisamos que pode buscar','check'],['Retirada','Av. Dom Pedro II, 740','hand']]},
 {n:'Comprar online',ic:'cart',t:'Compra pelo site, retirada grátis.',d:'Na loja online lojaconstrubem.com.br você escolhe, paga e retira sem custo na loja.',cta:'Abrir loja online',href:'https://lojaconstrubem.com.br/',
  st:[['Compra','Pelo site lojaconstrubem.com.br','cart'],['Confirmação','Pedido confirmado','check'],['Separação','Material conferido na loja','box'],['Retirada grátis','Na loja da Dom Pedro II','store']]}
];
/* Interesses para o encarte de ofertas */
const interesses=['Cimento e básicos','Tijolos e blocos','Telhas e isolamento','Portas e janelas','Louças e metais','Tintas','Ferramentas','Elétrica e hidráulica'];

/* Vitrine: fotos reais do Instagram @construbemsa (pasta img/vitrine) */
const vitrine=[
 {f:'ferramentas.jpg',w:360,h:640,tag:'Equipamentos',t:'Ferramentas elétricas',d:'Parafusadeiras, serras e lixadeiras na pronta-entrega',alt:'Prateleiras com parafusadeiras e ferramentas elétricas na loja Construbem'},
 {f:'cadeiras-praia.jpg',w:640,h:640,tag:'Linha verão',t:'Cadeiras e caixas térmicas',d:'Para a praia, o rio e o pátio',alt:'Cadeiras de praia rosa e caixa térmica na areia'},
 {f:'varal.jpg',w:612,h:612,tag:'Utilidades',t:'Para o dia a dia da casa',d:'Varais, organizadores e utilidades',alt:'Varal de chão aberto em uma lavanderia clara'},
 {f:'loja-cadeiras.jpg',w:361,h:640,tag:'Na loja',t:'Vitrine de verão',d:'Cadeiras, guarda-sóis e boias à pronta-entrega',alt:'Loja Construbem com cadeiras de praia, caixas térmicas e boias expostas'}
];

/* Mais procurados: ordem pelo que mais aparece nas ofertas do Facebook e do Instagram (nov/2026).
   c = índice em cats, f = foto em img/vitrine (opcional) */
const destaques=[
 {c:10,t:'Área externa e lazer',d:'Espreguiçadeiras, cadeiras Acapulco e de balanço, mesas e caixas térmicas.',f:'loja-cadeiras.jpg'},
 {c:9,t:'Torneiras gourmet',d:'Bica flexível para a cozinha, além de cubas e metais.'},
 {c:7,t:'Tintas Renner',d:'Acrílicas, esmaltes e tudo para pintar.'},
 {c:4,t:'Ferramentas elétricas',d:'Parafusadeiras, furadeiras, serras e lixadeiras.',f:'ferramentas.jpg'},
 {c:11,t:'Lustres e iluminação',d:'Lustres, pendentes e lâmpadas para o acabamento.'}
];
