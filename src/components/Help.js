import React from "react";

class HelpPage extends React.Component {
    render() {
        return (
            <div className="container mt-5">
                <div className="bg-white p-4 rounded shadow-sm">
                    <div className="d-flex flex-column ">
                        <div className="container mt-4">
                            <h2 className="mb-3">Dados da Assinatura Grátis</h2>
                            <div className="wiki-section">
                                <h3>Tópicos Permitidos</h3>
                                <ul className="list-unstyled">
                                    <li><strong>Cadastre até 2 tópicos</strong></li>
                                    <li><strong>Nome do Tópico:</strong> Limitado a 100 caracteres</li>
                                    <li><strong>Descrição:</strong> Limitado a 100 caracteres</li>
                                </ul>
                            </div>

                            <div className="wiki-section">
                                <h3>Conteúdo Disponível</h3>
                                <ul className="list-unstyled">
                                    <li><strong>Cadastre até 20 conteúdos por mês</strong></li>
                                    <li><strong>Nome do Conteúdo:</strong> Limitado a 100 caracteres</li>
                                    <li><strong>Url para vídeo do Youtube:</strong> Limitado a 100 caracteres</li>
                                    <li><strong>Conteúdo:</strong> Limitado a 4.000 caracteres</li>
                                    <li><strong>Comentário:</strong> Limitado a 300 caracteres</li>
                                </ul>
                            </div>

                            <div className="wiki-section">
                                <h3>Validade</h3>
                                <p>Válido por 3 meses com renovação automática.</p>
                            </div>

                            <h2 className="mt-4 mb-3">Funcionamento</h2>
                            <div className="wiki-section">
                                <ul className="list-unstyled">
                                    <li>Após cadastro de login e senha e confirmação do cadastro.</li>
                                    <li>Cadastrar Tópico.</li>
                                    <li>Cadastrar conteúdo – no próximo dia, a revisão estará disponível.</li>
                                </ul>
                            </div>

                            <h2 className="mt-4 mb-3">Na Etapa de Revisão do Conteúdo</h2>
                            <div className="wiki-section">
                                <h3>Nível de Conhecimento</h3>
                                <ul className="list-unstyled">
                                    <li><strong>⭐ 1 estrela</strong> → Data atual + 1 dia</li>
                                    <li><strong>⭐⭐ 2 estrelas</strong> → Data atual + 3 dias</li>
                                    <li><strong>⭐⭐⭐ 3 estrelas</strong> → Data atual + 7 dias</li>
                                    <li><strong>⭐⭐⭐⭐ 4 estrelas</strong> → Data atual + 15 dias</li>
                                    <li><strong>⭐⭐⭐⭐⭐ 5 estrelas</strong> → Data atual + 30 dias</li>
                                </ul>
                            </div>

                            <h2 className="mt-4 mb-3">Fale Conosco</h2>
                            <div className="wiki-section">
                                <ul className="list-unstyled">
                                    <li>Faça suas sugestões de melhorias.</li>
                                    <li>Nos informe sobre possíveis erros.</li>
                                </ul>
                            </div>
                           
                        </div>

                        
                    </div>
                </div>
                <br></br>
            </div>
        );
    }
}

export default HelpPage;
