// Navegação entre telas
document.addEventListener('DOMContentLoaded', function() {
    const navTabs = document.querySelectorAll('.nav-tab');
    const screens = document.querySelectorAll('.screen');
    
    // Função para alternar entre telas (apenas login e signup)
    function switchScreen(targetScreen) {
        // Remove classe active de todas as telas e tabs
        screens.forEach(screen => screen.classList.remove('active'));
        navTabs.forEach(tab => tab.classList.remove('active'));
        
        // Adiciona classe active na tela e tab selecionados
        const targetScreenElement = document.getElementById(`${targetScreen}-screen`);
        const targetTab = document.querySelector(`[data-tab="${targetScreen}"]`);
        
        if (targetScreenElement) {
            targetScreenElement.classList.add('active');
        }
        
        if (targetTab) {
            targetTab.classList.add('active');
        }
    }
    
    // Event listeners para as tabs de navegação
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetScreen = this.getAttribute('data-tab');
            switchScreen(targetScreen);
        });
    });
    
    // Funcionalidade de mostrar/ocultar senha
    const togglePasswordIcons = document.querySelectorAll('.toggle-password');
    
    togglePasswordIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const passwordInput = document.getElementById(targetId);
            
            if (passwordInput) {
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    this.classList.remove('fa-eye-slash');
                    this.classList.add('fa-eye');
                } else {
                    passwordInput.type = 'password';
                    this.classList.remove('fa-eye');
                    this.classList.add('fa-eye-slash');
                }
            }
        });
    });
    
    // Validação e envio do formulário de login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const rememberMe = document.getElementById('remember-me').checked;
            
            // Validação básica
            if (!email || !password) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Por favor, insira um e-mail válido.');
                return;
            }
            
            // Simulação de login
            console.log('Tentativa de login:', { email, password, rememberMe });
            
            // Feedback visual
            const submitBtn = this.querySelector('.btn-primary');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Entrando...';
            submitBtn.disabled = true;
            
            // Simula delay de autenticação
            setTimeout(() => {
                // Cria um alerta temporário simples
                const alertDiv = document.createElement('div');
                alertDiv.style.cssText = `
                    position: fixed;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: #28a745;
                    color: white;
                    padding: 12px 20px;
                    border-radius: 8px;
                    z-index: 9999;
                    font-size: 14px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                `;
                alertDiv.textContent = 'Login realizado com sucesso! Redirecionando...';
                document.body.appendChild(alertDiv);
                
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Remove o alerta após 2 segundos
                setTimeout(() => {
                    if (alertDiv.parentNode) {
                        alertDiv.parentNode.removeChild(alertDiv);
                    }
                }, 2000);
                
                // Redireciona para a página home.html
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 2000);
            }, 1500);
        });
    }
    
    // Validação e envio do formulário de signup
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const username = document.getElementById('signup-username').value;
            const password = document.getElementById('signup-password').value;
            const repeatPassword = document.getElementById('signup-repeat-password').value;
            
            // Validação básica
            if (!name || !email || !username || !password || !repeatPassword) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Por favor, insira um e-mail válido.');
                return;
            }
            
            if (password !== repeatPassword) {
                alert('As senhas não coincidem.');
                return;
            }
            
            if (password.length < 6) {
                alert('A senha deve ter pelo menos 6 caracteres.');
                return;
            }
            
            // Simulação de cadastro
            console.log('Tentativa de cadastro:', { name, email, username, password });
            
            // Feedback visual
            const submitBtn = this.querySelector('.btn-primary');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Criando conta...';
            submitBtn.disabled = true;
            
            // Simula delay de cadastro
            setTimeout(() => {
                // Cria um alerta temporário simples
                const alertDiv = document.createElement('div');
                alertDiv.style.cssText = `
                    position: fixed;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: #28a745;
                    color: white;
                    padding: 12px 20px;
                    border-radius: 8px;
                    z-index: 9999;
                    font-size: 14px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                `;
                alertDiv.textContent = 'Conta criada com sucesso! Redirecionando...';
                document.body.appendChild(alertDiv);
                
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Remove o alerta após 2 segundos
                setTimeout(() => {
                    if (alertDiv.parentNode) {
                        alertDiv.parentNode.removeChild(alertDiv);
                    }
                }, 2000);
                
                // Limpa o formulário
                this.reset();
                
                // Redireciona para a página home.html após cadastro
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 2000);
            }, 1500);
        });
    }
    
    // Login social (simulação)
    const socialBtns = document.querySelectorAll('.social-btn');
    socialBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            let provider = '';
            
            if (icon.classList.contains('fa-google')) {
                provider = 'Google';
            } else if (icon.classList.contains('fa-facebook-f')) {
                provider = 'Facebook';
            } else if (icon.classList.contains('fa-twitter')) {
                provider = 'Twitter';
            }
            
            // Cria um alerta temporário simples
            const alertDiv = document.createElement('div');
            alertDiv.style.cssText = `
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: #17a2b8;
                color: white;
                padding: 12px 20px;
                border-radius: 8px;
                z-index: 9999;
                font-size: 14px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            `;
            alertDiv.textContent = `Login com ${provider} (Simulação)`;
            document.body.appendChild(alertDiv);
            
            // Remove o alerta após 3 segundos
            setTimeout(() => {
                if (alertDiv.parentNode) {
                    alertDiv.parentNode.removeChild(alertDiv);
                }
            }, 3000);
        });
    });
    
    // Link "Recover password"
    const forgotPasswordLink = document.querySelector('.forgot-password');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            
            if (!email || !isValidEmail(email)) {
                alert('Por favor, insira um e-mail válido no campo de login.');
                return;
            }
            
            // Cria um alerta temporário simples
            const alertDiv = document.createElement('div');
            alertDiv.style.cssText = `
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: #17a2b8;
                color: white;
                padding: 12px 20px;
                border-radius: 8px;
                z-index: 9999;
                font-size: 14px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            `;
            alertDiv.textContent = `Instruções de recuperação enviadas para: ${email} (Simulação)`;
            document.body.appendChild(alertDiv);
            
            // Remove o alerta após 4 segundos
            setTimeout(() => {
                if (alertDiv.parentNode) {
                    alertDiv.parentNode.removeChild(alertDiv);
                }
            }, 4000);
        });
    }
    
    // Função para validar e-mail
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Melhorias de UX: Auto-focus no primeiro campo
    const firstInputs = document.querySelectorAll('.screen.active .input-wrapper input');
    if (firstInputs.length > 0) {
        firstInputs[0].focus();
    }
    
    // Atualiza o foco quando muda de tela
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const activeScreen = document.querySelector('.screen.active');
                if (activeScreen) {
                    const firstInput = activeScreen.querySelector('.input-wrapper input');
                    if (firstInput) {
                        setTimeout(() => firstInput.focus(), 100);
                    }
                }
            }
        });
    });
    
    screens.forEach(screen => {
        observer.observe(screen, { attributes: true });
    });
    
    // Adiciona efeitos visuais nos inputs
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            // Melhora a navegação por teclado
            const focusedElement = document.activeElement;
            if (focusedElement && focusedElement.classList.contains('nav-tab')) {
                focusedElement.style.outline = '2px solid #00ffff';
                focusedElement.style.outlineOffset = '2px';
            }
        }
    });
    
    // Remove outline quando clica
    document.addEventListener('mousedown', function() {
        const focusedElement = document.activeElement;
        if (focusedElement && focusedElement.classList.contains('nav-tab')) {
            focusedElement.style.outline = 'none';
        }
    });
    
});

// Função para simular carregamento da página
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
