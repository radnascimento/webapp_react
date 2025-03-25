import React, { Component } from 'react';
import ContactusService from '../services/ContactusService';

class ContactUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            email: '',
            mensagem: '',
            error: null, // Added error state for better feedback
            captchaToken: '',
        };
    }

    // Load reCAPTCHA script on component mount
    componentDidMount() {
        const script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js?render=6LcWofsqAAAAAHHF2tLREYKb08bKY-E4GqaiAMxs';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
    }

    // Function to execute reCAPTCHA and get the token
    getRecaptchaToken = async () => {
        return new Promise((resolve, reject) => {
            if (window.grecaptcha) {
                window.grecaptcha.ready(() => {
                    window.grecaptcha
                        .execute('6LcWofsqAAAAAHHF2tLREYKb08bKY-E4GqaiAMxs', { action: 'contact_us' })
                        .then((token) => {
                            this.setState({ captchaToken: token });
                            resolve(token);
                        })
                        .catch((error) => {
                            console.error("reCAPTCHA error:", error);
                            reject(null);
                        });
                });
            } else {
                reject(new Error('reCAPTCHA script not loaded'));
            }
        });
    };

    // Handle input changes
    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value, error: null }); // Clear errors on input change
    };

    // Handle form submission
    handleSubmit = async (event) => {
        event.preventDefault();
        const { nome, email, mensagem } = this.state;

        if (!nome || !email || !mensagem) {
            this.setState({ error: "Por favor, preencha todos os campos." });
            return;
        }

        // Get reCAPTCHA token
        const token = await this.getRecaptchaToken();
        if (!token) {
            this.setState({ error: "Por favor, complete o reCAPTCHA." });
            return;
        }

        await ContactusService.contactUs({ nameFrom: nome, from: email, body: mensagem, recaptcha: token });

        this.setState({ nome: '', email: '', mensagem: '', error: null });

        // Show success message
        alert("Mensagem enviada com sucesso!");
    };

    render() {
        const { nome, email, mensagem, error } = this.state;

        return (
            <main className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="bg-light p-4 rounded shadow-sm bg-white">
                            <section className="text-center mb-4">
                                <h2>Fale Conosco!</h2>
                                <p className="lead">
                                    Tem uma dúvida, sugestão ou problema para relatar? Estamos aqui para ajudar e valorizamos o seu feedback.
                                </p>
                            </section>
                            <section>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="nome" className="form-label">Nome:</label>
                                        <input
                                            type="text"
                                            id="nome"
                                            name="nome"
                                            className="form-control"
                                            value={nome}
                                            onChange={this.handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">E-mail:</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="form-control"
                                            value={email}
                                            onChange={this.handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="mensagem" className="form-label">Mensagem:</label>
                                        <textarea
                                            id="mensagem"
                                            name="mensagem"
                                            className="form-control"
                                            value={mensagem}
                                            onChange={this.handleInputChange}
                                            rows="4"
                                            required
                                        />
                                    </div>

                                    {error && (
                                        <div className="alert alert-danger" role="alert">
                                            {error}
                                        </div>
                                    )}

                                    <div className="text-center">
                                        <button type="submit" className="btn btn-success btn-lg">
                                            Enviar
                                        </button>
                                    </div>
                                </form>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default ContactUs;
