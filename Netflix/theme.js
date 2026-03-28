/**
 * Sistema de Dark Mode / Light Mode
 * Gerencia a alternância entre temas e salva a preferência do usuário
 */

class ThemeManager {
  constructor() {
    // Nome da chave no localStorage
    this.THEME_KEY = "netflix-theme";
    // Modo padrão é dark
    this.DEFAULT_THEME = "dark";
    // Inicializa o tema ao carregar
    this.init();
  }

  /**
   * Inicializa o gerenciador de temas
   * Carrega o tema salvo ou detecta a preferência do sistema
   */
  init() {
    // Obtém o tema salvo no localStorage
    const savedTheme = this.getSavedTheme();

    // Se não houver tema salvo, detecta a preferência do sistema
    const theme = savedTheme || this.getSystemThemePreference();

    // Aplica o tema
    this.setTheme(theme);

    // Cria o botão de alternância
    this.createThemeToggleButton();
  }

  /**
   * Obtém o tema salvo no localStorage
   * @returns {string|null} Tema salvo ou null
   */
  getSavedTheme() {
    return localStorage.getItem(this.THEME_KEY);
  }

  /**
   * Detecta a preferência de tema do sistema operacional
   * @returns {string} 'dark' ou 'light'
   */
  getSystemThemePreference() {
    // Verifica se o navegador suporta media query de preferência
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches
    ) {
      return "light";
    }
    return this.DEFAULT_THEME;
  }

  /**
   * Define o tema atual
   * @param {string} theme - 'dark' ou 'light'
   */
  setTheme(theme) {
    const html = document.documentElement;

    if (theme === "light") {
      html.classList.add("light-mode");
      localStorage.setItem(this.THEME_KEY, "light");
    } else {
      html.classList.remove("light-mode");
      localStorage.setItem(this.THEME_KEY, "dark");
    }
  }

  /**
   * Alterna entre dark e light mode
   */
  toggleTheme() {
    const html = document.documentElement;
    const isLightMode = html.classList.contains("light-mode");
    const newTheme = isLightMode ? "dark" : "light";
    this.setTheme(newTheme);
    this.updateToggleButton();
  }

  /**
   * Obtém o tema atual
   * @returns {string} 'dark' ou 'light'
   */
  getCurrentTheme() {
    return document.documentElement.classList.contains("light-mode")
      ? "light"
      : "dark";
  }

  /**
   * Cria o botão de alternância de tema
   */
  createThemeToggleButton() {
    // Cria o container do botão
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "theme-toggle-container";

    // Cria o botão
    const button = document.createElement("button");
    button.className = "theme-toggle-btn";
    button.id = "theme-toggle";
    button.setAttribute("aria-label", "Alternar entre modo claro e escuro");

    // Define o ícone inicial
    this.updateToggleButton();

    // Adiciona o event listener
    button.addEventListener("click", () => this.toggleTheme());

    // Insere o botão no container
    buttonContainer.appendChild(button);

    // Insere o container no body
    document.body.appendChild(buttonContainer);
  }

  /**
   * Atualiza o ícone do botão de alternância
   */
  updateToggleButton() {
    const button = document.getElementById("theme-toggle");
    if (!button) return;

    const isLightMode = this.getCurrentTheme() === "light";
    // Ícone da lua para modo claro (clica para ativar dark mode)
    // Ícone do sol para modo escuro (clica para ativar light mode)
    button.innerHTML = isLightMode ? "🌙" : "☀️";
  }
}

// Inicializa o gerenciador de temas quando o DOM está pronto
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new ThemeManager();
  });
} else {
  // Se o script for carregado depois do DOM estar pronto
  new ThemeManager();
}
