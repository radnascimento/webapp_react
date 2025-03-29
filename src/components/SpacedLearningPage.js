import React from 'react';
import '../SpacedLearningPage.css'; // Import CSS for styling

const SpacedLearningPage = () => {
    return (
        <div className="container mt-5">
            <div className="bg-white p-4 rounded shadow-sm">
                <div className="spaced-learning-page">
                    <h1 className="mb-0 heading-spacing">Aprendizado Espaçado</h1>
                    <p className="intro" style={{ textAlign: 'left' }}>

                        O aprendizado espaçado, também conhecido como prática distribuída, é um método de aprendizado que consiste em repetir informações ao longo do tempo com intervalos entre as sessões. Esse método baseia-se na ideia de que a repetição intercalada das informações auxilia na criação de memórias de longo prazo.
                    </p>

                    <section className="how-it-works">
                        <h2 className="mb-0 heading-spacing">Como Funciona</h2>
                        <ul>
                            <li><strong>Divisão do conteúdo:</strong> Separe grandes volumes de informação em sessões menores.</li>
                            <li><strong>Repetição do conteúdo:</strong> Revise as informações várias vezes ao longo do tempo.</li>
                            <li><strong>Intervalos estratégicos:</strong> Faça pausas entre as sessões de estudo para permitir que o cérebro processe o conteúdo.</li>
                            <li><strong>Revisão de materiais antigos:</strong> Revise conteúdos anteriores antes de aprender novos.</li>
                            <li><strong>Criação de resumos:</strong> Desenvolva resumos e checklists para facilitar a memorização.</li>
                        </ul>
                    </section>

                    <section className="how-it-works">
                        <h2 className="mb-0 heading-spacing">Benefícios</h2>
                        <ul>
                            <li>O aprendizado espaçado pode ajudar a reter informações por mais tempo.</li>
                            <li>Ele pode ajudar a aplicar o conhecimento em situações práticas.</li>
                            <li>Ele pode aumentar sua confiança ao utilizar novas informações.</li>
                        </ul>
                    </section>

                    <section className="how-it-works">
                        <h2 className="mb-0 heading-spacing">Exemplos de Aplicação</h2>
                        <ul>
                            <li>
                                <strong>Aprendizado de idiomas:</strong> Ao aprender novas palavras, revise os termos mais difíceis hoje, depois em alguns dias e novamente em uma semana.
                            </li>
                            <li>
                                <strong>Treinamento de produtos:</strong> Apresente informações em pequenas partes ao longo do tempo para melhor absorção.
                            </li>
                            <li>
                                <strong>Treinamento de integração:</strong> Divida as informações em sessões menores para facilitar o aprendizado de novos colaboradores.
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default SpacedLearningPage;
