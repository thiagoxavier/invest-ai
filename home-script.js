// JavaScript específico para a página Home
document.addEventListener('DOMContentLoaded', function() {
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
    
    // ===== FUNCIONALIDADES DA HOME =====
    
    // Navegação inferior (bottom nav)
    bottomNavItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active de todos os itens
            bottomNavItems.forEach(navItem => navItem.classList.remove('active'));
            
            // Adiciona active no item clicado
            this.classList.add('active');
            
            // Simula navegação (apenas visual por enquanto)
            const label = this.querySelector('.nav-label').textContent;
            if (label === 'Home') {
                // Já está na home
                return;
            } else {
                showInfo('Em Desenvolvimento', `${label} - Funcionalidade em desenvolvimento`);
            }
        });
    });
    
    // Interações dos cards da home
    const chatCard = document.querySelector('.chat-card');
    if (chatCard) {
        chatCard.addEventListener('click', function() {
            // Redireciona para a página de chat
            window.location.href = 'chat.html';
        });
    }
    
    const suggestionCard = document.querySelector('.suggestion-card');
    if (suggestionCard) {
        suggestionCard.addEventListener('click', function() {
            showWarning('Funcionalidade Premium', 'Análise de Mineradoras - Em desenvolvimento');
        });
    }
    
    const dashboardCards = document.querySelectorAll('.dashboard-card');
    dashboardCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.dashboard-title').textContent;
            showInfo('Dashboard', `${title} - Em desenvolvimento`);
        });
    });
    
    const brokerageItems = document.querySelectorAll('.brokerage-item');
    brokerageItems.forEach(item => {
        item.addEventListener('click', function() {
            const name = this.querySelector('.brokerage-name').textContent;
            showInfo('Integração', `Integração com ${name} - Em desenvolvimento`);
        });
    });
    
    // Funcionalidade da barra de pesquisa
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.trim();
                if (searchTerm) {
                    showInfo('Pesquisa', `Pesquisando por: "${searchTerm}" - Funcionalidade em desenvolvimento`);
                }
            }
        });
    }
    
    const filterIcon = document.querySelector('.filter-icon');
    if (filterIcon) {
        filterIcon.addEventListener('click', function() {
            showInfo('Filtros', 'Filtros de pesquisa - Funcionalidade em desenvolvimento');
        });
    }
    
    // Botão Premium
    const premiumBtn = document.querySelector('.premium-btn');
    if (premiumBtn) {
        premiumBtn.addEventListener('click', function() {
            showWarning('Premium', 'Upgrade para Premium - Funcionalidade em desenvolvimento');
        });
    }
    
    // Navegação das setas das seções
    const navArrows = document.querySelectorAll('.nav-arrow');
    navArrows.forEach(arrow => {
        arrow.addEventListener('click', function() {
            const isLeft = this.classList.contains('fa-chevron-left');
            const direction = isLeft ? 'anterior' : 'próximo';
            showInfo('Navegação', `Navegar para ${direction} - Funcionalidade em desenvolvimento`);
        });
    });
    
    // Função para voltar ao login (útil para testes)
    window.goToLogin = function() {
        window.location.href = 'index.html';
    };
    
    // Função para voltar ao signup (útil para testes)
    window.goToSignup = function() {
        window.location.href = 'index.html#signup';
    };
    
    // Adiciona efeitos visuais nos elementos interativos
    const interactiveElements = document.querySelectorAll('.chat-card, .suggestion-card, .dashboard-card, .brokerage-item, .nav-item');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Melhorias de UX: Auto-focus na barra de pesquisa
    if (searchInput) {
        searchInput.addEventListener('focus', function() {
            this.parentElement.style.borderColor = '#00ffff';
            this.parentElement.style.background = 'white';
            this.parentElement.style.boxShadow = '0 0 0 3px rgba(0, 255, 255, 0.1)';
        });
        
        searchInput.addEventListener('blur', function() {
            this.parentElement.style.borderColor = '#e0e0e0';
            this.parentElement.style.background = '#f8f8f8';
            this.parentElement.style.boxShadow = 'none';
        });
    }
    
    // Simula carregamento de dados (opcional)
    setTimeout(() => {
        console.log('Home carregada com sucesso!');
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

// Função para scroll suave (se necessário)
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}
