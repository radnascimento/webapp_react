import React from 'react';

const TermsOfUsePage = () => {
    return (
        <div className="container mt-5">
            <div className="bg-white p-4 rounded shadow-sm">
                <div className="terms-of-use-page">
                    <h1 className="mb-0 heading-spacing">Termos de Uso</h1>
                    <p className="intro" style={{ textAlign: 'left' }}>
                        Ao acessar e utilizar este website, você concorda com os seguintes Termos de Uso. Por favor, leia atentamente as condições abaixo antes de utilizar nossos serviços.
                    </p>

                    <section className="how-it-works">
                        <h2 className="mb-0 heading-spacing">1. Aceitação dos Termos</h2>
                        <p>
                            Ao acessar e utilizar nosso website, você concorda em cumprir e estar vinculado a estes Termos de Uso. Caso não concorde com qualquer parte deste termo, não utilize nossos serviços.
                        </p>
                    </section>

                    <section className="how-it-works">
                        <h2 className="mb-0 heading-spacing">2. Acesso ao Serviço</h2>
                        <p>
                            O acesso ao nosso website é gratuito, mas estará sujeito a um período de tempo determinado, conforme especificado no momento do cadastro. Após o período gratuito, poderá ser cobrada uma taxa para continuar utilizando os serviços.
                        </p>
                    </section>

                    <section className="how-it-works">
                        <h2 className="mb-0 heading-spacing">3. Credenciais de Acesso</h2>
                        <p>
                            As credenciais de acesso fornecidas são de uso <strong>individual</strong> e <strong>intransferível</strong>, sendo expressamente proibido o compartilhamento de suas informações de login com terceiros. O usuário é responsável pela segurança de suas credenciais e por todas as atividades realizadas em sua conta.
                        </p>
                    </section>

                    <section className="how-it-works">
                        <h2 className="mb-0 heading-spacing">4. Proibição de Uso Comercial</h2>
                        <p>
                            O uso do nosso site para fins comerciais, como a criação de negócios virtuais ou digitais com base nos nossos conteúdos ou serviços, é <strong>estritamente proibido</strong>. O site é destinado ao uso pessoal e não comercial, salvo disposição em contrário.
                        </p>
                    </section>

                    <section className="how-it-works">
                        <h2 className="mb-0 heading-spacing">5. Proteção de Dados Pessoais e LGPD</h2>
                        <p>
                            Nos comprometemos a proteger sua privacidade e seus dados pessoais conforme os princípios estabelecidos pela Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/18 - LGPD). Ao utilizar o site, você autoriza o tratamento dos seus dados pessoais de acordo com a nossa Política de Privacidade.
                        </p>

                        <h3 className="mb-0 heading-spacing">5.1. Coleta de Dados</h3>
                        <p>
                            Coletamos apenas os dados pessoais necessários para a utilização dos serviços oferecidos, como nome, e-mail e outras informações que possam ser solicitadas durante o cadastro ou interação com o site.
                        </p>

                        <h3 className="mb-0 heading-spacing">5.2. Finalidade do Tratamento</h3>
                        <p>
                            Os dados pessoais coletados serão utilizados para:
                            <ul>
                                <li>Fornecer acesso aos serviços oferecidos no site.</li>
                                <li>Enviar informações relevantes sobre o funcionamento do site e atualizações.</li>
                                <li>Melhorar a experiência do usuário com base nas interações realizadas no site.</li>
                            </ul>
                        </p>

                        <h3 className="mb-0 heading-spacing">5.3. Armazenamento e Segurança dos Dados</h3>
                        <p>
                            Os dados pessoais serão armazenados de forma segura e por tempo necessário para cumprir as finalidades para as quais foram coletados. Utilizamos medidas de segurança adequadas para proteger suas informações contra acesso não autorizado, divulgação, alteração ou destruição.
                        </p>

                        <h3 className="mb-0 heading-spacing">5.4. Direitos do Titular dos Dados</h3>
                        <p>
                            Você tem direito a acessar, corrigir, excluir ou solicitar a portabilidade de seus dados pessoais, conforme estabelecido pela LGPD. Caso deseje exercer esses direitos, entre em contato conosco através de [informar e-mail de contato].
                        </p>
                    </section>

                    <section className="how-it-works">
                        <h2 className="mb-0 heading-spacing">6. Propriedade Intelectual</h2>
                        <p>
                            O conteúdo do nosso website, incluindo textos, imagens, gráficos, logotipos e outros materiais, é protegido por direitos autorais e propriedade intelectual. A utilização desses conteúdos para fins comerciais, ou qualquer outra forma de reprodução não autorizada, é proibida.
                        </p>
                    </section>

                    <section className="how-it-works">
                        <h2 className="mb-0 heading-spacing">7. Alterações nos Termos de Uso</h2>
                        <p>
                            Reservamo-nos o direito de alterar este Termo de Uso a qualquer momento, sem aviso prévio, sendo as alterações publicadas nesta página. Recomendamos que você consulte regularmente esta página para se manter atualizado.
                        </p>
                    </section>

                    <section className="how-it-works">
                        <h2 className="mb-0 heading-spacing">8. Limitação de Responsabilidade</h2>
                        <p>
                            O site é fornecido "como está", e não garantimos a disponibilidade contínua ou livre de erros do serviço. Não nos responsabilizamos por danos diretos, indiretos, especiais ou consequenciais decorrentes da utilização do site.
                        </p>
                    </section>

                    <section className="how-it-works">
                        <h2 className="mb-0 heading-spacing">9. Disposições Gerais</h2>
                        <p>
                            O presente Termo de Uso é regido pelas leis da República Federativa do Brasil. Quaisquer disputas relacionadas ao uso deste site serão resolvidas no foro da cidade de [sua cidade], Estado de [seu estado].
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsOfUsePage;
