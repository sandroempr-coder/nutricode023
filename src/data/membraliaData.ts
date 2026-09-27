export interface Video {
  title: string;
  url: string;
}

export interface Module {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  downloadLink: string;
  videos: Video[];
}

export interface OrderBump {
  id: string;
  name: string;
  image: string;
  title: string;
  description: string;
  password: string;
  productLink: string;
  buyLink?: string;
}

export const GLOBAL_PASSWORD = "PROTCRT";

export const modules: Module[] = [
  {
    id: "m01",
    title: "Módulo 01",
    subtitle: "Organização",
    description: "O Seu Diário de Bordo da Saúde\nBaixe o Planner para registrar vacinas, peso e rotina.",
    image: "https://i.ibb.co/9kVvxB5R/08.png",
    downloadLink: "https://drive.google.com/file/d/1XOFZWTxGj8KLE4fDqzbElGJ5GURmPs27/view",
    videos: [
      { title: "Webinar Diretrizes WSAVA 2024 para Vacinação", url: "https://www.youtube.com/watch?v=kJmEwculqEM" },
      { title: "Vacinação de cães e gatos: Novas diretrizes", url: "https://www.youtube.com/watch?v=q_oJJPZY6_c" },
      { title: "Como organizar a rotina de saúde do seu cão", url: "https://www.youtube.com/watch?v=mGQytW-5IFA" },
      { title: "Vacinas essenciais para cães em 2025", url: "https://www.youtube.com/watch?v=0vRhvMXvIFU" },
      { title: "Protocolo Vacinal: O que todo tutor deve saber", url: "https://www.youtube.com/watch?v=qFYYz8017Ck" },
    ],
  },
  {
    id: "m02",
    title: "Módulo 02",
    subtitle: "Kibble Boosting",
    description: "O Protocolo Kibble Boosting\nTransforme a ração seca em superalimento em 5 minutos.",
    image: "https://i.ibb.co/F4DdvhN5/01.jpg",
    downloadLink: "https://drive.google.com/file/d/17L70CxArjs8kptoXziSnTzdXOaTdECsz/view",
    videos: [
      { title: "Como melhorar a ração: Truques que cães amam", url: "https://www.youtube.com/watch?v=2leLQDsuM-E" },
      { title: "3 Dicas para turbinar qualquer ração", url: "https://www.youtube.com/watch?v=JbbzQ5vRWNw" },
      { title: "Por que adicionar alimentos frescos à ração?", url: "https://www.youtube.com/watch?v=OJ2SFJqCK0w" },
      { title: "Truques simples para deixar a ração saborosa", url: "https://www.youtube.com/watch?v=fjMnNyKvNkY" },
      { title: "Guia de Kibble Boosting para iniciantes", url: "https://www.tiktok.com/@dicadoveterinario/video/7339929980379450630" },
    ],
  },
  {
    id: "m03",
    title: "Módulo 03",
    subtitle: "Nutrição",
    description: "Guia Prático de Alimentação Natural\nFundamentos da nutrição canina e alimentos naturais.",
    image: "https://i.ibb.co/Z1YJgWxc/09.png",
    downloadLink: "https://drive.google.com/file/d/1yN--1ZA-fUGUdphR1ssotSWmrKfn7RF3/view",
    videos: [
      { title: "1ª Aula de Alimentação Natural para Cães", url: "https://www.youtube.com/watch?v=OnQCeXLk76Y" },
      { title: "Alimentação Natural: O que você precisa saber", url: "https://www.youtube.com/watch?v=-q0lL9uuDio" },
      { title: "Aula Completa: Formulações de Comida Natural", url: "https://www.youtube.com/watch?v=V7dQErBpvX8" },
      { title: "Guia Prático de Alimentação Natural Caseira", url: "https://www.youtube.com/watch?v=Gu8Ci9fl8nk" },
      { title: "Receitas Simples de Alimentação Natural", url: "https://www.tiktok.com/@salesadestramento/video/7574607402146811154" },
    ],
  },
  {
    id: "m04",
    title: "Módulo 04",
    subtitle: "Detox",
    description: "O Guia Definitivo de Saúde e Detox\nProtocolo para fígado, lágrima ácida e alergias.",
    image: "https://i.ibb.co/GvhkB34w/02.jpg",
    downloadLink: "https://drive.google.com/file/d/1-JaxBjh1jEn_r5O8kQk9jry0SX3ZE2JZ/view",
    videos: [
      { title: "9 Remédios naturais para problema no fígado", url: "https://www.youtube.com/watch?v=xcFjKBC7APW" },
      { title: "Alimentação para cães com doença no fígado", url: "https://www.youtube.com/watch?v=AB0scoChmW4" },
      { title: "Desintoxicando o organismo do seu cachorro", url: "https://www.tiktok.com/@dr.rennanviegass/video/7423004214982348037" },
      { title: "Guia prático de detox hepático pós-tratamento", url: "https://www.tiktok.com/@meupetmv/video/7388281008757427462" },
      { title: "Alimentos obrigatórios para fortalecer o cão", url: "https://www.youtube.com/watch?v=TWAvvVjBy50" },
    ],
  },
  {
    id: "m05",
    title: "Módulo 05",
    subtitle: "Higiene Bucal",
    description: "Adeus Tártaro: A Escova Natural\nLimpeza de dentes com óleo de coco e ossos recreativos.",
    image: "https://i.ibb.co/xSfVDQnP/04.jpg",
    downloadLink: "https://drive.google.com/file/d/1hmq0azWc2-iAl9EkVGyadHPNV4QFwtz-/view",
    videos: [
      { title: "Remova o tártaro com óleo de coco em casa", url: "https://www.youtube.com/watch?v=E9CEAhRkTQw" },
      { title: "Elimine o tártaro sem anestesia: Uso de ossos", url: "https://www.youtube.com/watch?v=Jm0bDK5q7P4" },
      { title: "Tabus e verdades sobre ossos recreativos", url: "https://www.instagram.com/reel/DUBTYOXEYJg/" },
      { title: "Melhores ossos para limpeza dental canina", url: "https://www.tiktok.com/@juhirai.fisiovet/video/7396440616827227398" },
      { title: "Pasta de dente natural com óleo de coco", url: "https://www.youtube.com/watch?v=UgFI-A6uzgs" },
    ],
  },
  {
    id: "m06",
    title: "Módulo 06",
    subtitle: "Segurança",
    description: "Guia de Segurança: Lista Negra & Lista de Ouro\nO que é tóxico e o que é liberado na sua cozinha.",
    image: "https://i.ibb.co/sJy90S99/05.png",
    downloadLink: "https://drive.google.com/file/d/1ySrslKynVwm8oDylPeSIW3k-0YFnEWgH/view",
    videos: [
      { title: "10 Alimentos que você NUNCA deve dar ao cão", url: "https://www.youtube.com/watch?v=7wCpw49gp3l" },
      { title: "Alimentos tóxicos e perigos na cozinha", url: "https://www.tiktok.com/@manospugs/video/7327020798261120262" },
      { title: "Lista Ouro: Alimentos seguros para cães", url: "https://www.tiktok.com/@dr.rennanviegass/video/7418282142142090501" },
      { title: "Por que chocolate e cebola são perigosos?", url: "https://www.youtube.com/watch?v=7wCpw49gp31" },
      { title: "Guia de segurança alimentar para pets", url: "https://www.youtube.com/watch?v=TWAvvVjBy50" },
    ],
  },
  {
    id: "m07",
    title: "Módulo 07",
    subtitle: "SOS Veterinário",
    description: "Guia de Emergência: Farmacinha Natural\nResolva diarreias e feridas leves em casa.",
    image: "https://i.ibb.co/gMzMHfcH/03.jpg",
    downloadLink: "https://drive.google.com/file/d/1LUoHBQsN-JdzDkM34ZQ5pFm2Ils6WHgs/view",
    videos: [
      { title: "Tudo sobre Primeiros Socorros em Casa", url: "https://www.youtube.com/watch?v=trGGFcDMLIM" },
      { title: "Kit de Primeiros Socorros que todo tutor deve ter", url: "https://www.youtube.com/watch?v=gbfN3raCNb0" },
      { title: "Como tratar diarreia em cães com remédios caseiros", url: "https://www.youtube.com/watch?v=w98ZJ3hY32Y" },
      { title: "Cuidados para cachorros com feridas de pele", url: "https://www.tiktok.com/@draquerenmedeiros/video/7486576832947506437" },
      { title: "Itens essenciais da farmacinha natural pet", url: "https://www.youtube.com/watch?v=T1Y8ebKV8CY" },
    ],
  },
  {
    id: "m08",
    title: "Módulo 08",
    subtitle: "Cozinha Criativa",
    description: "50 Petiscos Que Nutrem\nReceitas de petiscos, biscoitos e picolés saudáveis.",
    image: "https://i.ibb.co/Kx9pNNN6/06.jpg",
    downloadLink: "https://drive.google.com/file/d/1ns9fT6YORDWz-rkwsJr6-E-rz32TFINz/view",
    videos: [
      { title: "Aprenda a fazer biscoitos naturais para cães", url: "https://www.youtube.com/watch?v=-ozgnHFPfyY" },
      { title: "Receita de Picolé Natural para Cachorros", url: "https://www.tiktok.com/@msdfamiliapet/video/7503663379303664901" },
      { title: "Como fazer picolé para cachorro (3 ingredientes)", url: "https://www.youtube.com/watch?v=aUsp-KI6p5g" },
      { title: "Picolé Pet Natural de Iogurte e Frutas", url: "https://www.tiktok.com/@dukedogpet/video/7226102959296269574" },
      { title: "3 Receitas de Petiscos que seu cão vai amar", url: "https://www.youtube.com/watch?v=V00jz5eGqVU" },
    ],
  },
  {
    id: "m09",
    title: "Módulo 09",
    subtitle: "Raças",
    description: "Manual das Raças: Cuidados por DNA\nPontos fracos e cuidados específicos para a raça do seu cão.",
    image: "https://i.ibb.co/Xrpb4Lq8/07.png",
    downloadLink: "https://drive.google.com/file/d/13H6x6xO_CUu0D6vcE0QOszCRIk5x--Cu/view",
    videos: [
      { title: "Genética e Longevidade Animal: Entrevista", url: "https://www.youtube.com/watch?v=M1whvBzzVc0" },
      { title: "Inovação: Teste genético para predisposições", url: "https://www.youtube.com/watch?v=nnljHHUqnEk" },
      { title: "Como a genética molda as raças dos cães", url: "https://www.tiktok.com/@yagostephano/video/7520621550698237240" },
      { title: "Predisposição genética e epilepsia por raça", url: "https://www.instagram.com/reel/DSSIHEIDCYD/" },
      { title: "As raças mais saudáveis e seus cuidados", url: "https://www.youtube.com/watch?v=ftO7gbEgQNo" },
    ],
  },
];
export const orderBumps: OrderBump[] = [
  {
    id: "bump1",
    name: "Protocolo Cão Seguro",
    image: "https://i.ibb.co/fYJ7Jfrv/Protocolo.png",
    title: "Protocolo Cão Seguro e Independente",
    description: "Sente culpa toda vez que pega a bolsa e vê aquela carinha triste? Seu cachorro chora, uiva ou arranha a porta quando fica sozinho? Adicione este protocolo passo a passo e ensine seu cão a ficar tranquilo, seguro e independente enquanto você trabalha. Acabe com a Ansiedade de Separação sem traumas.",
    password: "PROTSLE",
    productLink: "https://drive.google.com/file/d/1P6rywlaMuEkESqZvIbmc0joneoQTG7KS/view?usp=sharing",
    buyLink: "https://compraonlinesegurada.org.ua/c/15d36522f9",
  },
  {
    id: "bump2",
    name: "Dicionário Canino",
    image: "https://i.ibb.co/ksDFRXSf/Dicionario.png",
    title: "Dicionário da Linguagem Canina",
    description: "Você sabia que abanar o rabo nem sempre é sinal de felicidade? Pare de tentar adivinhar o que ele sente! Aprenda a ler os sinais secretos (orelhas, olhar, postura) para evitar mordidas, saber quando ele está com dor e se conectar profundamente com seu melhor amigo. O guia visual definitivo.",
    password: "DICSNERT",
    productLink: "https://drive.google.com/file/d/1zUMzlSx5C6ArqZZPRHY3LdtbLQzx6MhI/view?usp=sharing",
    buyLink: "https://compraonlinesegurada.org.ua/c/07df508cb4",
  },
];

