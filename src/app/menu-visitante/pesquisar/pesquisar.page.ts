import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import _ from 'lodash';
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.page.html',
  styleUrls: ['./pesquisar.page.scss'],
})
export class PesquisarPage implements OnInit {
trabalhos: Array<{titulo: string, codigo: string, autores:string, orientador:string, data:string}>
alltrabalhos:any;
queryText:string;
  constructor(private router:Router, private userServ: UserService) { 
    
    this.queryText = '';
    this.trabalhos = [
        {
            "titulo": "Incidência de esporotricose no Centro de Controle de Zoonoses na cidade de Peruíbe",
            "codigo": "O presente trabalho tem como tema o desenvolvimento de um sistema informatizado – FisiOnline – para o agendamento de consultas e gestão de pacientes da clínica de Fisioterapia da Unisanta. Antes de sua implementação, a clínica trabalhava com base em processos manuais de agendamento. A única parte informatizada do processo era o cadastro de pacientes, que não estava integrado com grande parcela das etapas do atendimento. O FisiOnline foi desenvolvido com o objetivo de proporcionar a melhoria dos processos de agendamento do consultório ao disponibilizar: mecanismos para o gerenciamento dos pacientes que estão aguardando contato; agendamento de consultas de forma rápida, simples e funcional; emissão de relatórios para a gestão dos atendimentos realizados; dentre outros recursos. A natureza desta pesquisa é o desenvolvimento experimental, pois foi criado e implementado um sistema informatizado a fim de melhorar os serviços da clínica da universidade. Para o desenvolvimento do FisiOnline, foi utilizada a linguagem de programação PHP com o framework CodeIgniter, para a arquitetura do sistema em MVC, e o banco de dados MySQL, dentre outras ferramentas de apoio para a criação da interface e gerenciamento de código fonte, como o Bootstrap e o Git. A fase de implementação, por fim, abrangeu o estudo e a migração das informações contidas no sistema até então existente na clínica para a base de dados do FisiOnline. O sistema desenvolvido permite a criação e manutenção de pacientes, bem como a gestão dos agendamentos realizados. Também foram elaboradas funcionalidades adicionais, como a possibilidade de as pessoas atendidas realizarem login para visualizar os seus compromissos e a emissão de relatórios gerenciais. Além disso, o programa conta com recursos de segurança, como a criptografia de senhas e registro de logs de alterações. Para perpetuar o bom uso do FisiOnline, foi também produzido um Manual do Usuário, documento que descreve e explica o funcionamento de cada um dos módulos disponíveis. O projeto demonstra potencial para aprimorar os serviços prestados pelo consultório, bem como para a sofisticação das tecnologias utilizadas pela universidade. A propriedade intelectual gerada será gratuitamente cedida e mantida em posse da Unisanta, abrindo oportunidades para que a instituição e outros estudantes continuem aperfeiçoando a ferramenta e implementando novas funcionalidades com a intenção de melhor servir à comunidade",
            "autores": "Elaine Christina de Oliveira",
            "orientador": "Thais Martins Chucri",
            "data": "25 de outubro  9h - 10h30 painel 041"
        },
        {
            "titulo": "A atuação do biólogo na prevenção e controle de ectoparasitas em animais domésticos",
            "codigo": "4013",
            "autores": "Marcelli Martiello",
            "orientador": "Heitor Luiz Borali",
            "data": "24 de outubro  20h30 - 22h painel 046"
        },
        {
            "titulo": "Educomunicação e juventude: a experiência do coletivo Jovem Albatroz",
            "codigo": "4019",
            "autores": "Victor Vasques Ribeiro; Mariana Roedel Dias",
            "orientador": "Rafael de Araujo Arosa Monteiro",
            "data": "25 de outubro 18h30 - 20h painel 079"
        },
        {
            "titulo": "Síntese de óxido misto do tipo perovskita LaCoO3 para emprego na reação de oxidação seletiva do CO (SELOX)",
            "codigo": "4020",
            "autores": "Luciano Mazzucca da Gama; Thiago Pongelupe Ribeiro; Clarissa Perdomo Rodrigues",
            "orientador": "Karina Tamião de Campos Roseno",
            "data": "24 de outubro 18h30 - 20h painel 011"
        },
        {
            "titulo": "Sistema ecológico de otimização de combustão: economia & ecologia",
            "codigo": "4026",
            "autores": "Igor Gianetta Cerqueira de Sá; Matheus Carlos Floriano da Silva",
            "orientador": "Carlos T. Salinas Sedano",
            "data": "24 de outubro 18h30 - 20h painel 127"
        },
        {
            "titulo": "A importância da junção de esforços entre escola e família e alguns dos benefícios que ocasiona aos alunos nos primeiros nos primeiros anos de sua educação",
            "codigo": "4033",
            "autores": "Lidiane de Oliveira Missiato",
            "orientador": "Daniela Teresa Rossignoli Uebele",
            "data": "25 de outubro  20h30 - 22h painel 001"
        },
        {
            "titulo": "IBM Watson: estudo e desenvolvimento de um ChatBot",
            "codigo": "4039",
            "autores": "Brendon Gomes dos Santos; Daniel Bielski Tavares; Felipe Nascimento Cunha; Luan Faustino da Silva; Rodrigo Marques Coelho; William Cabral de Paiva",
            "orientador": "Maurício Neves Asenjo; Ana Carolina Caetano Senger; Luiz Antonio Ferraro Mathias",
            "data": "24 de outubro  20h30 - 22h painel 008"
        },
        {
            "titulo": "Análise da frequência de óbitos em animais silvestres mantidos em cativeiro",
            "codigo": "4040",
            "autores": "Elaine Christina de Oliveira",
            "orientador": "Thais da Cruz Alves dos Santos",
            "data": "25 de outubro  9h - 10h30 painel 137"
        },
        {
            "titulo": "EcoWash: lavagem automotiva à seco",
            "codigo": "4042",
            "autores": "Guilherme Pini Baesso",
            "orientador": "Carlos Roberto de Oliveira; Daty Costa de Souza",
            "data": "25 de outubro 18h30 - 20h painel 028"
        },
        {
            "titulo": "Paulo Freire na saúde pública",
            "codigo": "4043",
            "autores": "Katia Regina de Carvalho Alves",
            "orientador": "Tassio Acosta Rodrigues",
            "data": "25 de outubro  20h30 - 22h painel 014"
        },
        {
            "titulo": "Empreendimento planejado 2018/2019: CANTIMANIA (Alimentação fora de casa)",
            "codigo": "4044",
            "autores": "André Luiz Ferreira de Paula; José Henrique Jucá Fernandez; Lucas Ayres Silva; Pamella Aparecida Rodrigues",
            "orientador": "Carlos Roberto de Oliveira; Daty Costa de Souza",
            "data": "25 de outubro 18h30 - 20h painel 029"
        },
        {
            "titulo": "O uso da tatuagem pelo operador do Direito no âmbito jurídico",
            "codigo": "4046",
            "autores": "Kathryn Karolyne Busch Torres",
            "orientador": "Luiz Francisco Isern",
            "data": "25 de outubro 18h30 - 20h painel 016"
        },
        {
            "titulo": "Acesso ao SUS no município de Santos (SP) e a dignidade da pessoa humana",
            "codigo": "4048",
            "autores": "Claudia Andreia Lara de Matos",
            "orientador": "Danilo Oliveira; Marcelo Lamy",
            "data": "25 de outubro 18h30 - 20h painel 003"
        },
        {
            "titulo": "Prevalência de depressão pós-parto no puerpério imediato e sua relação com a dor",
            "codigo": "4050",
            "autores": "Caroline Rodrigues de Jesus",
            "orientador": "Cláudia de Oliveira",
            "data": "25 de outubro  9h - 10h30 painel 044"
        },
        {
            "titulo": "Projeto de um cinto de segurança para mitigação de efeitos em quedas da Síndrome da Suspensão Inerte",
            "codigo": "4053",
            "autores": "Suelen dos Santos Ferreira Firmino",
            "orientador": "Aureo Emanuel Pasqualeto Figueiredo; José Carlos Morilla; Ivo Koedel Filho",
            "data": "24 de outubro 18h30 - 20h painel 157"
        },
        {
            "titulo": "A palavra das crianças e adolescentes vítimas ou testemunhas nos crimes com violência: a (in)validade da Lei nº. 13.431/17 no Brasil",
            "codigo": "4054",
            "autores": "Ana Carolina Dobos Fernandes",
            "orientador": "Silvana Amneris Rôlo Pereira Borges",
            "data": "25 de outubro 18h30 - 20h painel 014"
        },
        {
            "titulo": "Mercanee (Treinamento para PCD's)",
            "codigo": "4055",
            "autores": "Armando Pucci dos Santos Junior; Jéssica Cantuaria Assis; Renata Carreira Modesto; Yuri Rodrigues Kano",
            "orientador": "Carlos Oliveira; Daty Costa",
            "data": "25 de outubro 18h30 - 20h painel 034"
        },
        {
            "titulo": "Teatro: transformação na vida escolar do aluno",
            "codigo": "4058",
            "autores": "Ana Paula Ferreira Poppe Marques; Regilene Aparecida de Marco; Nathalia Branco Pupo",
            "orientador": "Carolina Ferreira de Souza",
            "data": "25 de outubro 18h30 - 20h painel 118"
        },
        {
            "titulo": "A autocomposição como método eficaz de solução de conflitos, amplo acesso à justiça e humanização do judiciário",
            "codigo": "4060",
            "autores": "Joana Pala Moreira Franco",
            "orientador": "Danilo de Oliveira",
            "data": "25 de outubro 18h30 - 20h painel 024"
        },
        {
            "titulo": "Avaliação diagnóstica de Língua Portuguesa no ciclo de alfabetização",
            "codigo": "4062",
            "autores": "Margarida Rocha Lopes de Souza",
            "orientador": "Ana Carolina Caetano Senger",
            "data": "25 de outubro  20h30 - 22h painel 008"
        },
        {
            "titulo": "A inclusão por meio dos quadrinhos da Turma da Mônica",
            "codigo": "4063",
            "autores": "Mariana Alvarez de Amorim",
            "orientador": "Paula Denari",
            "data": "25 de outubro  20h30 - 22h painel 136"
        },
        {
            "titulo": "A unidade escolar como ferramenta de combate ao racismo",
            "codigo": "4064",
            "autores": "Beatriz de Jesus Antonio",
            "orientador": "Fabiola Andrea Chofard Adami",
            "data": "25 de outubro  20h30 - 22h painel 015"
        },
        {
            "titulo": "Projeto arquitetônico de um ponto de parada e descanso para caminhoneiros em Cubatão",
            "codigo": "4067",
            "autores": "Beatriz Carregosa Oliveira",
            "orientador": "Maria Valquíria de Souza Barbosa",
            "data": "24 de outubro 18h30 - 20h painel 115"
        },
        {
            "titulo": "Experiência docente atravessada pelo racismo",
            "codigo": "4068",
            "autores": "Mirian Castro de Negreiros; Elaine Cristina dos Santos Porfirio; Norma Francisca de Oliveira Pereira Nery",
            "orientador": "Tassio Acosta Rodrigues",
            "data": "25 de outubro  20h30 - 22h painel 016"
        },
        {
            "titulo": "Jogos pedagógicos",
            "codigo": "4070",
            "autores": "Clarice de Oliveira Dias; Walquiria Aparecida Joaquim Severino",
            "orientador": "Daniela Teresa Rossignoli Uebele",
            "data": "25 de outubro  20h30 - 22h painel 017"
        },
        {
            "titulo": "Componente especializado de assistência farmacêutica: uma ferramenta de acesso a medicamentos no SUS",
            "codigo": "4071",
            "autores": "Mylena Andrade Nunes",
            "orientador": "Marlyse Selma de Oliveira Ribeiro",
            "data": "25 de outubro  9h - 10h30 painel 015"
        },
        {
            "titulo": "Disciplina positiva: A prática da educação afetiva na construção da autonomia",
            "codigo": "4072",
            "autores": "Thayse Karla Moraes Ramos",
            "orientador": "Daniela Teresa Rossignoli Uebele",
            "data": "25 de outubro  20h30 - 22h painel 095"
        },
        {
            "titulo": "Aplicativo de Proteção de Integridade Social",
            "codigo": "4073",
            "autores": "Henrique Gonçalves Lourenço Silva; Thiago Henrique Silva Leão; Vitor Berto de Medeiros Silva; Bruno Bezerra Trigueiro",
            "orientador": "Roseli Fernandes Rocha; Daniela Teresa Rossignoli Uebele",
            "data": "24 de outubro  20h30 - 22h painel 015"
        },
        {
            "titulo": "Human help",
            "codigo": "4074",
            "autores": "Bárbara de Oliveira Martins; Maria Fernanda Ribeiro de Araujo; Mikael Marques dos Santos; Rafael de Sousa Santos; Yasmin Gomes dos Santos",
            "orientador": "Roseli Fernandes Rocha; Daniela Teresa Rossignoli Uebele",
            "data": "24 de outubro  20h30 - 22h painel 016"
        },
        {
            "titulo": "For Everyone",
            "codigo": "4076",
            "autores": "Alexia Ribeiro Marques; Allison Faiad Santos; Carlos Vinícius Souza dos Santos; Jaime Gabriel Sandim Santos; Matheus Ileck Farias",
            "orientador": "Roseli Fernandes Rocha; Daniela Teresa Rossignoli Uebele",
            "data": "24 de outubro  20h30 - 22h painel 017"
        },
        {
            "titulo": "Other Level",
            "codigo": "4082",
            "autores": "Rafael de Oliveira Veloso",
            "orientador": "Roseli Fernandes Rocha; Daniela Teresa Rossignoli Uebele",
            "data": "24 de outubro  20h30 - 22h painel 018"
        },
        {
            "titulo": "Educação ambiental na conservação da biodiversidade: práxis pedagógica no ambiente escolar",
            "codigo": "4084",
            "autores": "Ana Paula Araujo da Silva; Josefa Clara do Espírito Santos Cardoso; Joyce Mary Silva Sousa",
            "orientador": "Fabíola Andréa Chofard Adami",
            "data": "25 de outubro  20h30 - 22h painel 013"
        },
        {
            "titulo": "Cartilha de conscientização sobre o transtorno de conscientização sobre o transtorno de déficit de atenção e hiperatividade infantil para seus educadores e responsáveis",
            "codigo": "4086",
            "autores": "Sandyara Beatriz Doro Peres",
            "orientador": "Nelson da Silva Paz",
            "data": "25 de outubro 18h30 - 20h painel 081"
        },
        {
            "titulo": "Bioconstrução: espaço plurirreligioso em loteamento rural",
            "codigo": "4089",
            "autores": "Thamirys Maria Freitas Pereira",
            "orientador": "Luiz Antonio de Paula Nunes",
            "data": "24 de outubro 18h30 - 20h painel 120"
        },
        {
            "titulo": "Aprendizagem e desenvolvimento de uma aplicação utilizando recursos do reconhecimento visual da plataforma IBM Watson",
            "codigo": "4090",
            "autores": "Brendon Gomes dos Santos; Daniel Bielski Tavares; Felipe Nascimento Cunha; Luan Faustino da Silva; Rodrigo Marques Coelho; William Cabral de Paiva",
            "orientador": "Maurício Neves Asenjo; Ana Carolina Caetano Senger; Luiz Antonio Ferraro Mathias",
            "data": "24 de outubro  20h30 - 22h painel 009"
        },
        {
            "titulo": "Vértice software para auxílio educacional",
            "codigo": "4092",
            "autores": "Marlucia dos Santos de Almeida; Diego Ricardo Lopes Pereira Debrito; Thauany Modesto Ferreira",
            "orientador": "Roseli Fernandes Rocha; Daniela Teresa Rossignoli Uebele",
            "data": "24 de outubro  20h30 - 22h painel 019"
        },
        {
            "titulo": "Microcefalia por Zika Vírus na Baixada Santista",
            "codigo": "4093",
            "autores": "Gabriel de Sousa Lima; Leticia Louzano",
            "orientador": "Maria Clara Paixão; Ademar Arthur Chioro dos Reis",
            "data": "25 de outubro  9h - 10h30 painel 043"
        },
        {
            "titulo": "Rede neural artificial",
            "codigo": "4095",
            "autores": "Laís Bovolin Reis; Ester Cássia Chilaver; Letícia Rodrigues Araújo; Jackson da Silva Barbosa",
            "orientador": "Maurício Neves Asenjo; Katya Laís Patela",
            "data": "24 de outubro  20h30 - 22h painel 044"
        }
    ];
 this.alltrabalhos = this.trabalhos;
                                    }

  ngOnInit() {
  }


  filterTrabalho(cid:any){
  let val = cid.target.value;
  if(val && val.trim() != ''){
    this.trabalhos = _.values(this.alltrabalhos);
    this.trabalhos = this.trabalhos.filter((trabalho) => {
      return (trabalho.titulo.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
  }
  else{
    this.trabalhos = this.alltrabalhos;
  }
  }

  voltarMenu(){
    this.router.navigate(['../menu-visitante']);
  }
  SelecionaTrabalho(seila: any){
    this.userServ.changeData2(seila);
    this.router.navigate(['/menu-visitante/pesquisar/votar']);
  }
}
