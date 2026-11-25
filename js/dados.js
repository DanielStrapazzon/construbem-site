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
 {n:'Ferragens e ferramentas',s:'do prego à máquina',l:['Pregos e parafusos','Vergalhões','Ferramentas manuais','Ferramentas elétricas','EPIs'],t:'Ferragem para a obra e ferramenta para quem faz.'},
 {n:'Hidráulica',s:'tubos, conexões, caixas',l:['Tubos e conexões','Registros','Caixas d\'água','Caixas sifonadas'],t:'Água entrando e saindo do jeito certo.'},
 {n:'Elétrica',s:'fios, quadros, tomadas',l:['Fios e cabos','Disjuntores','Tomadas e interruptores','Eletrodutos','Iluminação'],t:'Instalação elétrica do quadro à tomada.'},
 {n:'Tintas e pintura',s:'tintas, massas, rolos',l:['Tinta acrílica','Esmaltes e vernizes','Massa corrida','Rolos e pincéis'],t:'Tudo para pintar por dentro e por fora.'},
 {n:'Portas, janelas e vidros',s:'prontas e sob medida',l:['Portas de alumínio','Portas sanfonadas','Janelas','Esquadrias sob medida','Vidros'],b:'Deon, Plasbil',t:'Linha pronta das melhores marcas e esquadrias de metal e madeira feitas aqui.',go:'#sob-medida'},
 {n:'Louças, cubas e metais',s:'banheiro e cozinha',l:['Cubas de sobrepor','Louças sanitárias','Torneiras','Acessórios de banheiro'],b:'Eval, Manplex, Loft',t:'Banheiro e cozinha com cara nova.'}
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
