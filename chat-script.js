// JavaScript específico para a página Chat
document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const bottomNavItems = document.querySelectorAll('.nav-item');
    
    // ===== SISTEMA DE ALERTAS TEMPORÁRIOS =====
    
    // Função para criar e exibir alertas
    function showAlert(type, title, message, duration = 4000) {
        const alertContainer = document.getElementById('alert-container');
        
        // Cria o elemento do alerta
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        
        // Ícones para cada tipo
        const icons = {
            success: '✓',
            info: 'i',
            warning: '!',
            danger: '✕'
        };
        
        // HTML do alerta
        alert.innerHTML = `
            <div class="alert-icon">${icons[type] || 'i'}</div>
            <div class="alert-content">
                <div class="alert-title">${title}</div>
                <div class="alert-message">${message}</div>
            </div>
            <button class="alert-close" onclick="closeAlert(this)">
                <i class="fas fa-times"></i>
            </button>
            <div class="alert-progress"></div>
        `;
        
        // Adiciona o alerta ao container
        alertContainer.appendChild(alert);
        
        // Força o reflow para aplicar as transições
        alert.offsetHeight;
        
        // Mostra o alerta
        alert.classList.add('show');
        
        // Inicia a barra de progresso
        const progressBar = alert.querySelector('.alert-progress');
        progressBar.style.width = '100%';
        progressBar.style.transition = `width ${duration}ms linear`;
        
        // Remove o alerta após o tempo especificado
        setTimeout(() => {
            closeAlert(alert.querySelector('.alert-close'));
        }, duration);
        
        // Inicia a animação da barra de progresso
        setTimeout(() => {
            progressBar.style.width = '0%';
        }, 100);
    }
    
    // Função para fechar alertas
    window.closeAlert = function(closeButton) {
        const alert = closeButton.closest('.alert');
        if (alert) {
            alert.classList.add('hide');
            setTimeout(() => {
                if (alert.parentNode) {
                    alert.parentNode.removeChild(alert);
                }
            }, 300);
        }
    };
    
    // Funções de conveniência para diferentes tipos de alerta
    window.showSuccess = (title, message, duration) => showAlert('success', title, message, duration);
    window.showInfo = (title, message, duration) => showAlert('info', title, message, duration);
    window.showWarning = (title, message, duration) => showAlert('warning', title, message, duration);
    window.showError = (title, message, duration) => showAlert('danger', title, message, duration);
    
    // ===== FUNCIONALIDADES DO CHAT =====
    
    // Função para adicionar mensagem do usuário
    function addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        
        const now = new Date();
        const timeString = now.toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-bubble">
                    <p>${message}</p>
                </div>
                <div class="message-time">${timeString}</div>
            </div>
            <div class="message-avatar">
                <i class="fas fa-user"></i>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
        
        // Simula resposta do AI após 1-2 segundos
        setTimeout(() => {
            addAIMessage(generateAIResponse(message));
        }, Math.random() * 1000 + 1000);
    }
    
    // Função para adicionar mensagem do AI
    function addAIMessage(message, isHTML = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message ai-message';
        
        const now = new Date();
        const timeString = now.toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="message-bubble">
                    ${isHTML ? message : `<p>${message}</p>`}
                </div>
                <div class="message-time">${timeString}</div>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    }
    
    // Função para gerar resposta do AI (simulação)
    function generateAIResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Respostas baseadas em palavras-chave
        if (message.includes('nvidia') || message.includes('nvdc34')) {
            return `
                <div class="financial-data">
                    <div class="asset-info">
                        <div class="asset-name">Nvidia - 19,35 BRL</div>
                        <div class="asset-change positive">+0,30 (1,57%) hoje</div>
                    </div>
                </div>
                <p>Nvidia (NVDC34) está apresentando um bom desempenho hoje. A empresa tem se beneficiado do crescimento do mercado de IA e gaming.</p>
            `;
        }
        
        if (message.includes('vale') || message.includes('vale3')) {
            return `
                <div class="financial-data">
                    <div class="asset-info">
                        <div class="asset-name">Vale S.A. - 56,19 BRL</div>
                        <div class="asset-change negative">-0,17 (0,30%) hoje</div>
                    </div>
                </div>
                <p>Vale (VALE3) está com leve queda hoje. O setor de mineração tem enfrentado volatilidade devido às condições do mercado global.</p>
            `;
        }
        
        if (message.includes('bitcoin') || message.includes('cripto')) {
            return `
                <div class="financial-data">
                    <div class="asset-info">
                        <div class="asset-name">Bitcoin - R$ 180.450,00</div>
                        <div class="asset-change positive">+2.450,00 (1,38%) hoje</div>
                    </div>
                </div>
                <p>O Bitcoin está em alta hoje. O mercado de criptomoedas continua volátil, mas mostra sinais de recuperação.</p>
            `;
        }
        
        if (message.includes('portfolio') || message.includes('carteira')) {
            return `
                <p>Para analisar seu portfólio, preciso de mais informações:</p>
                <ul style="margin: 10px 0; padding-left: 20px;">
                    <li>Quais ativos você possui?</li>
                    <li>Qual o valor total investido?</li>
                    <li>Qual seu perfil de risco?</li>
                </ul>
                <p>Com essas informações, posso fornecer uma análise mais precisa!</p>
            `;
        }
        
        if (message.includes('ajuda') || message.includes('help')) {
            return `
                <p>Posso ajudá-lo com:</p>
                <ul style="margin: 10px 0; padding-left: 20px;">
                    <li>Análise de ativos específicos</li>
                    <li>Comparações entre ações</li>
                    <li>Informações sobre criptomoedas</li>
                    <li>Análise de portfólio</li>
                    <li>Tendências de mercado</li>
                </ul>
                <p>Como posso ajudá-lo hoje?</p>
            `;
        }
        
        // Resposta padrão
        const responses = [
            "Interessante pergunta! Posso ajudá-lo com análises de ativos, comparações de ações, informações sobre criptomoedas e muito mais. O que gostaria de saber?",
            "Entendo sua dúvida. Como seu assistente de investimentos, posso fornecer análises detalhadas sobre diversos ativos. Que tipo de informação você precisa?",
            "Ótima pergunta! Posso ajudá-lo com dados financeiros, gráficos de performance e análises de mercado. Sobre qual ativo gostaria de saber mais?",
            "Posso ajudá-lo com informações sobre ações, criptomoedas, fundos e outros investimentos. Que análise você gostaria de ver?"
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Função para rolar para o final do chat
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Função para enviar mensagem
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addUserMessage(message);
            chatInput.value = '';
            sendBtn.disabled = true;
            
            // Reabilita o botão após um tempo
            setTimeout(() => {
                sendBtn.disabled = false;
            }, 2000);
        }
    }
    
    // Event listeners
    sendBtn.addEventListener('click', sendMessage);
    
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Auto-focus no input
    chatInput.focus();
    
    // ===== NAVEGAÇÃO INFERIOR =====
    
    bottomNavItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active de todos os itens
            bottomNavItems.forEach(navItem => navItem.classList.remove('active'));
            
            // Adiciona active no item clicado
            this.classList.add('active');
            
            // Simula navegação (apenas visual por enquanto)
            const label = this.querySelector('.nav-label').textContent;
            if (label === 'Chat') {
                // Já está no chat
                return;
            } else if (label === 'Home') {
                window.location.href = 'home.html';
            } else {
                showInfo('Em Desenvolvimento', `${label} - Funcionalidade em desenvolvimento`);
            }
        });
    });
    
    // ===== FUNCIONALIDADES ADICIONAIS =====
    
    // Botão de voltar
    window.goBack = function() {
        window.location.href = 'home.html';
    };
    
    // Botão de anexar (simulação)
    const attachBtn = document.querySelector('.attach-btn');
    if (attachBtn) {
        attachBtn.addEventListener('click', function() {
            showInfo('Anexar Arquivo', 'Funcionalidade de anexo em desenvolvimento');
        });
    }
    
    // Botão de ações do header (simulação)
    const actionBtn = document.querySelector('.action-btn');
    if (actionBtn) {
        actionBtn.addEventListener('click', function() {
            showInfo('Menu', 'Opções do chat em desenvolvimento');
        });
    }
    
    // Melhorias de UX
    chatInput.addEventListener('input', function() {
        sendBtn.disabled = this.value.trim() === '';
    });
    
    // Inicialização
    sendBtn.disabled = true;
    
    // Simula carregamento de dados (opcional)
    setTimeout(() => {
        console.log('Chat carregado com sucesso!');
    }, 500);
});

// Função para simular carregamento da página
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Função para detectar mudanças de orientação do dispositivo
window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        // Recalcula posições se necessário
        console.log('Orientação alterada');
    }, 100);
});
